import debounce from './debounce';

context('[Lesson 5]', function () {

  describe('debounce', function () {
    let clock, testFn;

    beforeEach(function () {
      clock = sinon.useFakeTimers();
      testFn = sinon.spy();
    });
    afterEach(function () {
      clock.restore();
    });

    it('should call the function after the specified timeout', function () {
      const debounced = debounce(testFn, 200);

      expect(testFn, 'before').not.to.have.been.called;

      debounced();
      expect(testFn, 'immediately').not.to.have.been.called; // not yet

      clock.tick(199);
      expect(testFn, 'after 199').not.to.have.been.called; // not yet

      clock.tick(1);
      expect(testFn, 'after 200').to.have.been.calledOnce; // at last !

      clock.tick(1);
      expect(testFn, 'after 201').to.have.been.calledOnce; // no more

      clock.tick(1000);
      expect(testFn, 'after 201').to.have.been.calledOnce; // still no more
    });

    it('should call the function with correct parameters', function () {
      const debounced = debounce(testFn, 200);

      debounced('hello', 42);

      clock.tick(200);
      expect(testFn).to.have.been.calledOnce;
      expect(testFn).to.have.been.calledWith('hello', 42);
    });

    describe('with several close calls in the window', function() {
      it('should restart the timer at each call', function () {
        const debounced = debounce(testFn, 200);

        debounced('H');
        expect(testFn, 'immediately').not.to.have.been.called; // not yet

        clock.tick(50);
        debounced('He');
        expect(testFn, 'after 50').not.to.have.been.called; // not yet

        clock.tick(150);
        expect(testFn, 'after 200').not.to.have.been.called; // not yet, since re-called after 50

        clock.tick(49);
        expect(testFn, 'after 249').not.to.have.been.called; // not yet

        clock.tick(1);
        expect(testFn, 'after 250').to.have.been.calledOnce; // at last !

        clock.tick(1);
        expect(testFn, 'after 251').to.have.been.calledOnce; // no more

        clock.tick(1000);
        expect(testFn, 'after a long time').to.have.been.calledOnce; // still no more
      });

      it('should call the function with the last parameters', function () {
        const debounced = debounce(testFn, 200);

        debounced('H');
        debounced('He'); // again

        clock.tick(50);
        debounced('Hell'); // again

        clock.tick(50);
        debounced('Hello'); // again

        clock.tick(1000);
        expect(testFn).to.have.been.calledWith('Hello');
      });
    });

    describe('with several close calls in several windows', function() {
      it('should work as expected', function () {
        const debounced = debounce(testFn, 200);

        debounced('H');

        clock.tick(50);
        debounced('Hello');

        clock.tick(200);
        expect(testFn, 'after end of #1').to.have.been.calledOnce;
        expect(testFn).to.have.been.calledWith('Hello');
        testFn.reset(); // convenient

        clock.tick(100);
        debounced('Hello wor'); // new debounce

        clock.tick(50);
        debounced('Hello world !');

        clock.tick(200);
        expect(testFn, 'after end of #2').to.have.been.calledOnce;
        expect(testFn).to.have.been.calledWith('Hello world !');
      });
    });
  });
});
