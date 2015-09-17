# grunt-wendy

> CasperJS test runner built for GruntJS

[![Upstream][upstreamBadge]][upstreamLink]
[![NPM version][versionBadge]][versionLink]
[![Travis CI build status][travisBadge]][travisLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]
<br>[![npm Badge][nodeiBadge]]([nodeiLink])

This was originally a fork of [ronaldlokers/grunt-casperjs] but with more
features:
  * [custom casper test runners]
  * no grunt output (`silent` flag of grunt-casperjs is always on)
  * custom grunt exit status (warn on skips/fatal on casper error)
  * Output parsing and aggregated results

## Screenshot

![Example output](https://raw.githubusercontent.com/davidosomething/grunt-wendy/master/screenshot.png)

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt] before, be sure to check out the [Getting Started]
guide, as it explains how to create a [Gruntfile] as well as install and use
Grunt plugins. Once you're familiar with that process, you may install this
plugin with this command:

```shell
npm install --save-dev grunt-wendy
```

One the plugin has been installed, it may be enabled inside your Gruntfile with
this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-wendy');
```

## The "wendy" task

### Overview

In your project's Gruntfile, add a section named `wendy` to the data object
passed into `grunt.initConfig()`.

### Usage Examples

#### Default Options

```javascript
grunt.initConfig({
  wendy: {
    options: {
      async: 'eachSeries',
      clean: true,
      cli: [],
      runner: null
    },
    files: ['tests/e2e/**/*.js']
  },
})
```

#### Async

Tasks are run in series by default (one after the other). To change how tests
are run, set the async option to a node async compatible value such as:

* `each` - run in parallel
* `eachSeries` - run in series

```javascript
wendy: {
  options: {
    async: 'each'
  },
  inparallel: ['tests/e2e/a/*.js'],
  inparallel2: ['tests/e2e/b/*.js']
}
```

#### Clean

This task tries to clean up the casper output a bit and outputs aggregated
test results when multiple suites (multiple files) are run in a single task.

You can set the option to false to disable it.

```javascript
wendy: {
  options: {
    clean: false
  },
  tests: ['tests/e2e/**/*.js']
}
```

#### Runner

The task uses [casper's included test runner] by default. If you'd like to use
a custom runner, casper allows this. Specify a new test runner JS file to the
`runner` option and wendy will hook it up.

```javascript
wendy: {
  options: {
    runner: 'tests/e2e-runner.js'
  },
  files: ['tests/e2e/**/*.js']
}
```

#### CLI Options

CasperJS CLI options (including user defined ones) can be passed in using
'cli' in the options object

```javascript
wendy: {
  options: {
    cli: ['--foo=bar', '--no-colors']
  },
  files: ['tests/e2e/**/*.js']
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt].

Follow the standards of the included eslint and markdownlint.

## CHANGELOG
* 0.0.4
    * Use `grunt.util.linefeed` for better Windows output
* 0.0.3
    * Add test for dubious output
    * Fix aggregated output (skipped and dubious showing same result)
* 0.0.2
    * Split into modules in `lib/`
* 0.0.1
    * Forked from [ronaldlokers/grunt-casperjs]
    * Refactor into single grunt task module
    * Rename task from `casperjs` to `wendy`
    * Changed `casperjsOptions` option key to `cli`
    * Add support for custom runner
    * Always use `silent` option from unpublished release of casperjs
    * Expose node async settings
    * parse casper output and show aggregated results for a set of files
      if `clean` option is true (default)

----

[Grunt]: http://gruntjs.com/
[Getting Started]: http://gruntjs.com/getting-started
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[ronaldlokers/grunt-casperjs]: https://github.com/ronaldlokers/grunt-casperjs
[ronaldlokers]: https://github.com/ronaldlokers/grunt-casperjs
[custom casper test runners]: http://casperjs.readthedocs.org/en/latest/testing.html#extending-casper-for-testing
[casper's included test runner]: https://github.com/n1k0/casperjs/blob/master/tests/run.js

[davidBadge]:       https://david-dm.org/davidosomething/grunt-wendy.png?theme=shields.io
[davidLink]:        https://david-dm.org/davidosomething/grunt-wendy#info=dependencies
[davidDevBadge]:    https://david-dm.org/davidosomething/grunt-wendy/dev-status.png?theme=shields.io
[davidDevLink]:     https://david-dm.org/davidosomething/grunt-wendy#info=devDependencies
[nodeiBadge]:       https://nodei.co/npm/grunt-wendy.png
[nodeiLink]:        https://nodei.co/npm/grunt-wendy/
[travisLink]:       https://travis-ci.org/davidosomething/grunt-wendy
[travisBadge]:      https://travis-ci.org/davidosomething/grunt-wendy.svg?branch=master
[upstreamBadge]:    https://img.shields.io/badge/upstream-GitHub-lightgrey.svg
[upstreamLink]:     https://github.com/davidosomething/grunt-wendy
[versionBadge]:     https://badge.fury.io/js/grunt-wendy.svg
[versionLink]:      https://badge.fury.io/js/grunt-wendy
