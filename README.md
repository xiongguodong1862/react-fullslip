# fullSlip
基于react的竖向全屏滚动插件

- 2018.07.29更新

新增箭头导航参数,点击箭头可翻页

- 2018.07.25更新

新增了改变滑动方向的参数，可改为竖向或横向；

新增了导航点可添加自定义图片的参数。

### 依赖

- react

### 安装
`npm install react-fullslip`

### 引入
`import {FullSlip,SlipItem} from "react-fullslip";`

### 配置参数
```
let options = {
  navigation: true,           //是否开启导航点,      默认为true
  activeClass: 'active',      //自定义导航点类名,    默认为active, .navigation-dot下的.active
  duration:1000,              //屏幕滑动切换的时间,  默认为1000
  transverse:true,            //是否更改为横向滑动,  默认为false
  navImage:[require('./assets/1.jpg'),require('./assets/2.jpg'),require('./assets/3.jpg')]    //导航点图片,可选,默认无图片
  arrowNav:true,              //是否开启箭头导航     默认false不开启
};

```
### 使用
```
<FullSlip {...optoins}>
  <SlipItem style={{backgroundColor:'#C6E2FF'}}>
    page1
  </SlipItem>
  <SlipItem style={{backgroundColor:'#C1FFC1'}}>
    page2
  </SlipItem>
  <SlipItem style={{backgroundColor:'#FFEC8B'}}>
    page3
  </SlipItem>
</FullSlip>
```
