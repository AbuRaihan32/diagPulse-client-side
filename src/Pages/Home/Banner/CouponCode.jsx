import { useState } from "react";
import PropTypes from 'prop-types'

const CouponCode = ({code}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const couponCode = code;
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy coupon code: ", err);
      });
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <span
          id="cpnCode"
          className="border-dashed border text-white px-4 py-2 rounded-l"
        >
          {code}
        </span>
        <span
          id="cpnBtn"
          onClick={copyToClipboard}
          className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
        >
          Copy Code
        </span>
        <div className="relative">
          {copied && (
            <p className="text-sm bg-slate-800 text-white w-fit mt-2 absolute p-2 rounded-md">
              Copied!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

CouponCode.propTypes = {
    code: PropTypes.string.isRequired
}

export default CouponCode;
