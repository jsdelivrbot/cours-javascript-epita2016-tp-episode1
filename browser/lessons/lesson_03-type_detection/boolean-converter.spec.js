import _ from 'lodash';

import convertToBoolean from './boolean-converter';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
// http://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
// http://heyjavascript.com/javascript-string-to-boolean/
// https://gist.github.com/CMCDragonkai/7389368
// http://www.bennadel.com/blog/1784-using-double-not-operator-for-boolean-type-casting.htm

context('[Lesson 3]', function () {

  describe('Boolean Converter', function () {

    it('should be able to do a correct conversion to boolean (round 1)', function () {
      const TEST_CASES = [
        {
          input: true,
          expected: true
        },
        {
          input: false,
          expected: false
        },
        {
          input: 'true',
          expected: true
        },
        {
          input: 'false',
          expected: false
        }
      ];

      TEST_CASES.forEach(ensure);
    });

    it('should be able to do a correct conversion to boolean (round 2)', function () {
      const TEST_CASES = [
        {
          /* eslint-disable no-undefined */
          input: undefined,
          expected: false
        },
        {
          input: null,
          expected: false
        }
      ];

      TEST_CASES.forEach(ensure);
    });

    it('should be able to do a correct conversion to boolean (round 3)', function () {
      const TEST_CASES = [
        {
          input: 'foo',
          expected: false
        },
        {
          input: '',
          expected: false
        }
      ];

      TEST_CASES.forEach(ensure);
    });

    // Too hard ;-) but bonus points if you do it
    it.skip('should be able to do a correct conversion to boolean (round 4)', function () {
      const TEST_CASES = [
        {
          input: 0,
          expected: false
        },
        {
          input: 1,
          expected: true
        },
        {
          input: new Boolean(true),
          expected: true
        },
        {
          input: new Boolean(false),
          expected: false
        }
      ];

      TEST_CASES.forEach(ensure);
    });

    function ensure (testCase) {
      var output = convertToBoolean(testCase.input);
      expect(output, 'output type for ' + JSON.stringify(testCase.input))
        .to.be.a.Boolean;
      expect(output, 'output for ' + JSON.stringify(testCase.input))
        .to.equal(testCase.expected);
    }
  });
});
