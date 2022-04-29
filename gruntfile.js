// Load Grunt
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // don't watch node_modules
    // used in watch files below
    var excludes = [
        '!**/node_modules/**'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // add excludes to the grunt object for access later
        excludes: excludes,


        connect: {
            server: {
                options: {
                    port: 9001,
                    // open a browser
                    open: true,
                    // inject livereload.js into the pages
                    livereload: true
                }
            }
        },

        // Tasks
        sass: { // Begin Sass Plugin
            dist: {
                files: {
                    'app.css': 'app.scss',

                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: [
                    '**/*.html',
                    '<%= excludes %>'
                ],
            },

            sass: {
                options: {
                    livereload: false
                },
                files: [
                    '**/*.scss'
                ],
                // compile on save
                tasks: ['sass'],
            },
            css: {
                files: [
                    '**/*.css',
                    '<%= excludes %>'
                ],
                tasks: []
            }


        },



        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            dist: {
                files: {
                    'app.css': 'app.css',
                }
            }
        },



    });



    // Register Grunt tasks
    grunt.registerTask('default', ['connect', 'watch']);

};