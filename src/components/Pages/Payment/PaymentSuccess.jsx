

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import useBookingStore from "../../stores/useBookingStore";
// import { Card, Title, Text, Button, Group, Modal } from "@mantine/core";
// import moment from "moment";
// import { Loader } from "lucide-react";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { bookedProperties, totalAmount, userId, appliedPromoCode, clearBookings } = useBookingStore();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalOpened, setModalOpened] = useState(false);

//   const sendPaymentData = async () => {
//     try {
//       const paymentData = {
//         userId: userId,
//         totalAmount: totalAmount,
//         bookedProperties: bookedProperties,
//         promoCode: appliedPromoCode || "",
//         bookingDate: moment().format("YYYY-MM-DD HH:mm:ss"),
//       };
//       console.log("Sending API request with data:", paymentData); // Debug log

//       const response = await axios.post(
//         "http://localhost/rent-easy/public/esewaPayment/payment.php",
//         paymentData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("API response:", response.data); // Debug log

//       if (response.data.status === "success") {
//         setModalOpened(true);
//         clearBookings();
//         toast.success("Payment processed successfully!");
//       } else {
//         setError(response.data.message || "Payment failed.");
//         console.log("API error message:", response.data.message); // Debug log
//       }
//     } catch (err) {
//       console.error("Axios error:", err.message); // Debug log
//       setError("Failed to connect to the server. Please try again.");
//       toast.error("Error processing payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered with:", { bookedProperties, totalAmount, userId }); // Debug log
//     if (bookedProperties.length > 0 && totalAmount > 0 && userId) {
//       console.log("Calling sendPaymentData"); // Debug log
//       sendPaymentData();
//     } else {
//       console.log("Missing booking data:", { bookedProperties, totalAmount, userId }); // Debug log
//       setError("No booking data found. Please try booking again.");
//       setLoading(false);
//     }
//   }, [bookedProperties, totalAmount, userId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <Loader className="animate-spin" />
//         <p className="ml-2 text-lg font-semibold text-gray-700">Processing...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* {error && (
//         <Modal
//           opened={true}
//           onClose={() => navigate("/")}
//           centered
//           withCloseButton={false}
//           size="sm"
//         >
//           <div className="text-center"> */}
//             {/* <Title order={3} className="text-red-500">
//               Payment Failed
//             </Title>
//             <Text color="dimmed" className="mt-2">
//               {error}
//             </Text>
//             <Button
//               onClick={() => navigate("/")}
//               variant="outline"
//               className="mt-4"
//             >
//               Return to Home
//             </Button>
//           </div>
//         </Modal>
//       )} */}

//       {/* <Modal
//         opened={modalOpened}
//         onClose={() => navigate("/")}
//         centered
//         withCloseButton={false}
//         size="sm"
//       > */}
//         <div className="text-center">
//           <img
//             src="./success.png"
//             alt="Success"
//             className="mx-auto mb-4 w-16 h-16"
//           />
//           <Title order={3} className="text-green-500">
//             Payment Successful!
//           </Title>
//           <Text color="dimmed" className="mt-2">
//             Thank you for your payment. Your booking has been confirmed.
//           </Text>
//           <Group position="center" spacing="md" className="mt-6">
//             <Button onClick={() => navigate("/")} variant="outline">
//               Return to Home
//             </Button>
//             <Button onClick={() => navigate("/profile")} variant="filled">
//               View Profile
//             </Button>
//           </Group>
//         </div>
//       {/* </Modal> */}
//     </>
//   );
// };

// export default PaymentSuccess;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useBookingStore from "../../stores/useBookingStore";
import { Title, Text, Button, Group, Modal } from "@mantine/core";
import moment from "moment";
import { Loader } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookedProperties, totalAmount, clearBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Parse query parameters
  const params = new URLSearchParams(location.search);
  const bookingId = params.get("booking_id") || `bk_${Date.now()}`;
  const amount = Number(params.get("amount")) || totalAmount || 0;
  const propertyId = params.get("propertyId") || bookedProperties[0]?.propertyId;
  const user_id = params.get("user_id") || params.get("id"); // Handle both id/user_id
  const transactionUuid = params.get("transaction_uuid");

  const sendPaymentData = async () => {
    try {
      // Validate all required fields
      const missingFields = [];
      if (!user_id) missingFields.push("id");
      if (!propertyId) missingFields.push("propertyId");
      if (!amount || amount <= 0) missingFields.push("amount");

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing");

      const paymentData = {
        id: String(user_id),        // Changed from user_id to id
        propertyId: String(propertyId),
        amount: Number(amount),
        booking_id: String(bookingId),
        transaction_id: transactionUuid || `txn_${Date.now()}`,
        payment_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      console.log("Sending payment data:", paymentData);

      const response = await axios.post(
        "http://localhost/rent-easy/public/esewaPayment/payment.php",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment response:", response.data);

      if (response.data.success) {
        setModalOpened(true);
        clearBookings();
        toast.success("Payment successful!");
      } else {
        throw new Error(response.data.message || "Payment processing failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) return;
    
    const queryError = params.get("error");
    if (queryError) {
      setError(decodeURIComponent(queryError));
      setLoading(false);
      return;
    }

    sendPaymentData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin" />
        <p className="ml-2 text-lg font-semibold text-gray-700">Processing payment...</p>
      </div>
    );
  }

  return (
    <>
      <Modal
        opened={modalOpened || !!error}
        onClose={() => navigate("/")}
        centered
        size="sm"
      >
        <div className="text-center">
          {error ? (
            <>
              <Title order={3} className="text-red-500">
                Payment Failed
              </Title>
              <Text className="mt-2">{error}</Text>
            </>
          ) : (
            <>
              <img
                src="./success.jpg"
                alt="Success"
                className="mx-auto mb-4 w-44 h-40 p-10"
              />
              <Title order={3} className="text-green-500">
                Payment Successful!
              </Title>
              <Text className="mt-2">Booking ID: {bookingId}</Text>
            </>
          )}
          
          <Button
            onClick={() => navigate("/")}
            fullWidth
            className="mt-4"
          >
            Return Home
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentSuccess;