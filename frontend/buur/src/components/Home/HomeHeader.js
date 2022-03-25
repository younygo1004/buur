import React from "react";
import logo from "../../assets/BUURLogo_sm.png"
import bag from "../../assets/bag.png"

class HomeHeader extends React.Component {
  render () {
    return (
      <div className="homeheader">
      <div></div>
      <img src={logo} alt="logo"/>
      <img src={bag} alt="bag"/>
      </div>
    )
  }
}

export default HomeHeader;