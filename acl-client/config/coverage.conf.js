module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'client/lib/angular/angular.js',
      'client/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'client/js/**/*.js',
      'test/unit/**/*.js'
    ],

    preprocessors : {
    	'client/js/**/*.js' : 'coverage'
    },
    
    reporters : ['coverage'],
    coverageReporter : {
    	type : 'html',
    	dir : 'coverage/'
    },
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
})}
