// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentButton = ({ disabled }) => {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token'); // Match the token key used in GetProfileData

//   const initiatePayment = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         'http://localhost/rent-easy/public/khaltiPayment/payment-request.php',
//         // { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log('Payment response:', response.data);

//       if (response.data.success && response.data.payment_url) {
//         window.location.href = response.data.payment_url; // Redirect to Khalti payment page
//       } else {
//         console.error('Payment initiation failed:', response.data.error || 'Unknown error');
//       }
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={initiatePayment}
//         disabled={loading || disabled}
//         style={{
//           padding: '8px 16px',
//           backgroundColor: loading || disabled ? '#ccc' : '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: loading || disabled ? 'not-allowed' : 'pointer',
//         }}
//       >
//         {loading ? 'Processing...' : 'Pay with Khalti (Test)'}
//       </button>
//     </div>
//   );
// };

// export default PaymentButton;