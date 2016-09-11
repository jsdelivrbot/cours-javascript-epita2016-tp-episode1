// ZALGO
// https://github.com/caolan/async#ensureAsync
// http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony

import _ from 'lodash';
import findAgency from './find-agency';

context('[Lesson 7]', function () {

  describe('find-agency', function () {
    const AGENCIES = [
      {
        id: 1,
        name: 'Reuters'
      },
      {
        id: 2,
        name: 'AFP'
      },
      {
        id: 3,
        name: 'AP'
      },
      {
        id: 4,
        name: 'Unknown'
      },
    ];

    let mockDb;

    beforeEach(function () {
      mockDb = {
        findAgency: function (filter, cb) {
          var agency = _.find(AGENCIES, filter);
          setTimeout(() => cb(null, agency));
        }
      };

    });
    afterEach(function () {
    });

    it('should identify agency for image 1', function(done) {
      const image1 = {
        url: 'photo1.jpg',
        agencyName: 'AFP'
      };

      findAgency(mockDb, image1, (err, res) => {
        if (err) return done(err);

        expect(res).to.deep.equal({
          id: 2,
          name: 'AFP'
        });
        done();
      });
    });

    it('should identify agency for image 2', function(done) {
      const image2 = {
        url: 'photo2.jpg',
        credit: 'AP'
      };

      findAgency(mockDb, image2, (err, res) => {
        if (err) return done(err);

        expect(res).to.deep.equal({
          id: 3,
          name: 'AP'
        });
        done();
      });
    });

    it('should identify agency for image 3', function(done) {
      const image3 = {
        url: 'photo3.jpg',
      };

      findAgency(mockDb, image3, (err, res) => {
        if (err) return done(err);

        expect(res).to.deep.equal({
          id: 4,
          name: 'Unknown'
        });
        done();
      });
    });
  });
});
