var cc1 = require('./index').system('abc').default({"abc":"LiSA"})

var cc2 = require('./index').system('bcd').default({'abc':"luna"})

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
