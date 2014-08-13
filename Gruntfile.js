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
                PLANET_NAME: 'planet_node'
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
        },






        notify: {
            sass: {
                options: {
                    title: 'Task Complete',
                    message: 'Compiled SASS'
                }
            },
            nodemon: {
                options: {
                    title: 'Task Complete',
                    message: 'Starting app and watching for changes'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['notify', 'env', 'concurrent']);
};
