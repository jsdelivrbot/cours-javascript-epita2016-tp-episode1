
import _ from 'lodash';
import tryUntil from './try-until';

export default function findAgency (DB, image, cb) {
  tryUntil([
    // TODO find by agencyName
    // TODO find by credit
    // TODO fallback to 'Unknown'
  ], cb);
}
