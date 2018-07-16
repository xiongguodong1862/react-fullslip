import React, {Component} from 'react'
import './FullSlip.less'

class FullSlip extends Component {
  constructor() {
    super();
    this.state = {
      isScroll: false,//是否在滑动
      pageCount: 0,//余下未显示的页面数量
      currentPage: 0,//当前页面
      pageHeight: document.documentElement.clientHeight,//页面高度
      activeClass: 'active',
      duration: 1000,
      navigation: true
    }
  }

  componentWillMount() {
    let activeClass = this.props.activeClass ? this.props.activeClass : this.state.activeClass;
    let duration = this.props.duration ? this.props.duration : this.state.duration;
    let navigation = this.props.navigation ? this.props.navigation : this.state.navigation;
    let len = this.props.children.length;
    this.setState({
      activeClass,
      duration,
      navigation,
      pageCount: len - 1
    })
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', this.mouseScroll.bind(this), false);
    }
    window.onmousewheel = document.onmousewheel = this.mouseScroll.bind(this);
  }

  mouseScroll(e) {
    e = e || window.event;
    if (this.state.isScroll) {
      return false;//如果正在滚动,取消事件
    }
    if (e.wheelDelta < 0 || e.detail > 0) {//小于0说明向下滚动
      if (this.state.currentPage >= this.state.pageCount) {//边界判断
        return false;
      }
      this.setState({
        isScroll: true,
        currentPage: this.state.currentPage + 1
      });
      setTimeout(() => {//动画 duration时间结束后再把状态切换为没有滑动
        this.setState({
          isScroll: false
        })
      }, this.state.duration);
    } else if (e.wheelDelta > 0 || e.detail < 0) {
      if (this.state.currentPage <= 0) {
        return false;
      }
      this.setState({
        isScroll: true,
        currentPage: this.state.currentPage - 1
      });
      setTimeout(() => {
        this.setState({
          isScroll: false
        })
      }, this.state.duration);
    }
  };

  handleClick(index) {
    this.setState({
      currentPage: index
    })
  }

  render() {
    return (
      <div className='full-wrap' style={{...this.props.style}}>
        <div className='full-container'
             style={{
               transform: `translate3d(0px,${-this.state.currentPage * this.state.pageHeight}px,0px)`,
               transition: `all ${this.state.duration}ms ease`
             }}>
          {this.props.children}
        </div>
        <div className="slip-navigation">
          {
            this.props.children.map((item, index) => {
              let active = index === this.state.currentPage ? this.state.activeClass : '';
              return (
                <div
                  key={index}
                  className={`navigation-dot ${active}`}
                  onClick={this.handleClick.bind(this, index)}
                >
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

class SlipItem extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className='slip-item' style={{...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

export {
  FullSlip,
  SlipItem
} ;