const url = require('url');

const myurl = new URL('http://myWeb.com:8080/hello.html?id=10&status=Active');

// serialized url
console.log(myurl.href);
console.log(myurl.toString());

// host or root domain
console.log(myurl.host);

// hostname
console.log(myurl.hostname);

// path name
console.log(myurl.pathname);

// serialize query
console.log(myurl.search)

// create params object
console.log(myurl.searchParams);

// add params dynamically
myurl.searchParams.append('gunjan','3107');
console.log(myurl.searchParams);

myurl.searchParams.forEach((value, name) => {
    console.log(`${name}: ${value}`);
})
