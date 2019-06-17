// array, object

// function f1(){
//     console.log(1+1)
// }
// console.log(1+1);
// f1();

// 함수를 변수에 담을 수 있다면 값이다. 변수에 담을 수 없으면 값이 아니다. 
// var i = if(true){console.log('1');}  <- 오류가 나온다. 즉 값이 아니다.


var f = function(){
    console.log(1+2);
    console.log(2+2);
}

console.log(f);
f();

var a  = [f];
a[0];
a[0]();


var o = {
    func: f
}
o.func();



// 즉 함수는, 서로 연관된 원소들을 담는 객체. 