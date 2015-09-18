casper.test.begin('Failing test suite', 2, function (test) {
  casper.start();

  casper.then(function () {
    test.assertTitle('Googlesss', 'google homepage title is the one expected');
  });

  casper.run(function () {
    test.done();
  });
});
