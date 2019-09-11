import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton =({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_iaRnxMjLx35bpl7gY7eXKh2L007GMYAFom"';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')        ;
    }

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
            stripekey={publishableKey}
            currency='EUR'
        />
    )
};

export default StripeCheckoutButton;