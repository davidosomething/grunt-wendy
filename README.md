# <img src="https://raw.githubusercontent.com/davidosomething/grunt-wendy/master/docs/wendy.png" alt="grunt-wendy Logo" valign="middle" style="width: 1.5em;"> grunt-wendy

> CasperJS test runner built for GruntJS

[![Upstream][upstreamBadge]][upstreamLink]
[![NPM version][versionBadge]][versionLink]
[![Travis CI build status][travisBadge]][travisLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]
<br>[![npm Badge][nodeiBadge]][nodeiLink]

This was originally a fork of [ronaldlokers/grunt-casperjs] but with more
features:

* [custom casper test runners]
* no grunt output (`silent` flag of grunt-casperjs is always on)
* customizable output parsing
* aggregated results across all casper tasks run
* custom grunt exit status (warns on skips/dubious instead of failing)

## Screenshot

![Example output](https://raw.githubusercontent.com/davidosomething/grunt-wendy/master/docs/screenshot.png)

## Getting Started

This plugin requires Grunt `~0.4.0`

This plugin requires phantomjs `~1.9.11`
It is specified as a peer dependency, so be sure to install the version of your
choosing, e.g.

* npm package version 1.9.11 on OSX for phantomjs 1.9.7 (least buggy version)
* npm package version >=1.9.15 on node.js 4.0 or io.js (the only installable
  versions due to other dependencies)

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
      cli: [],
      runner: 'test',
      formatter: formatter, // function in tasks/lib/formatter.js
      formatterOptions: {
        whitespace: true,
        filter: null
      },
      fail: ['failed'],
      warn: ['dubious', 'skipped']
    },
    files: ['tests/e2e/**/*.js']
  },
})
```

#### Some nice options for Jenkins / CI servers

```javascript
grunt.initConfig({
  wendy: {
    options: {
      async: 'each',
      cli: [
        '--no-colors',          // jenkins hates color
        '--log-level=error',    // hide casper logging
        '--web-security=false'  // phantomjs option
      ],
      formatterOptions: {
        whitespace: true,
        // filter out useless headers since we're running async and they'll
        // be out of order
        filter: /(Test file:)|(tests executed)|(^\w*#)/
      },
      fail: ['failed'],   // fail on failed
      warn: ['dubious']   // don't fail on dubious
    },
    files: ['tests/e2e/**/*.js']
  }
});
```

### Reading CLI options from Grunt

CasperJS CLI options can also be passed directly from the command line when
running `grunt`. To use this feature, prefix the args with `wendy` and they'll
be passed through from grunt to casper. E.g.

    grunt wendy:myTests --wendy-somearg --wendy-server=http://my.dev --baz=z

Will pass the args to casper as if you had run the command:

    casper test --somearg --server=http://my.dev myTests/

Note that the `wendy` is removed, and args not beginning with wendy, like `baz`
were not included.

### Options

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

See also [Reading CLI options from grunt](#reading-cli-options-from-grunt).

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

#### Formatter

This task captures all casper output and allows formatting of that output.
The formatter can be customized by passing in a function like so:

```javascript
wendy: {
  options: {
    formatter: function (grunt, options, data) {
      grunt.log.write(data);
    }
  },
  files: ['tests/e2e/**/*.js']
}
```

The `data` argument is always a string, a line from casper's stdout or stderr.

The default formatter uses the `clean` option as well. See its source here for
an example: [formatter.js]

#### Formatter Options

This task tries to clean up the casper output whitespace and outputs aggregated
test results when multiple suites (multiple files) are run in a single task.

**If you change the `formatter` this option may not apply.**

* `whitespace`: boolean -- true to clean up casper whitespace
* `filter`: regex -- anything that matches this filter will not be output

```javascript
wendy: {
  options: {
    formatterOptions: {
      // don't try to clean up whitespace
      whitespace: false,

      // don't output lines saying 'Test file:' name and the suite summary
      filter: /(Test file:)|(tests executed)/
    }
  },
  tests: ['tests/e2e/**/*.js']
}
```

#### Grunt exit status

Instead of failing on dubious tests or passing when tests are skipped, this
task only fails when a test actually fails. You can go back to default grunt
behavior, or customize your own using the `fail` and `warn` options.
The options take an array with values `passed`, `failed`, `dubious`, and
`skipped`.

```javascript
wendy: {
  options: {
    fail: ['failed'], // fail the task if any tests failed
    warn: ['dubious'] // grunt warning when tests dubious
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

* 2.1.0
    * Add custom cli flag support, passing `--wendy` cli flags to casper
* 2.0.0
    * fix travis build by installing phantom, major bump
* 1.0.5
    * phantomjs is now a peer dependency
* 1.0.4
    * Ensure utf-8 output on process.stdout.write
* 1.0.3
    * Don't need lodash, removed
* 1.0.2
    * Logo :p
* 1.0.1
    * Readme update
* 1.0.0
    * Change `clean` to `formatterOptions.whitespace`
    * Add `filter` to formatterOptions
* 0.0.6
    * Add `fail` and `warn` options
* 0.0.5
    * Add `formatter` option
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
[formatter.js]: https://github.com/davidosomething/grunt-wendy/blob/master/tasks/lib/formatter.js

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
