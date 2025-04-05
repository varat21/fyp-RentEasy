// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Card, Text, Title } from '@mantine/core';
// import { FaCheckCircle } from 'react-icons/fa';
// import { toast } from 'react-hot-toast';

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const paymentDetails = location.state?.paymentDetails;

//   useEffect(() => {
//     if (!paymentDetails) {
//       toast.error('No payment details found');
//       navigate('/');
//     }
//   }, [paymentDetails, navigate]);

//   if (!paymentDetails) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <Card shadow="sm" padding="lg" radius="md" className="w-full max-w-md">
//         <div className="text-center">
//           <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//           <Title order={2} className="mb-2">
//             Payment Successful!
//           </Title>
//           <Text color="dimmed" className="mb-6">
//             Thank you for your payment. An invoice has been sent to your email.
//           </Text>

//           <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
//             <Text weight={600} className="mb-2">
//               Payment Details:
//             </Text>
//             <div className="space-y-1">
//               <Text>Amount: ${paymentDetails.amount}</Text>
//               <Text>Date: {new Date(paymentDetails.updated_at).toLocaleString()}</Text>
//               <Text>Payment ID: {paymentDetails.stripe_payment_intent_id}</Text>
//             </div>
//           </div>

//           <Button 
//             fullWidth 
//             onClick={() => navigate('/profile')}
//             variant="light"
//           >
//             Back to Profile
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initiatePayment = async () => {
    try {
      const response = await fetch('initiate_payment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // You can pass any custom data here that should override the defaults
          // in the PHP file
          amount: "1500", // Example: overriding the amount
          purchase_order_name: "Premium Package"
        })
      });

      const data = await response.json();
      
      if (data.success && data.payment_url) {
        // Redirect to Khalti payment page
        window.location.href = data.payment_url;
      } else {
        setError(data.message || 'Failed to initiate payment');
      }
    } catch (err) {
      setError('Network error while initiating payment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initiatePayment();
  }, []);

  if (loading) {
    return (
      <div className="payment-container">
        <h2>Preparing your payment...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-container error">
        <h2>Payment Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return null;
}

export default PaymentSuccess;