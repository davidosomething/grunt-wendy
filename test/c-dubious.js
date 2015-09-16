casper.test.begin('Dubious test suite', 2, function (test) {
  casper.start('http://google.com/', function () {
    test.assertTitle('Google', 'google homepage title is the one expected');
  });

  casper.run(function () {
    test.done();
  });
});
