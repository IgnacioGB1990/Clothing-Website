import React from 'react';
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51HPlXzHxByj872W2bzkhRijlDaplUfusmkkP8X9hwtYa8UYKxdQKQ9XkWIr04jrBJq1wR36v5rKMfe1baloo2elJ00UMykkhsK"

  const onToken = token => {
    console.log(token)
    alert("Payment Successful")
  }


  return (
    <StripeCheckout
      label="Pay Now"
      name="Clothing Website"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton