import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { RouteOrder } from "@/helpers/RouteName";
import styles from "./Payment.module.css";

const Payment = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showCODConfirm, setShowCODConfirm] = useState(false);
  const [showOnlineGateways, setShowOnlineGateways] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [showGatewayConfirm, setShowGatewayConfirm] = useState(false);

  const paymentGateways = [
    { id: "gpay", name: "Google Pay", icon: "💳" },
    { id: "phonepe", name: "PhonePe", icon: "📱" },
    { id: "paytm", name: "Paytm", icon: "💵" },
    { id: "razorpay", name: "Razorpay", icon: "💳" },
  ];

  useEffect(() => {
    // Load product and address from localStorage
    const productData = localStorage.getItem("checkout_product");
    const addressData = localStorage.getItem("checkout_address");

    if (!productData) {
      showToast("error", "No product selected. Redirecting...");
      navigate("/");
      return;
    }

    if (!addressData) {
      showToast("error", "Please provide delivery address first");
      navigate("/checkout/address");
      return;
    }

    try {
      setProduct(JSON.parse(productData));
      setAddress(JSON.parse(addressData));
    } catch (err) {
      console.error("Error parsing checkout data:", err);
      showToast("error", "Invalid checkout data. Please try again.");
      navigate("/");
    }
  }, [navigate]);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "COD") {
      setShowCODConfirm(true);
      setShowOnlineGateways(false);
    } else if (method === "ONLINE") {
      setShowOnlineGateways(true);
      setShowCODConfirm(false);
    }
  };

  const handleCODConfirm = async () => {
    setShowCODConfirm(false);
    await createOrder("COD", null);
  };

  const handleGatewaySelect = (gateway) => {
    setSelectedGateway(gateway);
    setShowGatewayConfirm(true);
  };

  const handleGatewayConfirm = async () => {
    setShowGatewayConfirm(false);
    await createOrder("ONLINE", selectedGateway);
  };

  const createOrder = async (method, gateway) => {
    if (!user?._id || !product || !address) {
      showToast("error", "Missing required information");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/orders/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          items: [
            {
              productId: product.productId || product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              unit: product.unit || "unit",
              quantity: 1,
            },
          ],
          totalAmount: product.price,
          email: user.email,
          phone: user.phone || address?.mobile,
          address,
          paymentMethod: method,
          paymentGateway: gateway?.id || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // If it's a farmer product, delete it after successful order
        if (product.isFarmerProduct && product.productId) {
          try {
            const deleteResponse = await fetch(
              `${getEnv("VITE_API_BASE_URL")}/farmerProducts/products/${product.productId}`,
              {
                method: "DELETE",
              }
            );
            
            if (deleteResponse.ok) {
              console.log("Farmer product deleted successfully after order");
            } else {
              console.error("Failed to delete farmer product:", await deleteResponse.text());
            }
          } catch (deleteError) {
            console.error("Error deleting farmer product:", deleteError);
            // Don't block the order success flow if deletion fails
          }
        }

        // Clear checkout data from localStorage
        localStorage.removeItem("checkout_product");
        localStorage.removeItem("checkout_address");
        
        showToast(
          "success",
          `Order placed successfully! Order ID: ${
            data.order?.orderId || data.order?._id || "N/A"
          }`
        );
        navigate(RouteOrder);
      } else {
        throw new Error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      showToast("error", error.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product || !address) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Payment Method</h1>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h2 className={styles.summaryTitle}>Order Summary</h2>
        <div className={styles.productInfo}>
          {product.image && (
            <img src={product.image} alt={product.name} className={styles.productImage} />
          )}
          <div className={styles.productDetails}>
            <h3>{product.name}</h3>
            <p className={styles.productPrice}>₹{product.price}</p>
            {product.unit && <p className={styles.productUnit}>Unit: {product.unit}</p>}
          </div>
        </div>
        <div className={styles.total}>
          <strong>Total: ₹{product.price}</strong>
        </div>
      </div>

      {/* Delivery Address */}
      <div className={styles.addressSection}>
        <h2 className={styles.summaryTitle}>Delivery Address</h2>
        <div className={styles.addressDetails}>
          <p><strong>{address.name}</strong></p>
          <p>{address.address}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>Mobile: {address.mobile}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/checkout/address")}
          className={styles.changeAddressBtn}
        >
          Change Address
        </Button>
      </div>

      {/* Payment Methods */}
      <div className={styles.paymentMethods}>
        <h2 className={styles.summaryTitle}>Payment Options</h2>
        {selectedPaymentMethod && !showCODConfirm && !showOnlineGateways && !showGatewayConfirm && (
          <div className={styles.selectedPayment}>
            <p>
              <strong>Selected Payment Method: </strong>
              <span className={styles.paymentMethodBadge}>
                {selectedPaymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
              </span>
            </p>
          </div>
        )}
        
        {!showCODConfirm && !showOnlineGateways && !showGatewayConfirm && (
          <div className={styles.paymentButtons}>
            <Button
              onClick={() => handlePaymentMethodSelect("COD")}
              disabled={loading}
              className={`${styles.paymentBtn} ${selectedPaymentMethod === "COD" ? styles.selected : ""}`}
              variant={selectedPaymentMethod === "COD" ? "default" : "outline"}
            >
              Cash on Delivery
            </Button>
            <Button
              onClick={() => handlePaymentMethodSelect("ONLINE")}
              disabled={loading}
              className={`${styles.paymentBtn} ${selectedPaymentMethod === "ONLINE" ? styles.selected : ""}`}
              variant={selectedPaymentMethod === "ONLINE" ? "default" : "default"}
            >
              Pay Online
            </Button>
          </div>
        )}

        {/* COD Confirmation Dialog */}
        {showCODConfirm && (
          <div className={styles.confirmDialog}>
            <div className={styles.confirmContent}>
              <h3>Confirm Cash on Delivery</h3>
              <p>Are you sure you want to proceed with Cash on Delivery?</p>
              <p className={styles.confirmAmount}>Amount to be paid: <strong>₹{product.price}</strong></p>
              <div className={styles.confirmButtons}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCODConfirm(false);
                    setSelectedPaymentMethod(null);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCODConfirm}
                  disabled={loading}
                  className={styles.confirmBtn}
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Online Payment Gateway Selection */}
        {showOnlineGateways && !showGatewayConfirm && (
          <div className={styles.gatewaySelection}>
            <h3 className={styles.gatewayTitle}>Select Payment Gateway</h3>
            <div className={styles.gatewayGrid}>
              {paymentGateways.map((gateway) => (
                <div
                  key={gateway.id}
                  className={`${styles.gatewayCard} ${selectedGateway?.id === gateway.id ? styles.gatewaySelected : ""}`}
                  onClick={() => handleGatewaySelect(gateway)}
                >
                  <span className={styles.gatewayIcon}>{gateway.icon}</span>
                  <span className={styles.gatewayName}>{gateway.name}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowOnlineGateways(false);
                setSelectedPaymentMethod(null);
                setSelectedGateway(null);
              }}
              className={styles.cancelBtn}
            >
              Back
            </Button>
          </div>
        )}

        {/* Gateway Confirmation Dialog */}
        {showGatewayConfirm && selectedGateway && (
          <div className={styles.confirmDialog}>
            <div className={styles.confirmContent}>
              <h3>Confirm Payment</h3>
              <p>You have selected <strong>{selectedGateway.name}</strong> for payment.</p>
              <p className={styles.confirmAmount}>Amount to be paid: <strong>₹{product.price}</strong></p>
              <div className={styles.confirmButtons}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowGatewayConfirm(false);
                    setSelectedGateway(null);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGatewayConfirm}
                  disabled={loading}
                  className={styles.confirmBtn}
                >
                  {loading ? "Processing..." : "Confirm & Pay"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <Button className={styles.backBtn} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Payment;
