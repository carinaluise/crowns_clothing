import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({total}, {toggleCartHidden} ) => {
    console.log(total)
 return (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{total}</span>
    </div>
)}

const mapStateToProps = ({ cart: {cartItems}}) => {
    return {total: cartItems.reduce((accumilated, cartItem) => {
        return (accumilated + cartItem.quantity)
   }, 0)
}
};
    
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);