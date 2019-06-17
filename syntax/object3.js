var v1 = 'v1';
// 100000개의 code가 있다고 가정합시다. 
v1 = 'yong'
var v2 = 'v2';

var o = {
    v1: 'v1',
    v2: 'v2'
}
// 객체에 담는것은, 1억개의 파일을 하드 드라이브에 그냥 마구잡이로 담는것이 아니라, 
// 폴더를 이용해서 정리하는 것과 같다. 


function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}

f1();
f2();

// 같은 이름의 함수를 만들면, 이 전의 함수는 사라진 것이나 마찬가지인 것이 된다.

var o = {
    v1: 'v1',
    v2: 'v2',
    f1: function f1(){
        console.log(o.v1);
    },
    f2: function f2(){
        console.log(o.v2);
    }
}

o.f1();
o.f2();

//객체의 변수 명이 바뀌면, 우리는 함수 안의 변수 이름을 바꿔줘야 한다. 
//100000000억개의 코드라고 생각한다면,,,,
//그래서 우리는 this. 를 사용한다.

var p = {
    v1: 'v1',
    v2: 'v2',
    f1: function f1(){
        console.log(this.v1);
    },
    f2: function f2(){
        console.log(this.v2);
    }
}

p.f1();
p.f2();