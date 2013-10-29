module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
        'test/e2e/**/*.js'
    ],
 // list of files to exclude
    exclude : ['test/e2e/lib/angular/angular-scenario.js'],
    
    urlRoot : '/__e2e/',        
    autoWatch : true,
//    autoWatch : false,
    browsers : ['Chrome'],
    frameworks: ['ng-scenario'],
    singleRun : true,

    proxies : {
      '/': 'http://localhost:5000'
    },

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'    
            ],

    junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }
})}

