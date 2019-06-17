var members = ['egoing', 'yong', 'ji']
console.log(members[1]);

var i = 0;
while(i < members.length){
    console.log('array loop', members[i]);
    i += 1;
}


var roles = {
    'programmer': 'yong',
    'artist': 'ji',
    'manager': 'egoing'
}

console.log(roles.manager);


for (var name in roles){
    console.log('object', name, roles[name]);
}


var n = {
    'mon':'yong',
    'tue':'ji',
    'wed':'egoing'
}

for(var i in n){
    console.log('day=', i, 'name=', n[i])
}