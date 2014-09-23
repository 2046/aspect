#Aspect

简单的 JavaScript AOP 实现，提供``before``，``after``方法。

##使用

下载项目中 dist 目录里面的文件，并配置好模块相关信息（如：路径，别名），使用如下示例代码即可开始使用。

```
seajs.use(['aspect'], function(aspect){
  var o = {
    xxx : function(){
      console.log('xxx');
    }
  };
  
  aspect.before(o, 'xxx', function(){
    console.log('before xxx');
  });
  
  aspect.after(o, 'xxx', function(){
    console.log('after xxx');
  });
  
  o.xxx(); // before xxx, xxx, after xxx
});

require(['aspect'], function(aspect){
  var o = {
    xxx : function(){
      console.log('xxx');
    }
  };
  
  aspect.before(o, 'xxx', function(){
    console.log('before xxx');
  });
  
  aspect.after(o, 'xxx', function(){
    console.log('after xxx');
  });
  
  o.xxx(); // before xxx, xxx, after xxx
});
```

##使用说明
