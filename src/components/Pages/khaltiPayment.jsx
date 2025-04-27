import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import useBookingStore from "../stores/useBookingStore";
import KhaltiCheckout from "khalti-checkout-web";
import { Loader } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const KhaltiPayment = () => {
  const navigate = useNavigate();
  const { bookedProperty, totalAmount, clearBookings } = useBookingStore();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken?.userId;

  useEffect(() => {
    if (!bookedProperty || totalAmount <= 0) {
      toast.error("No booked property or invalid amount");
      navigate("/profile");
      return;
    }

    const bookingId = bookedProperty?.bookingId || `bk_${Date.now()}`;
    const amountInPaisa = totalAmount * 100;

    const khaltiConfig = {
      publicKey:  "7e45c6465405431bafcbd8ee4f535aaa",
      productIdentity: bookingId,
      productName: `Property Booking-${bookingId}`,
      productUrl: "http://localhost:5173",
      paymentPreference: ["KHALTI"],
      amount: amountInPaisa,
      eventHandler: {
        async onSuccess(payload) {
          try {
            // Verify payment with Khalti
            const verificationResponse = await fetch("https://khalti.com/api/v2/payment/verify/", {
              method: "POST",
              headers: {
                Authorization: "Key 3360f11336604e95b8d156cd3adbef19",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: payload.token,
                amount: amountInPaisa,
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationData.idx) {
              // Prepare form data for backend
              const formData = new FormData();
              formData.append("token", token);
              formData.append("amount", (verificationData.amount / 100).toString());
              formData.append("propertyId", bookedProperty?.propertyId || bookedProperty?.id);
              formData.append("userMobile", verificationData.user.mobile);
              formData.append("khaltiPaymentId", verificationData.idx);
              formData.append("booking_id", bookingId);
              formData.append("id", userId);
              console.log("Form data:", formData);

              // Send payment data to backend
              const response = await fetch(
                "http://localhost/rent-easy/public/khaltiPayment.php",
                {
                  method: "POST",
                  body: formData,
                }
              );

              const data = await response.json();

              if (data.success) {
                toast.success(data.message);
                clearBookings();
                navigate("/paymentSuccess");
              } else {
                toast.error(data.message || "Payment processing failed");
              }
            }
          } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment processing failed");
          }
        },
        onError(error) {
          console.error("Payment error:", error);
          toast.error("Payment failed");
          navigate("/paymentFailure");
        },
        onClose() {
          console.log("Payment widget closed");
          navigate("/profile");
        },
      },
    };

    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: amountInPaisa });
  }, [bookedProperty, totalAmount, navigate, clearBookings, token, userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader className="text-blue-700 w-12 h-12 animate-spin" />
      <p className="ml-4 text-lg font-semibold">Processing Khalti Payment...</p>
    </div>
  );
};

export default KhaltiPayment;