var os = require('os');

var androidHelper = require('./lib/android-helper');
var iosHelper = require("./lib/ios-helper");
var utilities = require("./lib/utilities");

module.exports = function(context) {
    console.log("FABRIC PLUGIN HOOKS RUNNING");
    var platforms = context.opts.cordova.platforms;

    // console.log("PLATFORMS = " + JSON.stringify(platforms))
    // Add a build phase which runs a shell script that executes the Crashlytics
    // run command line tool which uploads the debug symbols at build time.
    // Cordova doesn't always send any platforms to this hook for some reason
    if (os.platform() == 'darwin' && platforms.length == 1 && platforms[0] != "android") {
      var xcodeProjectPath = utilities.getXcodeProjectPath(context);
      if (xcodeProjectPath) {
        iosHelper.removeShellScriptBuildPhase(context, xcodeProjectPath);
        iosHelper.addShellScriptBuildPhase(context, xcodeProjectPath);
      } else {
        console.log("NO XCODE PROJECT PATH IN CONTEXT");
      }
    }
  };
