import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';
// import {auth} from '../../firebase/firebase.utils';


class SignIn extends React.Component{

constructor(){
super();

    this.state = {

        email: '',
        password: ''

    }

} 

handleSubmit = async event => {

event.preventDefault();

const{email, password}= this.state;
const {emailSignInStart} = this.props;

emailSignInStart(email, password);

// this.setState = ({
//           displayName: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//   });


        // try {
        //     const {user} = await auth.createUserWithEmailAndPassword(email, password);
        
        //     await createUserProfile(user, {displayName});

        //     this.setState = ({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     });
        // }

        // catch (error) {
        //     console.error(error);
        // }

}

handleChange = event => {

const {value, name} = event.target;

this.setState({[name] : value})

}
 
render() {

  const {googleSignInStart} = this.props;

  return( <div className="sign-in">

    <h1> Sign In </h1>

    <form onSubmit={this.handleSubmit}>
      <FormInput
      name='email'
      type='email'
      handleChange={this.handleChange}
      value={this.state.email}
      label="Email"
      required
      ></FormInput>    

      <FormInput
      name='password'
      type='password'
      handleChange={this.handleChange}
      value={this.state.password}
      label="Password"
      required
      ></FormInput>    


  <div className="buttons">
    <CustomButton type="submit">Sign In</CustomButton>
    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn >Sign In with Google</CustomButton>
    
  </div>

  </form>
    </div>
  )}

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);