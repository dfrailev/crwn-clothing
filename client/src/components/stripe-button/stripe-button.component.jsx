import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton =({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_iaRnxMjLx35bpl7gY7eXKh2L007GMYAFom';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                currency: 'EUR',
                token
            }
        }).then(response => {
            alert('Payment succesful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error))
            alert('There was an issue with your payment. Please sure you use the provided card');
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={ `Your total is €${price}`}
            amount={ priceForStripe }
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            currency='EUR'
        />
    )
};

export default StripeCheckoutButton;