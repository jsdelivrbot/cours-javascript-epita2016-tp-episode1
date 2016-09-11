import _ from 'lodash';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!'


// open APIs :
// http://jsonplaceholder.typicode.com
// http://www.icndb.com/api/


const URL = 'http://api.icndb.com/jokes/random/3?exclude=[nerdy,explicit]';

fetch(URL).then(response => {
  console.log('response', response);
  return response.json();
})
.then(data => {
  console.log('data', data);
  if (data.type !== 'success') throw new Error('API responded but with an error !');
  return data.value;
})
.then(jokes => {
  console.log('jokes', jokes);

  let container = document.querySelector('div.container');

  jokes.forEach(joke => {
    let el = document.createElement('blockquote');
    el.innerHTML = `
		<p>${joke.joke}</p>
    <footer>The Internet Chuck Norris Database <cite title="Source Title">#${joke.id}</cite></footer>`;
    container.appendChild(el);
  });
})
.catch(error => {
  console.log(console);
  console.error(error);
  var el = document.createElement('div');
  el.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;

  document.querySelector('div.container').appendChild(el);
});
