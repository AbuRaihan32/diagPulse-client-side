import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const Payment = ({price, modalRef}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} modalRef={modalRef}></CheckoutForm>
    </Elements>
  );
};


Payment.propTypes = {
    price: PropTypes.node,
    modalRef: PropTypes.node
}
export default Payment;
