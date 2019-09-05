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
      pageWidth: document.documentElement.clientWidth,
      activeClass: 'active',
      duration: 1000,
      navigation: true
    }
  }

  componentWillMount() {
    //mount前获取props状态并添加到state中
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
    //挂载后绑定鼠标滚轮事件
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', this.mouseScroll.bind(this), false);
    }
    window.onmousewheel = document.onmousewheel = this.mouseScroll.bind(this);
  }

  //翻页函数 弄n=1向后翻页 n=-1向前翻页
  scroll(n) {
    this.setState({
      isScroll: true,
      currentPage: this.state.currentPage + n
    });
    setTimeout(() => {//动画 duration时间结束后再把状态切换为没有滑动
      this.setState({
        isScroll: false
      })
    }, this.state.duration);
  }

  //给document/window绑定的滚轮时间
  mouseScroll(e) {
    e = e || window.event;
    if (this.state.isScroll) {
      return false;//如果正在滚动,取消事件
    }
    if (e.wheelDelta < 0 || e.detail > 0) {//小于0说明向下滚动
      if (this.state.currentPage >= this.state.pageCount) {//边界判断
        return false;
      }
      this.scroll(1)

    } else if (e.wheelDelta > 0 || e.detail < 0) {
      if (this.state.currentPage <= 0) {
        return false;
      }
      this.scroll(-1)
    }
  };

  //给导航点绑定点击事件
  handleNavClick(index) {
    this.setState({
      currentPage: index
    })
  }

  //给箭头绑定点击事件
  handleArrowClick(n) {
    if (this.state.currentPage > this.state.pageCount) {//边界判断
      return false;
    }
    this.scroll(n);
  }

  render() {
    //获取数据,添加样式
    let pageHeight = this.state.pageHeight;
    let pageWidth = this.state.pageWidth;
    let transverse = this.props.transverse || false;
    let containerStyle = transverse ? {
      transform: `translate3d(${-this.state.currentPage * pageWidth}px,0px,0px)`,
      transition: `all ${this.state.duration}ms ease`,
      display: 'flex',
      flex: 1,
      width: this.props.children.length * pageWidth + 'px'
    } : {
      transform: `translate3d(0px,${-this.state.currentPage * pageHeight}px,0px)`,
      transition: `all ${this.state.duration}ms ease`
    };
    let navigationStyle = transverse ? {
      position: "fixed",
      bottom: "30px",
      transform: 'translate3d(-50%,0px,0px)',
      left: '50%',
      display: 'flex'
    } : {
      position: 'fixed',
      top: '50%',
      transform: 'translate3d(0px,-50%,0px)',
      right: '20px'
    };
    let navigation = this.props.navigation !== undefined ? this.props.navigation : true;
    let navImage = this.props.navImage ? this.props.navImage : [];
    let arrow = this.props.arrowNav !== undefined ? this.props.arrowNav : false;
    let arrowLastStyle = transverse ? {
      left: '50px',
      top: '50%',
      transform: 'translate3d(0,-50%,0) rotate(45deg)',
    } : {
      top:'30px',
      left:'50%',
      transform:'translate3d(-50%,0,0) rotate(135deg)'
    };
    let arrowNextStyle = transverse ? {
      right: '50px',
      top: '50%',
      transform: 'translate3d(0,-50%,0) rotate(45deg)',
    } : {
      bottom:'30px',
      left:'50%',
      transform:'translate3d(-50%,0,0) rotate(135deg)'
    };
    return (
      <div className='full-wrap' style={{...this.props.style}}>
        <div className='full-container'
             style={containerStyle}>
          {this.props.children}
        </div>
        {
          navigation ? (
            <div className="slip-navigation" style={navigationStyle}>
              {
                this.props.children.map((item, index) => {
                  let active = index === this.state.currentPage ? this.state.activeClass : '';
                  return (
                    <div
                      key={index}
                      className={`navigation-dot ${active}`}
                      onClick={this.handleNavClick.bind(this, index)}
                    >
                      {navImage.length > 0 ? <img src={navImage[index]} alt=""/> : null}
                    </div>
                  )
                })
              }
            </div>
          ) : null
        }
        {
          arrow ? (
            <div className='slip-arrow'>
              {
                this.state.currentPage === 0 ?
                  null :
                  <div style={arrowLastStyle}
                       className="arrow-last"
                       onClick={this.handleArrowClick.bind(this, -1)}>
                  </div>
              }
              {
                this.state.currentPage === this.state.pageCount ?
                  null :
                  <div style={arrowNextStyle}
                       className="arrow-next"
                       onClick={this.handleArrowClick.bind(this, 1)}>
                  </div>
              }
            </div>
          ) : null
        }
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
