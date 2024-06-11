import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, modalRef }) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axiosSecure.post("create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment Method", paymentMethod);
      setError("");
    }

    // confirm payment

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });


    if(confirmError){
        console.log('error', confirmError)
    }else{
        console.log('payment intent', paymentIntent)
        if(paymentIntent.status === "succeeded"){
            Swal.fire({
                title: "Payment Successful",
                text: `Your TransitionId: ${paymentIntent.id}`,
                icon: "success",
              });
              modalRef.current.close();
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              border: "1px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-[#2EE2B5] px-4 py-1 rounded-lg text-white mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

CheckoutForm.propTypes = {
  price: PropTypes.node,
  modalRef: PropTypes.node,
};
export default CheckoutForm;
