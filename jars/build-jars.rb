#!/usr/bin/env ruby
require_relative 'setup.rb'
require_relative 'java-projects.rb'

require 'optparse'
require 'tempfile'
require 'open-uri'

puts <<HEREDOC
  JAVA_ROOT          #{JAVA_ROOT}
  PUBLIC_ROOT        #{PUBLIC_ROOT}
  JNLP_ROOT          #{JNLP_ROOT}
HEREDOC

@maven_update = ""
@skip_build = false
@force_update = false

opts = OptionParser.new
opts.on("--maven-update") { |val| @maven_update = " -U " }
opts.on("--force-update") { |val| @force_update = true }
opts.on("--skip-build") { |val| @skip_build = true }
project_names = opts.parse(ARGV)
projects = {}

if project_names.empty?
  projects = PROJECT_LIST
else
  projects = PROJECT_LIST.select { |k| project_names.index(k) }
end

if projects.empty?
  raise <<-HEREDOC


  *** project(s): '#{project_names.join(', ')}' not found
  *** select from this list: #{PROJECT_LIST.keys.join(', ')}

  HEREDOC
end

def download_file(source, destination)
  resource = open(source)
  File.open(destination, 'w') { |f| f.write resource.read }
end

def checkout_project(project_path, project, options)
  if File.exists? project_path
    print "\n\nUsing java project: '#{project}'\n"
    Dir.chdir(project_path) do
      case options[:build_type]
      when :download
        unless @skip_build
          name = "#{project}-#{options[:version]}.jar"
          download_file(options[:url], name)
          print <<-HEREDOC

  from:    #{options[:url]}
  version: #{options[:version]}
  located: #{project_path}
          HEREDOC
        end
      else
        if options[:branch]
          `git checkout #{options[:branch]}`
          `git pull origin #{options[:branch]}`
        end
        print <<-HEREDOC

  from:    #{options[:repository]}
  branch:  #{options[:branch]}
  located: #{project_path}
        HEREDOC
        if options[:commit]
          `git fetch`
          `git checkout #{options[:commit]}`
          print <<-HEREDOC
  commit:  #{options[:commit]}
          HEREDOC
        else
          puts
        end
      end
    end
  else
    FileUtils.mkdir_p(project_path)
    Dir.chdir(project_path) do
      case options[:build_type]
      when :download
        name = "#{project}-#{options[:version]}.jar"
        print "\n\nDownloading java resource: '#{name}'\n"
        download_file(options[:url], name)
        print <<-HEREDOC

  from:    #{options[:url]}
  version: #{options[:version]}
  located: #{project_path}

        HEREDOC
      else
        print "\n\nCloning java project: '#{project}'\n"
        print <<-HEREDOC

  from:    #{options[:repository]}
  branch:  #{options[:branch]}
  into:    #{project_path}
        HEREDOC
        `git clone #{options[:repository]} -b #{options[:branch]} #{project_path}`
        if options[:commit]
          `git fetch`
          `git checkout #{options[:commit]}`
          print <<-HEREDOC
  commit:  #{options[:commit]}
          HEREDOC
        else
          puts
        end
      end
    end
  end
end

def main_class(klass)
  manifest = Tempfile.new("manifest-main-class")
  manifest.puts "Main-Class: " + klass
  manifest.close
  manifest.path
end

