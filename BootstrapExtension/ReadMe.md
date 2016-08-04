## BOOTSTRAP CSS IN QLIK SENSE

The following instructions assume that you are familiar with the basics of Node.js, Bower and Grunt (or Gulp). All the steps demonstrated below can also be achieved manually or with other tools, but this just seems to be the easiest way for me.

* Create a folder (we call it BootstrapExtension)

* Inside the folder install Bootstrap using Bower:

```
bower install bootstrap
```

You’ll see a folder bower_components inside the folder BootstrapExtension. If you look into \BootstrapExtension\bower_components\bootstrap\less you’ll find all .less based styles of Bootstrap. The file bootstrap.less is the entry point for generating the entire Bootstrap CSS.

Create another folder called “less” add a file called _root.less

add the below code

```
.bootstrap_inside {   
    @import "bower_components/bootstrap/less/bootstrap.less";
}

```
Your folder structure should then look like this
![alt img] ()



##Generating the CSS output

Now we can use Grunt for generating the CSS based on the .less files with just a few simple steps:


* Install Grunt
```
npm install grunt --save-dev
```
* Install the Grunt plugin to compile LESS files to CSS (grunt-contrib-less)
```
npm install grunt-contrib-less --save-dev
```
Next we have to create a file with our Grunt tasks (Gruntfile.js)

Create the file in the root of BootstrapExtension and paste the following code to it:

```
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      bootstrap: {
        files: {
          "./output/scoped-bootstrap.css": "./less/_root.less"
        }   
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);

};
```
* Finally run the command grunt in the command line and you’ll see a folder output appearing containing a file named scoped-bootstrap.css with the generated style
![alt img] ()

* Save

![alt img] ()