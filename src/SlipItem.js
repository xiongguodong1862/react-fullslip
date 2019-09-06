import React, {Component} from "react";

class SlipItem extends Component {
  render() {
    const {children, ...props} = this.props;
    return (
      <div className='slip-item' {...props}>
        {children}
      </div>
    )
  }
}

export default SlipItem;
