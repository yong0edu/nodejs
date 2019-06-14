function a(){
    console.log('A')
}

a();

var a = function(){
    console.log('B');
}

a();

function slowFunc(callback){
    callback();
}

slowFunc(a);