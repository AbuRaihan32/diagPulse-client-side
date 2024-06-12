import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const CheckoutForm = ({ test, modalRef, refetch }) => {
  const {
    name,
    date,
    description,
    category,
    image,
    sample_type,
    purpose,
    price,
    _id,
    slot,
    bookedCount,
  } = test;

  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    axiosSecure.post("create-payment-intent", { price }).then((res) => {
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

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: confirmError.message,
      });
      modalRef.current.close();
    } else {
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          title: "Payment Successful",
          text: `Your TransitionId: ${paymentIntent.id}`,
          icon: "success",
        });

        // ! save Payment history in the database

        const localDate = new Date();
        const utcDate = moment(localDate).utc().format();

        const payment = {
          name: user.displayName,
          email: user.email,
          date: utcDate,
          amount: price,
          transitionId: paymentIntent.id,
          testId: _id,
          status: "pending",
        };

        axiosSecure.post("/paymentHistory", payment).then((res) => {
          console.log(res.data);
        });

        // ! save appointment in the database

        const appointment = {
          name: name,
          price: price,
          email: user.email,
          date: utcDate,
          testId: _id,
          status: "pending",
        };

        axiosSecure.post("/appointments", appointment).then((res) => {
          console.log(res.data);
        });

        //! update slot
        const slotNum = parseInt(slot);
        const UpdatedCount = slotNum - 1;

        const bookedCountNum = parseInt(bookedCount);
        const UpdatedBookedCount = bookedCountNum ? bookedCountNum + 1 : 1;
        console.log(UpdatedBookedCount);
        const newSlot = {
          slot: UpdatedCount,
          name,
          date,
          description,
          category,
          image,
          sample_type,
          purpose,
          price,
          bookedCount: UpdatedBookedCount,
        };

        axiosSecure.patch(`/tests/${_id}`, newSlot).then(() => {
          modalRef.current.close();
          refetch();
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border p-4 rounded-lg border-[#2EE2B5]"
        options={{
          style: {
            base: {
              fontSize: "16px",
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
      <p className="text-red-600">{error}</p>
      <button
        className="bg-[#2EE2B5] px-5 py-2 rounded-lg text-white mt-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  test: PropTypes.node,
  modalRef: PropTypes.node,
  refetch: PropTypes.node,
};
export default CheckoutForm;
