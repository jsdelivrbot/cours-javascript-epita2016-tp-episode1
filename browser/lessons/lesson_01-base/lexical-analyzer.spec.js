import * as LexicalAnalyser from './lexical-analyzer';

// inspiration : https://www.new-bamboo.co.uk/blog/2013/02/26/full-text-search-in-your-browser/

context('[Lesson 1]', function () {

  describe('lexical analyser', function () {

    describe('tokenize(...)', function () {

      it('should tokenize properly a trivial string', function () {
        expect( LexicalAnalyser.tokenize('Qui me parle ?') )
          .to.deep.equal([ 'Qui', 'me', 'parle', '?' ]);
      });

      it('should tokenize properly a trivial string with extra spaces', function () {
        expect( LexicalAnalyser.tokenize(' Qui me  parle ? ') )
          .to.deep.equal([ 'Qui', 'me', 'parle', '?' ]);
      });
    });

    describe('stem(...)', function () {

      it('should stem by harmonizing case', function () {
        expect( LexicalAnalyser.stem('Qui') ).to.equal('qui');
      });
    });

    describe('parse(...)', function () {

      it('should combine the tokenizer and stemmer', function () {
        expect( LexicalAnalyser.parse(' Qui me  parle ?  Qui me cherche ?') )
          .to.deep.equal([ 'qui', 'me', 'parle', '?', 'qui', 'me', 'cherche', '?' ]);
      });
    });

    describe('index(...)', function () {

      it('should parse then compute term frequency', function () {
        expect( LexicalAnalyser.index(' Qui me  parle ?  Qui me cherche ?') )
          .to.deep.equal({
            qui: 2,
            me: 2,
            parle: 1,
            cherche: 1,
            '?': 2
          });
      });
    });
  });
});
