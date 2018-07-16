# fullSlip
基于react的竖向全屏滚动插件

### 安装
`npm install react-fullslip`

### 引入
`import {FullSlip,SlipItem} from "react-fullslip";`

### 配置参数
```
let options = {
  navigation: true, //是否显示导航点
  activeClass: 'active',//自定义活动导航点类名,默认样式会丢失,需要自己配置
  duration:1000// 屏幕滑动时间
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
