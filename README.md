# cli.config
config for cli


## how to use  in code
```shell
npm i --save cli.config
```
recommand use
```js
var yourDefaultConfig = {
     example1 : "LiSA",
     example2 : {
         name : "LiSA",
         remark: "hello good day"
     }
}
var cc = require('cli.config').system('yourProgramName').default(yourDefaultConfig)

// here get config
console.log(cc.get('example1'))
// LiSA
console.log(cc.get().example1)
// LiSA
console.log(cc.get().example2.name)
// LiSA

// here set config
cc.set({
    "newName" : 123,
    "lover" : {
        name : "LiSA",
        age : 32
    }
}) 
// it will restore @ your system user

cc.clear()
//clean configs 

cc.set("key","value")
// add node key
console.log(cc.get("key"))

```

## how to use in cli
```shell
npm i -g cli.config
```
```shell
```