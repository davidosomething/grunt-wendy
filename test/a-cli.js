casper.test.begin('Start test suite', function (test) {
  casper.start('http://google.com/', function () {
    test.assertEquals(casper.cli.get('foo'), 'bar', "options were passed in successfully");
    test.assertTitle('Google', 'google homepage title is the one expected');
    test.assertExists('form[action="/search"]', 'main form is found');
    casper.fill('form[action="/search"]', {
      q: 'foo'
    }, true);
  });

  casper.then(function () {
    test.assertTitle('foo - Google Search', 'google title is ok');
    test.assertUrlMatch(/q=foo/, 'search term has been submitted');
    test.assertEval(function () {
      return __utils__.findAll('h3.r').length >= 10;
    }, 'google search for "foo" retrieves 10 or more results');
  });

  casper.run(function () {
    test.done();
  });
});
