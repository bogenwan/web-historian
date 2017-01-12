var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

var paths = {
  indexHTML: path.join(__dirname, '../web/public/index.html'),
  randomPath: path.join(__dirname, '../test/testdata/sites/')
};


exports.handleRequest = (req, res) => {
  // var readFile = function(path, ) 

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, httpHelpers.headers);
    fs.readFile(paths.indexHTML, 'utf8', (err, data) => {
      if (err) { throw err; }
      res.end(data);
    });
  } 
  
  //console.log(`/www.${domain}.com`);
  if (req.method === 'GET' && req.url !== '/') {
    var splitPath = req.url.split('/');
    var domain = splitPath[splitPath.length - 1];
    //console.log('brfore read file', domain);
    //console.log('outside fs', paths['randomPath'] + domain);
    fs.readFile(paths['randomPath'] + domain, 'utf8', (err, data) => {
      if (err) { 
        res.writeHead(404, httpHelpers.headers);
        res.end(data);
      }
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    }); 
  }
};

// res.end(archive.paths.list);


// req = {
//   method: "GET",
//   url: "/www.google.com",
// }

// 12342342/wwww.google.com 