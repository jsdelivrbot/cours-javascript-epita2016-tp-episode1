import mocha from 'mocha';
mocha.checkLeaks();
//mocha.globals(['jQuery']);

import chai from 'chai';
import sinon_chai from 'sinon-chai';
chai.use(sinon_chai);

import './some-test.js';

mocha.run();
