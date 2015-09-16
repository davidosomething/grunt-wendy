casper.test.begin('Start second test suite', function (test) {
  casper.start('http://google.com/', function () {
    test.assertTitle('Google', 'google homepage title is the one expected');
    test.assertExists('form[action="/search"]', 'main form is found');
  });

  casper.run(function () {
    test.done();
  });
});
