import React from "react";
import axios from "axios";

const OnlinePayment = ({ amount, cartItems, user }) => {

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) return alert("Razorpay SDK failed to load");

    const order = await axios.post("http://localhost:3000/api/payment/create-order", {
      amount,
    });

    const options = {
      key: "rzp_test_RjBSBqv7N1pZNj",
      amount: order.data.order.amount,
      currency: "INR",
      order_id: order.data.order.id,
      name: "Agrimart",
      description: "Order Payment",

      handler: async function (response) {
        const verify = await axios.post("http://localhost:3000/api/payment/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId: user._id,
          items: cartItems,
          amount,
        });

        if (verify.data.success) {
          window.location.href = "/payment-success";
        } else {
          window.location.href = "/payment-failed";
        }
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },

      theme: { color: "#0f9b4f" },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  return (
    <button className="pay-btn" onClick={payNow}>
      Pay Online (Razorpay)
    </button>
  );
};

export default OnlinePayment;
