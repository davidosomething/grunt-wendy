casper.test.begin('Start another test suite', function (test) {
  casper.start('http://google.com/', function () {
    test.assertTitle('Google', 'google homepage title is the one expected');
  });

  casper.run(function () {
    test.done();
  });
});
