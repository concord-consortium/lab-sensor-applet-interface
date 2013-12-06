## Java Code-Signing Certificate and Keystore

A self-signed Java certificate is included: `sample-keystore,jks`
with a password and private key password of *abc123* however for production use you will want to use
a keystore with a publically-recognized Java code-siging certificate from a company like
[Thawte](http://www.thawte.com/code-signing/index.html).

To build the Jar resources for the probeware using either the self-signed certificate provided
with the Lab repository or one of your own first create the file `config.yml` by
copying `config.sample.yml` and editing appropriately.

    cp config.sample.yml config.yml

The `:java:` section of the `config.yml` yaml file looks like this:

    ---
    # password and alias for Java siging certificate.
    :java:
      :password: abc123
      :alias: lab-sample-keystore
      :keystore_path: config/lab-sample-keystore.jks

If you have a keystore already accessible via an alias replace `lab-sample-keystore` with
the alias for your existing keystore. If your keystore is stored in your home directory in the
file `.keystore` then you do should leave the `:keystore_path` empty.

    :keystore_path:

The self-signed `lab-sample-keystore,jks` keystore was generated with the Java keytool command as follows:

    $ keytool -genkey -keyalg RSA -keystore sample-keystore.jks -alias sample-keystore -storepass abc123 -validity 36500 -keysize 2048
    What is your first and last name?
      [Unknown]:  Sensor Developer
    What is the name of your organizational unit?
      [Unknown]:  Sensors
    What is the name of your organization?
      [Unknown]:  Concord Consortium
    What is the name of your City or Locality?
      [Unknown]:  Concord
    What is the name of your State or Province?
      [Unknown]:  MA
    What is the two-letter country code for this unit?
      [Unknown]:  US
    Is CN=Sensor Developer, OU=Sensors, O=Concord Consortium, L=Concord, ST=MA, C=US correct?
      [no]:  yes

    Enter key password for <sample-keystore>
      (RETURN if same as keystore password):

    $ keytool -selfcert -alias sample-keystore -keystore sample-keystore.jks -validity 36500
    Enter keystore password: abc123

## Building the Java Resources

Run `build-jars.rb` to build, package, and sign all the Java resurces.

The first time this task is run it:

1.  Creates a `jars/projects` directory and checks out the required Java projects into this directory.
2.  Builds each of the projects
3.  Downloads the jars that are actually built
4.  Copies the jar resources into the `dist/jnlp/` directory packing and signing them as needed.

Later if you have made updates in the Java source code or need to re-build and deploy for any reason you
can run:

    build-jars.rb

If one of the maven projects fails to build because a dependency could not be found try running
the command again with the `--maven-update` argument:

    build-jars.rb --maven-update

There is a configuration file expressed in Ruby code here which defines build specifications
for each Java project:
[`java-projects.rb`](https://github.com/concord-consortium/lab-sensor-applet-interface/blob/master/jars/java-projects.rb)

The specification indicates whether the Java Jar resource will be directly downloaded or whether the
source code will be checked-out and compiled to create the Jar.

For projects that are built this specifices: where the repository is located, what branch is compiled,
and how the project is compiled.

## Java Projects Build Strategies

The `:build_type` option is used to specify the Java Projects Build Strategy.
Five different kinds of build strategies are available. Each strategy includes
additional build information in the `:build` option.

The `:maven`, `:custom`, and `:ant` build strategies all expect to be able to get the source
code to build projects from git repositories.

1. `:maven`

    Concord's sensor applet framework uses the `:maven` build strategy:

        'sensor-applets' => { :build_type => :maven,
                              :build => MAVEN_STD_CLEAN_BUILD,
                              :repository => 'git://github.com/concord-consortium/sensor-applets.git',
                              :branch => 'master',
                              :path => 'org/concord/sensor/sensor-applets',
                              :has_applet_class => true,
                              :sign => true },

    The `master` branch of the sensor-applets repo will be checked out into `jars/projects/sensor-applets` and be built using Maven.
    Because the sensor-applets jar is used with native libraries, it must also be signed.

    **Deploying both signed and unsigned jars**

3. `:ant`
4. `:custom`

    For Energy2D a `:custom` build strategy is used and the command line invocation necessary is in the
    `MANUAL_JAR_BUILD` constant.

        'energy2d' => { :repository => 'git://github.com/concord-consortium/energy2d.git',
                        :branch => 'trunk',
                        :path => 'org/concord/energy2d',
                        :build_type => :custom,
                        :version => '0.1.0',
                        :build => MANUAL_JAR_BUILD,
                        :has_applet_class => true,
                        :sign => false }

    In this case `MANUAL_JAR_BUILD` has been defined as:

        MANUAL_JAR_BUILD = "rm -rf bin; mkdir bin; find src -name *.java | xargs javac -target 5 -sourcepath src -d bin"

4. `:copy_jars`
5. `:download`

    goio-jna uses the `:download` build strategy:

        'goio-jna'       => { :build_type => :download,
                              :url => 'http://source.concord.org/nexus/content/repositories/cc-repo-internal-snapshot/org/concord/sensor/goio-jna/1.0-SNAPSHOT/goio-jna-1.0-20121109.222028-22.jar',
                              :version => '1.0-20121109.222028-22',
                              :path => 'org/concord/sensor/goio-jna',
                              :sign => true }

The script that runs the checkout-build-pack-sign-deploy can either operate on ALL projects specified or on a smaller number.

Running `build-jars.rb` with no arguments operates on all projects listed in `java-projects.rb`.

Optionally you can specify one or more projects to operate on. This builds just sensor and sensor-applets:

    build-jars.rb sensor sensor-applets

The Jar resources deployed to the `dist/jnlp` directory include a timestamp in the deployed artifact so unless you specifically
request an earlier version you will always get the latest version deployed.

## Working with the Sensor projects source

Most of the sensor related java jars are being downloaded as jars, not
compiled from source. If you're interested in building them from source:

1. Clone the [concord-consortium/sensor-projects](https://github.com/concord-consortium/sensor-projects) repo:

        git clone https://github.com/concord-consortium/sensor-projects.git sensor-projects

    sensor-projects includes these resources:

        sensor-projects/
          README
          ftdi-serial-wrapper/
          goio-jna/
          labpro-usb-jna/
          labquest-jna/
          pasco-jna/
          pom.xml/
          sensor/
          sensor-native/
          sensor-pasco/
          sensor-vernier/

2. Link the individual project folder into `projects/`

        rm -rf projects/goio-jna
        ln -s /path/to/sensor-projects/goio-jna projects/goio-jna

3. Update `java-projects.rb` to use a `:maven` type build, but *without* `:repo` or `:branch` specified

        'goio-jna'  => { :build_type => :maven,
                         :build => MAVEN_STD_CLEAN_BUILD,
                         :path => 'org/concord/sensor/goio-jna',
                         :sign => true }

4. Rebuild the project using `build-jars.rb`

        build-jars.rb --maven-update goio-jna

5. Repeat 2 - 4 for any other projects you'd like to build from source
