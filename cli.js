var config = require('./main').system("cconfigForCli").default({ "operateSystem" : "default"})
var commander = require('commander')

exports.system = systemName =>{
    if(systemName){
        config.set("operateSystem" , systemName)
    }
}


exports.run =(args,systemName) =>{
    commander.version("1.0.0")
        .usage('\r\nget\r\n'
            + 'get [key]\r\n'
            + 'set [key] [value]\r\n'
            + 'ls\r\n'
            + 'list\r\n'
            + 'system [systemName]'
            + 'system')
        .parse(args)
    //console.log(commander.args)
    if(commander.args.length == 0){
        console.log("pliz try -h")
    }else{
        systemName = systemName || config.get("operateSystem")
        var systemConfig = require('./index').system(systemName)
        switch(commander.args[0]){
            case 'get':
                console.log("[" + systemName  + "]:" + JSON.stringify( systemConfig.get(commander.args.length>1 ? commander.args[1] : null)))
                break
            case 'set':
                if(commander.args.length>2){
                    systemConfig.set(commander.args[1],commander.args[2])
                }
                else{
                    console.log('pliz try -h')
                }
                break
            case 'ls':
            case 'list':
                systemConfig.ls().forEach(element => {
                    console.log(element)
                });
                break
            case 'system':
                if(commander.args.length>1){
                    exports.system(commander.args[1])
                }
                else{
                    console.log('current selected system : ' + config.get("operateSystem"))
                }
                break
            default:
                console.log('pliz try -h')
                break
        }
    }
}