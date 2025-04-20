

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
import { Title, Text, Button, Modal } from "@mantine/core";
import moment from "moment";
import { Loader } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookedProperties, totalAmount, clearBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Parse query parameters, handling malformed URL
  const cleanSearch = location.search.split('?')[1] || '';
  const params = new URLSearchParams(cleanSearch);

  console.log("Raw URL search:", location.search);
  console.log("Cleaned search:", cleanSearch);

  // const bookingId = 380;
  // Parse amount from URL (not total_amount)
  const rawAmount = params.get("amount");
  let amount = rawAmount ? Number(rawAmount) : (totalAmount || 0);
  // Fallback to 10 for testing if amount is invalid
  
  const propertyId = params.get("propertyId") || bookedProperties[0]?.propertyId;
  const transactionUuid = params.get("transaction_uuid") || `txn_${Date.now()}`;
  const userId = params.get("user_id") || bookedProperties[0]?.userId;

  const sendPaymentData = async () => {
    try {
      // Validate all required fields
      const missingFields = [];
      if (!userId) missingFields.push("id");
      if (!propertyId) missingFields.push("propertyId");
      if (!amount || amount <= 0) missingFields.push("amount");
      if (!transactionUuid) missingFields.push("transaction_id");

      if (missingFields.length > 0) {
        throw new Error(`Missing or invalid required fields: ${missingFields.join(", ")}`);
      }

      const paymentData = {
        id: String(userId),
        propertyId: String(propertyId),
        amount: Number(amount),
        // booking_id: String(bookingId),
        transaction_id: String(transactionUuid),
        payment_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      console.log("Sending payment data:", paymentData);

      // Update the URL to match your backend server
      const backendUrl = "http://localhost/rent-easy/public/esewaPayment/payment.php"; 
      const response = await axios.post(backendUrl, paymentData, 
        // {
      //   headers: { Authorization: `Bearer ${token}` }

      // }
    );

      console.log("API response:", response.data);

      if (response.data.success) {
        setModalOpened(true);
        clearBookings();
        toast.success("Payment successful!");
      } else {
        throw new Error(response.data.message || "Payment processing failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      let errorMessage = "Failed to process payment";
      if (err.code === "ERR_NETWORK") {
        errorMessage = "Network error: Unable to reach the server. Please check if the backend is running.";
      } else if (err.response) {
        errorMessage = err.response.data.message || "Server error";
      }
      setError(errorMessage);
      toast.error(errorMessage);
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

    console.log("Query params:", {
      amount: params.get("amount"),
      totalAmountFromStore: totalAmount,
      amountCalculated: amount,
      propertyId,
      userId,
      // bookingId,
      transactionUuid,
      bookedProperties,
      allParams: Object.fromEntries(params),
    });

    sendPaymentData();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin" />
        <p className="ml-2 text-lg font-semibold text-gray-700">Processing payment...</p>
      </div>
    );
  }

  return (
    <Modal
      opened={modalOpened || !!error}
      onClose={() => navigate("/")}
      centered
      size="sm"
      className="p-6"
    >
      <div className="text-center">
        {error ? (
          <>
            <Title order={3} className="text-red-500 mb-4">
              Payment Failed
            </Title>
            <Text className="mb-6">{error}</Text>
          </>
        ) : (
          <>
            <img
              src="./success.jpg"
              alt="Success"
              className="mx-auto mb-4 w-full h-full p-10"
            />
            <Title order={3} className="text-green-500 mb-4">
              Payment Successful!
            </Title>
            {/* <Text className="mb-6">Booking ID: {bookingId}</Text> */}
          </>
        )}
        <Button
          onClick={() => navigate("/")}
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Return Home
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentSuccess;