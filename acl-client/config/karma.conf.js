module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'client/lib/jquery/jquery.min.js',
      'client/lib/angular/angular.js',
      'client/lib/angular/angular-*.js',
//      'client/lib/angular/angular-resource.js',
      'client/lib/underscore/underscore.min.js',
      'test/lib/angular/angular-mocks.js',
      'client/js/**/*.js',
//    'test/unit/**/*.js'
      'test/unit/services/sessionServiceSpec.js',
      'test/unit/services/routeServiceSpec.js',
      'test/unit/services/flashServiceSpec.js',
      'test/unit/services/authenticationServiceSpec.js',
      'test/unit/services/paginationServiceSpec.js',
      'test/unit/services/pageServiceSpec.js',
      'test/unit/controllers/userSpec.js',
      'test/unit/controllers/postCodeSpec.js'
    ],

    autoWatch : true,
    frameworks: ['jasmine'],
//    browsers : ['Chrome'],
    browsers : ['Firefox'],
//    browsers : ['Chromium'],
    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
})}
