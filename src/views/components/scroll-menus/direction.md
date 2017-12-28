### 
1. 传入要显示的menus数组 格式如下：
    > [
        {menus_name:"name1",url:"/url1"},
        {menus_name:"name2",url:"/url2"},
        {menus_name:"name3",url:"/url3"},
        ...]
2. 监听change-title事件 改变title值
    > changeTitle(event){console.log(event)}

```
<scroll-menus :config="menusConfig" @change-title="changeTitle"></scroll-menus>

changeTitle(event){console.log(event)}
```