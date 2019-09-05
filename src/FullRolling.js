import React from 'react';
import throttle from './utils/throttle';
import './index.less';

class FullSlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,//是否在滑动
      pageCount: 0,//页面数量
      currentPage: 0,//当前页面
      dimensions: {
        height: 0,
        width: 0,
      },
      offset: 0,

      activeClass: 'active',
      duration: 1000,
      navigation: true,
      transverse: false,
      navImage: [],
      arrowNav: false
    };
  }

  componentDidMount() {
    this.init();
    window.addEventListener("resize", throttle(this.resize, 100, true), false);
    window.addEventListener('DOMMouseScroll', this.mouseScroll, false);
    window.addEventListener('mousewheel', this.mouseScroll, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {transverse} = this.state;
    if (!prevState.offset || prevState.offset !== this.container.offsetTop) {
      if (!transverse) {
        this.setState({
          offset: this.container.offsetTop
        })
      }
    }
  }

  /**
   * 初始化，合并options
   */
  init = () => {
    const {navigation, activeClass, duration, transverse, navImage, arrowNav, children} = this.props;
    const dimensions = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    this.setState({
      ...this.state,
      navigation: navigation !== undefined ? navigation : true,
      activeClass: activeClass !== undefined ? activeClass : 'active',
      duration: duration !== undefined ? duration : 1000,
      transverse: transverse !== undefined ? transverse : false,
      navImage: navImage !== undefined ? navImage : [],
      arrowNav: arrowNav !== undefined ? arrowNav : false,
      dimensions,
      pageCount: children.length
    })
  };

  /**
   * 页面大小改变
   */
  resize = () => {
    const dimensions = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    this.setState({
      dimensions
    })
  };

  /**
   * 翻页动画
   * @param n  1 翻下一页   -1 翻前一页
   */
  scroll = (n) => {
    const {duration, currentPage} = this.state;
    this.setState({
      isScroll: true,
      currentPage: currentPage + n
    });
    setTimeout(() => {//动画 duration时间结束后再把状态切换为没有滑动
      this.setState({isScroll: false})
    }, duration);
  };

  /**
   * 翻页逻辑
   * @param e
   * @returns {boolean}
   */
  mouseScroll = (e) => {
    const {offset, isScroll, currentPage, pageCount} = this.state;
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t >= offset) {
      if (isScroll) {
        return false; //如果正在滚动,取消事件
      }
      if (e.wheelDelta < 0 || e.detail > 0) {//小于0说明向下滚动
        if (currentPage >= pageCount - 1) {//边界判断
          return false;
        }
        this.scroll(1)

      } else if (e.wheelDelta > 0 || e.detail < 0) {
        if (currentPage <= 0) {
          return false;
        }
        this.scroll(-1)
      }
    }

  };

  getContainerStyles = () => {
    const {dimensions: {width, height}, pageCount, currentPage, duration, transverse} = this.state;
    return transverse ? {
      transform: `translate3d(${-currentPage * width}px,0px,0px)`,
      transition: `all ${duration}ms ease`,
      display: 'flex',
      flex: 1,
      width: pageCount * width + 'px'
    } : {
      transform: `translate3d(0px,${-currentPage * height}px,0px)`,
      transition: `all ${duration}ms ease`
    };
  };

  //给导航点绑定点击事件
  handleNavClick = (index) => {
    this.setState({currentPage: index})
  };

  //给箭头绑定点击事件
  handleArrowClick = (n) => {
    this.scroll(n);
  };

  render() {
    const {dimensions: {width, height}, navigation, arrowNav, navImage, currentPage, pageCount, transverse, activeClass} = this.state;
    const {children, style} = this.props;
    const containerStyle = this.getContainerStyles();

    return (
      <div ref={ref => this.container = ref} className='full-wrap' style={{width, height, ...style}}>
        <div className='full-container' style={containerStyle}>
          {children}
        </div>
        {
          navigation && (
            <div className={`slip-navigation ${transverse ? 'horizontal' : 'vertical'}`}>
              {
                children.map((item, index) => {
                  const active = index === currentPage ? activeClass : '';
                  return (
                    <div
                      key={index}
                      className={`${active} navigation-dot`}
                      onClick={() => this.handleNavClick(index)}
                    >
                      {navImage && navImage.length > 0 && <img src={navImage[index]} alt=""/>}
                    </div>
                  )
                })
              }
            </div>
          )
        }
        {
          arrowNav && (
            <div className='slip-arrow'>
              {
                currentPage > 0 && (
                  <div
                    className={`arrow-last arrow ${transverse ? 'left' : 'top'}`}
                    onClick={() => this.handleArrowClick(-1)}>
                  </div>
                )
              }
              {
                currentPage < pageCount - 1 && (
                  <div
                    className={`arrow-next arrow ${transverse ? 'right' : 'bottom'}`}
                    onClick={() => this.handleArrowClick(1)}>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default FullSlip;
