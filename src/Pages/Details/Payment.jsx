import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const Payment = ({test, modalRef, refetch}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm test={test} modalRef={modalRef} refetch={refetch}></CheckoutForm>
    </Elements>
  );
};


Payment.propTypes = {
    test: PropTypes.object,
    modalRef: PropTypes.node,
    refetch: PropTypes.node
}
export default Payment;
