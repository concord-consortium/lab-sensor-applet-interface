#!/usr/bin/env ruby
require 'fileutils'
require 'yaml'
require 'optparse'

PROJECT_ROOT = File.expand_path('../..', __FILE__)            if !defined? PROJECT_ROOT
SCRIPT_PATH = File.join(PROJECT_ROOT, 'jars')                 if !defined? SCRIPT_PATH
CONFIG_PATH = File.join(PROJECT_ROOT, 'jars')                 if !defined? CONFIG_PATH

begin
  CONFIG = YAML.load_file(File.join(CONFIG_PATH, 'config.yml'))
rescue Errno::ENOENT
  msg = <<-HEREDOC

*** missing jars/config.yml

    cp jars/config.sample.yml jars/config.yml

    and edit appropriately ...

  HEREDOC
  raise msg
end
