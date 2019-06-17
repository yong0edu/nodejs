var m = {
    v:'v1',
    f:function(){
        console.log(this.v)
    }
}

//객체가 많아지는것도 복잡해질 수 있다. 그래서 이 객체들을 묶는것을 
//모듈이라고 한다. 

module.exports = m;