// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            options: {
                //Shared Options Hash
            },
            dev: {
                NODE_ENV: 'development',
                DEST: 'temp',
                DEBUG: 'server,feedreader:*,api_v1,router:*',
                PLANET_NAME: 'planet_angular'
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                limit: 5,
                logConcurrentOutput: true
            }
        },
        sass: {
            dist: {
                files: {
                    './public/css/main.css': './public/css/scss/main.scss'
                }
            }
        },
        nodemon: {
            dev: {
                script: './bin/www'
            }
        },
        watch: {
            files: './public/css/scss/*.scss',
            tasks: ['sass']
        }
    });
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['env', 'concurrent']);
};