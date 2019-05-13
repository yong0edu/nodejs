var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log('url =',_url)
    var queryData = url.parse(_url, true).query;
    console.log('query =', queryData)
    // url.parse는 url을 객체 형식으로 분석해주는데, 
    // 인자로 _url를 넘겨주고 거기에 query 부분만 가져달라고 하면
    // {id: 'CSS'}등의 객체를 생산해낸다. 
    var title = queryData.id;
    // query data 중에서 id 부분을 title 변수에 담아 사용한다. 
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        fs.readFile(`./data/${queryData.id}`, 'utf-8', function(err, description){
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
            <p>
               ${description} 
            </p>
            </body>
            </html>
        
        `;
    
        response.writeHead(200);
        response.end(template);
      
        })
    } else {
        response.writeHead(404);
        response.end('Not Found!');
    }

    

});
app.listen(3000);