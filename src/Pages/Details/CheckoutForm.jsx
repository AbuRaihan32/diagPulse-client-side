import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";
import useBanner from "../../Hooks/useBanner";

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
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [rate, setRate] = useState(0);
  const { bannerData } = useBanner();

  // ! get payment intent
  useEffect(() => {
    if (discountedPrice) {
      axiosSecure
        .post("create-payment-intent", { price: discountedPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, discountedPrice]);

  // ! coupon code related
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const couponCode = e.target.code.value;
    const filteredBanner =
      bannerData.filter((banner) => banner.couponCode === couponCode) || [];
    const discountRate = parseInt(filteredBanner[0].discountRate.slice(0, 2));
    const currentPrice = Math.ceil(price - (price / 100) * discountRate);
    setDiscountedPrice(currentPrice);
    if (couponCode) {
      setRate(discountRate);
    } else {
      setRate(0);
    }
  };

  // ! handle payment card submit
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
          amount: discountedPrice,
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
          price: discountedPrice,
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

        axiosSecure.patch(`/testsSlotUpdate/${_id}`, newSlot).then(() => {
          modalRef.current.close();
          refetch();
        });
      }
    }
  };

  return (
    <>
      <div className="my-4 font-bold">Total Price: {discountedPrice} $</div>
      <div className="mb-5">
        <form onSubmit={handleCouponSubmit}>
          <label className="px-1">Coupon Code</label>
          <div className="flex gap-3 mt-2">
            <div className="w-[80%]">
              <input
                type="text"
                name="code"
                placeholder="Enter Coupon Code"
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-[20%]">
              <button className="btn bg-[#2EE2B5] hover:bg-[#2EE2B5] text-white w-full">
                Apply
              </button>
            </div>
          </div>
        </form>
        <p className="text-green-600">{rate}% discounted</p>
      </div>
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
    </>
  );
};

CheckoutForm.propTypes = {
  test: PropTypes.node,
  modalRef: PropTypes.node,
  refetch: PropTypes.node,
};
export default CheckoutForm;
