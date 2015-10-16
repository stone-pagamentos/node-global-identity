module.exports = function gruntConfig(grunt) {
  require('load-grunt-tasks')(grunt);

  const files = ['gruntfile.js', 'index.js', 'tests/**/*.js', 'libs/**/*.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['eslint', 'env:test', 'mochaTest']);
};
