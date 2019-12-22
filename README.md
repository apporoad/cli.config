# cli.config
config for cli


## how to use  in code
```shell
npm i --save cli.config.js
```
recommand use
```js
var cc = require('cli.config.js')
var yourDefaultConfig = {
     example1 : "LiSA",
     example2 : {
         name : "LiSA",
         remark: "hello good day"
     }
}
var cc = require('cli.config.js').system('yourProgramName')
    .default(yourDefaultConfig)
    .force(yourConfirmedConfig)

// here get config
console.log(cc.get('example1'))
// LiSA
console.log(cc.get().example1)
// LiSA
console.log(cc.get().example2.name)
// LiSA
console.log(cc.get('example2.name'))
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
npm i -g cli.config.js
```
```shell
cconfig -h
cc -h

```

## using in prod env

pliz set env :
```bash

vim /etc/profile

export CC_PATH="/cli.config/"

```
