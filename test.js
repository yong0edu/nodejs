var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    if(pathname === '/'){
        fs.readFile(`./data/${title}`, 'utf8', function(err, desc) {
            if (queryData.id === undefined){
                var title = 'Welcome'
                var desc = 'Hello nodejs!'
            } else {
                var title = queryData.id;
            }
            var template = `
                <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        <ol>
                            <li><a href="/?id=HTML">HTML</a></li>
                            <li><a href="/?id=CSS">CSS</a></li>
                            <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ol>
                        <h2>${title}</h2>
                        <p style="margin-top:45px;">
                            ${desc}
                        </p>
                    </body>
                </html>
            `;
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('File not Found');
    }
    
    
});

app.listen(3000);