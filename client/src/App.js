import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
// import {auth, createUserProfile} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {checkUserSession } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
// import {selectCollectionsForPreview} from './redux/shop/shop.selector';
import './App.css';
import {HomePage} from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header.component';


const App = ({checkUserSession, currentUser}) => {

useEffect (()=> {
 checkUserSession()
}, [checkUserSession])

// END ARRAY MEANS : CHECK USER SESSION ONLY WHEN USER SESSION CHANGES

  // unsubscribeFromAuth = null;

  // componentDidMount(){

  //   const {checkUserSession} = this.props;
  //   checkUserSession();

  //   const {setCurrentUser} = this.props;

  //     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
  //       if(userAuth) {
  //         const userRef = await createUserProfile(userAuth)

  //         userRef.onSnapshot(snapShot => {
  //           setCurrentUser({
  //               id: snapShot.id,
  //               ...snapShot.data()
  //           }) 
  //         })
  //       }

  //     setCurrentUser(userAuth);
  //     // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title,items})));

  //   });
  // }

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();
  // } 

   return( <div className="App">
    <Header></Header>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route path='/sign-in' render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
      </Switch>
    </div>
   );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview

})


const mapDispatchToProps = dispatch => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user))
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);