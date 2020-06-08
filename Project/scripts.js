const baseURL = 'http://api.sportradar.us/ncaamb/trial/v7/en/league/2020/06/07/changes.json?api_key=p433rveu2m668aybxc7kefa9';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', baseURL);
if (!xhr) {
  throw new Error('CORS not supported');
}

const rosterFind = (term) => {
        let url = baseURL;
        fetch(url)
          .then(response => response.json())
          .then(data =>{
            console.log(data);
          });
};

const textGen = () => {
  return  `<a id="h2" href="#">
        <i class="fas fa-bars"></i>
        Teams
    </a>
    <a href="butler.html">Butler</a>
    <a href="creighton.html">Creighton</a>
    <a href="depaul.html">DePaul</a>
    <a href="georgetown.html">Georgetown</a>
    <a href="marquette.html">Marquette</a>
    <a href="providence.html">Providence</a>
    <a href="saintjohns.html">St. John's</a>
    <a href="setonhall.html">Seton Hall</a>
    <a href="uconn.html">UConn</a>
    <a href="villanova.html">Villanova</a>
    <a href="xavier.html">Xavier</a>`;
}

const textGen2 = () => {
  return  `<a id="h1" href="#">
      <i class="fas fa-bars"></i>
      Teams
  </a>`;
}

const teamBar = () => {
  console.log("expanding...");
  document.querySelector('.sidebar').innerHTML = textGen();
  document.querySelector('#h2').onclick = noBar;
};

const noBar = () => {
  console.log("collapsing...");
  document.querySelector('.sidebar').innerHTML = textGen2();
  document.querySelector('#h1').onclick = teamBar;
}

document.querySelector('#h2').onclick = noBar;
