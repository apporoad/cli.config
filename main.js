var util = require('./util')
var os = require('os')
var path = require('path')
var fs = require('fs')
const objectAssignDeep = require('object-assign-deep')
//var cli = require('./cli')



var getFilePath = systemName =>{
    var dir =  path.join(os.tmpdir() , "cli.config")
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
    var p = path.join(dir , systemName + ".config")
    console.log(p)
    return p
}

function config(){
    var _this = this;
    this.systemName = "default"
    this._default = {}
    this.systemConfig =null
    this.force = null;
    /**
     * change systemName
     */
    this.system = systemName =>{
        var newCC = new config()
        newCC.systemName = systemName || _this.systemName
        //call chain
        return newCC 
    };

    /**
     * set default value
     */
    this.default = defaultJson =>{
        if(util.Type.isObject(defaultJson)){
            this._default = defaultJson
        }
        return _this
    }

    /**
     *  set force 
     */
    this.force = forceJson =>{
        _this.force = forceJson
        return _this
    }

    this.getOsCofnig =()=>{
        if(_this.systemConfig){
            return _this.systemConfig
        }
        var p = getFilePath(_this.systemName)
        if(fs.existsSync(p)){
            //console.log(p)
           _this.systemConfig = JSON.parse(fs.readFileSync(p,'utf-8'))
        }
        else{
            _this.systemConfig = {}
        }
        return _this.systemConfig
    }

    /**
     * get config
     */
    this.get = key =>{
        if(key){
            if(key.indexOf(".")> -1){
                var result = _this.get()
                key.split('.').forEach(element => {
                    if(element){
                        if(!result)
                            throw Error("cli.config : get: cant get key : " + key + " from " + JSON.stringify(this.get()))
                        result = result[element]
                    }
                })
                return result
            }
            else{
                return _this.get()[key]
            }
        }else{
            return objectAssignDeep({},_this._default,_this.getOsCofnig(), _this.force || {})
        }
    }
    
    /**
     * set config
     */
    this.set = (key,value) =>{
        if(util.Type.isObject(key)){
            var newConfig = objectAssignDeep({},_this.getOsCofnig(),key)
            _this.systemConfig = newConfig
        }
        else{
            if(key.indexOf('.') > -1){
                var config = _this.getOsCofnig()
                var lastFatherNode = null
                var lastKey = null
                key.split('.').forEach(element=>{
                    if(element){
                        lastFatherNode = config
                        lastKey = element
                        if(config[element]){
                            config = config[element]
                        }else{
                            config[element] ={}
                            config = config[element]
                        }
                    }
                })
                if(lastFatherNode){
                    lastFatherNode[lastKey] = value
                }
            }
            else
            {
                //console.log(_this.systemConfig)
                _this.getOsCofnig()[key] = value
            }
        }
        //console.log(getFilePath(_this.systemName))
        fs.writeFileSync(getFilePath(_this.systemName),JSON.stringify(_this.systemConfig),'utf-8')
    }

    /**
     * clear config
     */
    this.clear = ()=>{
        fs.unlink(getFilePath(_this.systemName),()=>{})
        _this.systemConfig={}
    }

    /**
     * ls all name
     */
    this.ls = ()=>{
        var dir =  path.join(os.tmpdir() , "cli.cofnig")
        var array = []
        fs.readdirSync(dir).forEach(element=>{
            if(element.indexOf('.config')){
                array.push(path.parse(element).name)
            }
        })
        return array
    }

}




module.exports = new config()
