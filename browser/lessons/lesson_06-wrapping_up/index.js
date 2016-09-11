import 'bootstrap';
import 'bootstrap/css/bootstrap.css!'

import _ from 'lodash';
import $ from 'jquery';

import * as LexicalAnalyser from '../lesson_01-base/lexical-analyzer';
import debounce from '../lesson_05-timeouts/debounce';
import { create as createLogger } from '../lesson_04-logger/logger';


const logger = createLogger('Lesson 6');
logger.log('I’m up !');

let debounceUpdate = debounce(updateResults, 500);

window.onChange = function () {
  debounceUpdate();
};

let textareaElement;
function updateResults() {
  textareaElement = textareaElement || $('#inputText');

  let text = textareaElement.val();
  logger.log('updating results for : "' + text + '"');

  let index = LexicalAnalyser.index(text);

  let elements;
  /* TODO
   elements = [
     '<tr><td>Hello</td><td>2</td></tr>',
     '<tr><td>!</td><td>2</td></tr>',
     ...
   ];
   */

  $('#results tbody').empty();
  $('#results tbody:last-child').append( elements );
}

updateResults(); // initial call


/** Hints

 Object.keys(index)  -> [ array of keys of an object ]

 <array>.sort((val1, val2) => comparison)

 */
