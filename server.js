var http = require("http");
fs = require('fs');
ejs = require('ejs')
qs = require('querystring')
var settings = require('./settings.js');
console.log(settings);
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs','utf-8');
var posts = [];

function renderForm(posts,res){
    var data = ejs.render(template,{
        posts: posts
    });
    res.writeHead(200,{'content-Type': 'text/html'});
    res.write(data);
    res.end();
}

server.on('request',function(req,res){
    if(req.method === 'POST'){
        req.data = "";
        req.on("data",function(chunk){
            req.data += chunk;
        });
        req.on("end",function(){
            var query = qs.parse(req.data);
            posts.push(query.name);
            renderForm(posts,res);
        });
    }else{
        renderForm(posts,res);
    }


});
server.listen(settings.port,settings.host);
console.log("server listening......");

// fs.readFile(__dirname + '/public_html/hello.html','utf-8',function(err,data){
    //     if(err){
    //         res.writeHead(404,{'content-Type': 'text/plain'});
    //         res.write('not found!');
    //         return res.end();   
    //     }
    //         res.writeHead(200,{'content-Type': 'text/html'});
    //         res.write(data);
    //         res.end();
    // })

        // console.log(req.url)
    //         if(req.url !='/favicon.ico'){
    //             n++;
    //         }
    //         var data = ejs.render(template, {
    //             title: "hello",
    //             content: "<strong>world!</strong>",
    //             n:n
    //         })
    //         res.writeHead(200,{'content-Type': 'text/html'});
    //         res.write(data);
    //         res.end();