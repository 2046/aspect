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
      console.log(2);
    }
  };
  
  aspect.before(o, 'xxx', function(){
    console.log(1);
  });
  
  aspect.after(o, 'xxx', function(){
    console.log(3);
  });
  
  o.xxx(); // 1 2 3
});
```

##使用说明

###before ``aspect.before(obj, methodName, callback, [context])``

在``obj[methodName]``方法执行前，先执行``callback``函数

``callback``函数在执行时，接收的参数与传给``obj[methodName]``参数相同。如果传入了``context``参数，则``callback``里的``this``指向``context``

```
var aspect = require('aspect');

var o = {
  xxx : function(){
    console.log(2);
  }
};

aspect.before(o, 'xxx', function(){
  consoel.log(1);
});

o.xxx(); // 1 2
```

在``before``的``callback``中使用``return false``，可以阻止原函数执行

```
var aspect = require('aspect');

var o = {
  xxx : function(){
    console.log(2);
  }
};

aspect.before(o, 'xxx', function(){
  consoel.log(1);
  return false;
});

o.xxx(); // 1
```

###after ``aspect.after(obj, methodName, callback, [context])``

在``obj[methodName]``方法执行后，再执行``callback``函数

``callback``函数在执行时，接收的参数是``obj[methodName]``执行完成后的返回值以及传给``obj[methodName]``的参数。如果传入了``context``参数，则``callback``里的``this``指向``context``

```
var aspect = require('aspect');

var o = {
  xxx : function(){
    console.log(3);
  }
};

aspect.after(o, 'xxx', function(returned, a, b){
  consoel.log(returned, a, b);
});

o.xxx(1, 2); 3, undefined, 1, 2
```

**``before``和``after``是按注册的先后顺序执行的，先注册先执行**

```
var aspect = require('aspect');

var o = {
  xxx : function(){
    console.log(3);
  }
};

aspect.before(o, 'xxx', function(){
  console.log(1);
});

aspect.before(o, 'xxx', function(){
  console.log(2);
});

aspect.after(o, 'xxx', function(){
  console.log(4);
});

aspect.after(o, 'xxx', function(){
  console.log(5);
});

o.xxx(); 1, 2, 3, 4, 5
```
