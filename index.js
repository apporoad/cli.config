var util = require('./util')
var os = require('os')
var path = require('path')
var fs = require('fs')


var basePath = os.tmpdir()

var getFilePath = systemName =>{
    return path.join(os.tmpdir() , systemName + ".cli.cofnig")
}

function config(){
    var _this = this;
    this.systemName = "default"
    this._default = {}
    this.systemConfig =null
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

    this.getOsCofnig =()=>{
        if(_this.systemConfig){
            return _this.systemConfig
        }
        var p = getFilePath(_this.systemName)
        if(fs.existsSync(p)){
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
            return _this.get()[key]
        }else{
            return Object.assign({},_this._default,_this.getOsCofnig())
        }
    }
    
    /**
     * set config
     */
    this.set = (key,value) =>{
        if(util.Type.isObject(key)){
            var newConfig = Object.assign({},_this.getOsCofnig(),key)
            _this.systemConfig = newConfig
            
        }
        else{
            _this.systemConfig[key] = value
        }
        fs.writeFile(getFilePath(_this.systemName),JSON.stringify(_this.systemConfig),'utf-8',()=>{})
    }

    /**
     * clear config
     */
    this.clear = ()=>{
        fs.unlink(getFilePath(_this.systemName),()=>{})
        _this.systemConfig={}
    }

}




module.exports = new config()
