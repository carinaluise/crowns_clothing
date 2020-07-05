import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component';
import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{

constructor(){
super();

    this.state = {

        email: '',
        password: ''

    }

}

handleSubmit = event => {

event.preventDefault();

this.setState({
    email: '' , password: ''
})

}

handleChange = event => {

const {value, name} = event.target;

this.setState({[name] : value})

}
 
render() {

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
    <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign In with Google</CustomButton>
    
  </div>

  </form>
    </div>
  )}

}

export default SignIn;