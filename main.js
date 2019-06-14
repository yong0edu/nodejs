var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
 

function templateHTML(title, list, body, control){
    return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
        </body>
        </html>            
    `; 
}

function templateList(filelist){
    var list = '<ul>'
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1;
    }
    list = list + '</ul>'
    return list;
}
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
        if(queryData.id === undefined){
            fs.readdir('./data', 'utf8', function(err, filelist){
                var title = 'Welcome'
                var description = 'Hello, Nodejs!'
                var list = templateList(filelist);
                var template = templateHTML(title, list, 
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">CREATE</a>`); 
            response.writeHead(200);
            response.end(template);
            });
        } else {
            fs.readFile(`./data/${queryData.id}`, 'utf-8', function(err, description){
                fs.readdir('./data', function(err, filelist){
                    var list = templateList(filelist);
                    var title = queryData.id
                    var template = templateHTML(title, list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">CREATE</a> <a href="/update?id=${title}">UPDATE</a>`);
                response.writeHead(200);
                response.end(template);  
                })
            });
        }
    } else if(pathname === '/create'){
        fs.readdir('./data', function(err, filelist){
            var title = 'Create'
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action='http://localhost:3000/create_process' method='POST'>
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `, ''); 
        response.writeHead(200);
        response.end(template);
        });
    } else if (pathname === '/create_process'){ 
        if (request.method == 'POST'){
            var body ='';
            request.on('data', function(data){
                body += data;
                if (body.length > 1e6) {
                    request.connection.destroy();
                }
            });
            request.on('end', function(){
                var post = qs.parse(body); 
                var title = post.title;
                var desc = post.description; 
                fs.writeFile(`./data/${title}`, desc, 'utf8', function(err){
                    response.writeHead(302, {Location:`/?id=${qs.escape(title)}`});
                    response.end();
                })
            })
        }
    } else {
        response.writeHead(404);
        response.end('Not Found!');
    }
});
app.listen(3000);