import React from "react";
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";
import beerImg from "../../assets/beer_sample.png";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { ADD_BASKET } from '../../actions/ActionTypes'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import addBasketIcon from '../../assets/add_basket_icon.png'
import warnBasketIcon from '../../assets/warn_basket_icon.png'
import '../../styles/beerbasket.css';

const mapStateToProps = (state) => {
  return {
    basket: state.beer.basket,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBeerBasket: (beerInfo) => dispatch({type:ADD_BASKET, data: beerInfo}),
  }
}

class BeerDetailsInfo extends React.Component {
  state = {
    warnBasketOpen: false,
    successBasketOpen: false,
  }
  render () {
    const beerInfo = this.props.beerInfo
    const basket = this.props.basket
    const addBeerBasket = this.props.addBeerBasket
    
    // const history = useHistory()
    
    // function goBasket() {
    //   history.push({
    //     pathname: "/main/basket"
    //   })
    // }

    function addBasket(beerInfo) {
      if (basket.length === 4) {
        handleClickOpenWarn()
        console.log(basket)
      } else {
        addBeerBasket(beerInfo)
        handleClickOpenSuccess()
        console.log(basket);
      }
    }
  
    const handleClickOpenWarn = () => {
      this.setState({warnBasketOpen : true});
    };

    const handleClickOpenSuccess = () => {
      this.setState({successBasketOpen : true});
    };
  
    const handleClose = () => {
      this.setState({warnBasketOpen : false});
      this.setState({successBasketOpen : false});
    };

    return (
      <div className="beer-details-info">
        <img src={beerImg} alt="beerImg"/>
        <div className="beer-textinfo">
          <div className="beer-textinfo__title">
            <h3>{beerInfo.name}</h3>
            <FavoriteBorderRoundedIcon sx={{ color: '#CB0000', fontSize: 22 }}/>
          </div>
          <div className="beer-textinfo__catergory"><h5>알코올</h5> <span>{beerInfo.alcohol}</span></div>
          <div className="beer-textinfo__catergory"><h5>종류 </h5> <span>{beerInfo.kind}</span></div>
          <div className="beer-textinfo__catergory"><h5>원산지 </h5> <span>{beerInfo.origin}</span></div>
          <button 
          onClick={() => addBasket(beerInfo)}
          ><WorkOutlineRoundedIcon sx={{ fontSize: 20, mx:0.5}}/>이 맥주 마시고 싶어요!</button>
        </div>

        {/* warn dialog */}
        <div className="warn-basket-dialog">
          <Dialog
          open={this.state.warnBasketOpen}
          // open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ sx: { 
            borderRadius: 10,
            width: 274,
            height: 166,
          } }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, pb: 0}}>
            <Button onClick={handleClose} sx={{ minWidth: 18, pr: 2}}>
              <CloseRoundedIcon sx={{ color : 'black', fontSize: 18}}/>
            </Button>
          </DialogTitle>
          <DialogContent
          className="dialog-content-box"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={warnBasketIcon} alt="addBasket"/>
            <div className="warn-dialog-content">
              <p>장바구니가 꽉 찼습니다</p>
              <p>장바구니를 비우고 담아주세요</p>
            </div>
          </DialogContent>
        </Dialog>
        </div>


        {/* success dialog */}
        <div className="success-basket-dialog">
          <Dialog
          open={this.state.successBasketOpen}
          // open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ sx: { 
            borderRadius: 10,
            width: 274,
            height: 232,
          } }}
          >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, pb: 0}}>
              <Button onClick={handleClose} sx={{ minWidth: 18, pr: 2}}>
                <CloseRoundedIcon sx={{ color : 'black', fontSize: 18}}/>
              </Button>
            </DialogTitle>
            <DialogContent
            className="dialog-content-box"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={addBasketIcon} alt="addBasket"/>
              <div className="success-dialog-content">
                <span>{beerInfo.name}</span>
                <span>맥주가</span>
              </div>
              <p>장바구니에 성공적으로 담겼습니다</p>
              <Button onClick={handleClose} autoFocus>
                확인하러 갈래요
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BeerDetailsInfo);