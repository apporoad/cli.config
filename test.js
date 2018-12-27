var cc1 = require('./main').system('abc').default({"abc":"LiSA"})

var cc2 = require('./main').system('bcd').default({'abc':"luna"})

console.log(cc1.get())
console.log(cc2.get())

console.log(cc1.get().abc)
console.log(cc1.get("a"))


//cc1.set({ name : "LiSA", alias:"1154"})

//cc2.set({ name : "luna" , age : 28})

console.log(cc1.get())
console.log(cc2.get())

//add

//cc1.set("boyfirend" ,"apporoad")

console.log(cc1.get())


// rewrite
//cc1.set("abc","hello good day")

//clear

//cc1.clear()


// ...
 cc1.set(".node1.node2" ,"hello hello good day")

 console.log(cc1.get())
 console.log(cc1.get("..node1"))
 console.log(cc1.get('..node1.node2'))
 //console.log(cc1.get('.ac.ad'))



// test deep copy
console.log('+++++++++++++++++++++++++++++++++++++++++')

 var cc3 = require('./main').system('bcd').default({'hello':{ 'hello' : "good day" }})

 cc3.set("hello",{ 'hi': 'nihao'})

 console.log(cc3.get())



 var cc4 =  require('./main').system('bcd').default({'hello':{ 'hello' : "good day" }}).force({'hello':{ 'hello' : "force" }})

cc4.set("hello",{ 'hi': 'nihao'})

console.log(cc4.get())