def prep_project(project, options, project_path)
  version_template = source = ''
  Dir.chdir(project_path) do
    case options[:build_type]
    when :download
      name = "#{project}-#{options[:version]}.jar"
      return [ { :source => File.join(project_path, name), :version_template => options[:version] } ]
    when :maven
      unless @skip_build
        print "\nbuilding maven project: #{project} ... \n\n"
        start = Time.now
        system(options[:build] + @maven_update)
        puts sprintf("%d.1s", Time.now-start)
      end
      source = Dir["#{project_path}/target/#{project}*SNAPSHOT.jar"][0]
      if source
        version_template = source[/#{project}-(.*?)-SNAPSHOT/, 1]
        return [ { :source => source, :version_template => version_template } ]
      else
        return nil
      end
    when :ant
      unless @skip_build
        print "\nbuilding ant project: #{project} ... \n\n"
        start = Time.now
        system(options[:build])
        puts sprintf("%d.1s", Time.now-start)
      end
      source = Dir["#{project_path}/bin/#{project}.jar"][0]
      source = "#{project_path}/dist/#{project}.jar"
      version_template = options[:version]
      return [ { :source => source, :version_template => version_template } ]
    when :custom
      unless @skip_build
        print "\nbuilding project: #{project} ... \n\n"
        start = Time.now
        system(options[:build])
        puts sprintf("%d.1s", Time.now-start)
        print "\ncreating jar:: #{project}.jar ... \n\n"
        version_template = options[:version]
        start = Time.now
        jar_name = "#{project}-#{version_template}.jar"
        `jar cf #{project}-#{version_template}.jar -C bin .`
        if options[:main_class]
          manifest_path = main_class(options[:main_class])
          `jar umf #{manifest_path} #{project}-#{version_template}.jar`
        end
        puts sprintf("%d.1s", Time.now-start)
      end
      source = "#{project_path}/#{jar_name}"
      return [ { :source => source, :version_template => version_template } ]
    when :copy_jars
      project_jars = Dir["#{project_path}/*.jar"]
      print "\ncopying #{project_jars.length} jars from project: #{project} ... \n\n"
      return project_jars.collect { |pj| { :source => pj, :version_template => nil } }
    end
  end
end

def pack_and_sign(jarpath, options="")
  system("ruby #{SCRIPT_PATH}/pack-and-resign-jars.rb #{jarpath} #{options}")
end

projects.each do |project, options|
  project_path = File.join(JAVA_ROOT, project)
  puts "\n************************************************************\n"
  checkout_project(project_path, project, options)
  project_tokens = prep_project(project, options, project_path)
  if project_tokens
    project_tokens.each do |project_token|
      source = project_token[:source]
      to_path = File.join(JNLP_ROOT, options[:path])
      case options[:build_type]
      when :copy_jars
        versioned_name = File.basename(source)
      when :download
        versioned_name = "#{project}__V#{options[:version]}.jar"
      else
        version_template = project_token[:version_template]
        existing_jars = Dir["#{to_path}/*.jar"]
        if existing_jars.empty?
          new_jar_index = 1
        else
          new_jar_index = existing_jars.sort.last[/-(\d+)\.jar$/, 1].to_i + 1
        end
        version_str = "__V#{version_template}-" + TIMESTAMP + "-#{new_jar_index}"
        versioned_name = project + version_str + '.jar'
      end
      destination = File.join(to_path, versioned_name)
      if (File.exists? destination) && !@force_update
        puts <<-HEREDOC
Versioned Java Resource: '#{versioned_name}' already exists.
Location: #{destination}
      HEREDOC
      else
        puts "\ncopy: #{source} \nto:   #{destination}"
        FileUtils.mkdir_p(to_path) unless File.exists?(to_path)
        FileUtils.cp(source, destination)
        pack_and_sign_cmd = "ruby #{SCRIPT_PATH}/pack-and-resign-jars.rb"
        if options[:sign]
          pack_and_sign(versioned_name)
          if options[:also_unsigned]
            unsigned_to_path = File.join(to_path, 'unsigned')
            unsigned_versioned_name = File.join('unsigned', versioned_name)
            unsigned_destination = File.join(to_path, unsigned_versioned_name)
            FileUtils.mkdir_p(unsigned_to_path) unless File.exists?(unsigned_to_path)
            FileUtils.cp(source, unsigned_destination)
            pack_and_sign(unsigned_versioned_name, '--nosign')
          end
        else
          pack_and_sign(versioned_name, '--nosign')
        end
      end
    end
  else
    puts <<-HEREDOC

    *** Error building: '#{project} on branch: #{options[:branch]}

    HEREDOC
  end
end