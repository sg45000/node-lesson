

//console.log("hello world");

//nonblokking
setTimeout (function(){
    console.log("hello")},1000);
console.log("world");

//blocking
var start = new Date().getTime();
while(new Date().getTime() < start +1000);
console.log("world2");

