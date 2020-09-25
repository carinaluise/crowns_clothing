import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {

    const priceForStripe = price * 100; //STRIPE wants price in cents not dollars

    const publishableKey = 'pk_test_51HCmM0I2cmoghmOTlnyG7Q0BQ1ohxglD0hRrihQvG5ntmEFQaegdGdrQN3aJqcRobaNl3xYAVKY8IC4Drzk0C88g00fyeKFb67'
    
    const onToken = token => {
        console.log(token);

        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(res => {
            alert('Payment Successful');
        }).catch(error => {
            console.log('Payment Error' , JSON.parse(error))
            alert('Payment was unsuccesful, please try again')
        })

 }  // PASS TOKEN TO BACKEND TO CREATE THE CHARGE 


return(
    <StripeCheckout
    label='Pay Now'
    name='CRWN Clothing Ltd'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken} // ON SUCCESS CALLBACK
    stripeKey={publishableKey}
    ></StripeCheckout>
);
};


export default StripeCheckoutButton; 