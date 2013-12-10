#!/usr/bin/env ruby
require 'erb'
require_relative 'setup.rb'

require File.join(CONFIG_PATH, 'java-projects.rb')

# look for the most recent timestamp folder
RECENT_JNLP_ROOT = Dir.glob("#{PROJECT_ROOT}/dist/jars/*/").max_by {|f| File.mtime(f)}

template_file = File.open(File.join(SCRIPT_PATH, "jars-timestamp.js.erb"), 'r').read
erb = ERB.new(template_file)
@jars_timestamp_header = "This file is built by the update-timestamp.rb script do not edit it directly"
@jars_timestamp = File.basename(RECENT_JNLP_ROOT)
File.open("#{PROJECT_ROOT}/lib/jars-timestamp.js", 'w+') { |file| file.write(erb.result(binding)) }

