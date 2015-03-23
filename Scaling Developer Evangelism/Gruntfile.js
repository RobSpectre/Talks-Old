module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        sass: {
            theme: {
                files: {
                'styles/theme.css': 'styles/source/theme.scss'
                }
            }
        },
        jshint: {
            files: [ 'Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: port,
                    base: '.',
                    livereload: true,
                    open: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [ 'Gruntfile.js', 'js/*.js' ],
                tasks: 'jshint'
            },
            theme: {
                files: [ 'styles/source/*.scss' ],
                tasks: 'sass'
            },
            html: {
                files: [ 'index.html']
            }
        },
    });

    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    grunt.registerTask( 'default', [ 'sass', 'jshint' ] );
    grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
};
