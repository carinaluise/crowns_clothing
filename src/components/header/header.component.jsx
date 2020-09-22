import React from 'react';
import {Link} from 'react-router-dom';
// import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({currentUser, hidden, signOutStart}) => (

    <div className="header">

    <Link className="logo-container" to="/">
       <Logo className="logo"></Logo> 
    </Link>

    <div className="options">

    <Link className="option" to="/shop">SHOP</Link>
    <Link className="option" to="/contact">CONTACT</Link>

    { currentUser ? (
    
    <div className="option" onClick={signOutStart}> SIGN OUT </div>    
    
    ) :( <Link className="option" to="/sign-in">SIGN IN</Link>)
    
    }
    <CartIcon/>

    </div>
    { hidden ? null : <CartDropdown />}
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Header);