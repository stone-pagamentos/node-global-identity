module.exports = function gruntConfig(grunt) {
  require('load-grunt-tasks')(grunt);

  const files = ['gruntfile.js', 'index.js', 'tests/**/*.js', 'lib/**/*.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'es5/node-global-identity.js': 'lib/node-global-identity.js',
          'es5/express-middleware.js': 'lib/express-middleware.js',
        },
      },
    },
    eslint: {
      target: files,
    },

    env: {
      test: {
        NODE_ENV: 'test',
      },
    },

    mochaTest: {
      src: ['tests/**/*-test.js'],
      options: {
        reporter: 'spec',
        require: ['babel/register', 'should'],
      },
    },

    watch: {
      scripts: {
        files: files,
        tasks: ['eslint'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('test', ['eslint', 'env:test', 'mochaTest']);
};
