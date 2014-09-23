define(function(require, exports, module){
    'use strict'
    
    // Thanks:
    //     - https://github.com/aralejs/base/blob/master/src/aspect.js
    
    exports.before = function(instance, methodNames, callback, ctx){
        return weave.call(instance, 'before', methodNames, callback, ctx);
    };
    
    exports.after = function(instance, methodNames, callback, ctx){
        return weave.call(instance, 'after', methodNames, callback, ctx);
    };
    
    function weave(when, methodNames, callback, ctx){
        var methodName, method;
    
        methodNames = methodNames.split(/\s+/);
    
        while(methodName = methodNames.shift()){
            method = getMethod(this, methodName);
    
            if(!method.__isAspected){
                wrap.call(this, methodName, when, callback, ctx);
            }
    
            this['__' + when + methodName] = function(){
                return callback.apply(ctx || this, arguments);
            };
        }
    
        return this;
    };
    
    function getMethod(host, methodName){
        var method = host[methodName];
    
        if(!method){
            throw new Error('Invalid method name: ' + methodName);
        }
    
        return method;
    }
    
    function wrap(methodName, when, callback, ctx){
        var old = this[methodName];
    
        this[methodName] = function(){
            if(this['__before' + methodName] && this['__before' + methodName].apply(this, arguments) === false){
                return;
            }
    
            var ret = old.apply(this, arguments);
            this['__after' + methodName] && this['__after' + methodName].apply(this, [ret].concat(Array.prototype.slice.call(arguments)));
    
            return ret;
        }
    
        this[methodName].__isAspected = true;
    };
});