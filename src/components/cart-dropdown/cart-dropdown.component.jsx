import React from 'react';
import CustomButton from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors'

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>

    {
        cartItems.map(cartItem => (

            <CartItem key={cartItem.id} item={cartItem}></CartItem>

        ))}

        <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({

cartItems: selectCartItems

})



export default connect(mapStateToProps)(CartDropdown);