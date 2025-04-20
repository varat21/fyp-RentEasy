// import React, { useEffect, useState } from "react";
// import { Card, Text, Title, Grid, Container, Flex } from "@mantine/core";
// import { FiUsers, FiHome, FiDollarSign } from "react-icons/fi";
// import { LineChart } from "@mantine/charts";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import { FaRegMessage } from "react-icons/fa6";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     totalUsers: null,
//     totalProperties: null,
//     totalRevenue: null,
//     totalMessage: null,
//     combinedGrowthData: [],
//     users: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost/rent-easy/public/Admin/totalUsers.php"
//       );
//       console.log("API Response:", response.data); // Debugging
//       if (response.data.success) {
//         setData({
//           totalUsers: response.data.data.counts.total_users,
//           totalProperties: response.data.data.counts.total_properties,
//           totalRevenue: response.data.data.counts.total_revenue || 0,
//           totalMessage: response.data.data.counts.total_message || 0,
//           combinedGrowthData: combineGrowthData(response.data.data),
//           users: response.data.data.users || [], // Ensure users data is being set
//         });
//       } else {
//         setError("Error fetching data");
//       }
//     } catch (error) {
//       setError("Fetch error");
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

//   const combineGrowthData = (data) => {
//     const combinedDataMap = new Map();

//     data.user_growth.forEach((item) => {
//       combinedDataMap.set(item.month, {
//         month: item.month,
//         users: parseInt(item.users, 10),
//         properties: 0,
//         payments: 0,
//       });
//     });

//     data.property_growth.forEach((item) => {
//       if (combinedDataMap.has(item.month)) {
//         combinedDataMap.get(item.month).properties = parseInt(item.properties, 10);
//       } else {
//         combinedDataMap.set(item.month, {
//           month: item.month,
//           users: 0,
//           properties: parseInt(item.properties, 10),
//           payments: 0,
//         });
//       }
//     });

//     data.payment_growth.forEach((item) => {
//       if (combinedDataMap.has(item.month)) {
//         combinedDataMap.get(item.month).payments = parseInt(item.payments, 10);
//       } else {
//         combinedDataMap.set(item.month, {
//           month: item.month,
//           users: 0,
//           properties: 0,
//           payments: parseInt(item.payments, 10),
//         });
//       }
//     });

//     return Array.from(combinedDataMap.values());
//   };

//   return (
//     <Container fluid className="p-8">
//       <Title order={1} className="mb-8 text-3xl font-bold">
//         Admin Dashboard
//       </Title>

//       <Grid gutter="xl">
//         <Grid.Col span={12} md={4}>
//           <Flex gap="md" className="flex items-center justify-between">
//             <Card
//               shadow="sm"
//               padding="lg"
//               style={{ backgroundColor: "#4f46e5", color: "white", width: "100%", height: "15vh" }}
//               className="flex-1"
//             >
//               <div className="flex items-center justify-between">
//                 <FiUsers size={25} />
//                 <Text size="lg">Total Users</Text>
//               </div>
//               <Text size="2xl" weight={900} align="center" className="mt-4">
//                 {data.totalUsers !== null ? data.totalUsers : "Loading..."}
//               </Text>
//             </Card>

//             <Card
//               shadow="sm"
//               padding="lg"
//               style={{ backgroundColor: "#0d9488", color: "white", width: "100%", height: "15vh" }}
//               className="flex-1"
//             >
//               <div className="flex items-center justify-between">
//                 <FiHome size={25} />
//                 <Text size="lg">Total Properties</Text>
//               </div>
//               <Text size="2xl" weight={900} align="center" className="mt-4">
//                 {data.totalProperties !== null ? data.totalProperties : "Loading..."}
//               </Text>
//             </Card>

//             <Card
//               shadow="sm"
//               padding="lg"
//               style={{ backgroundColor: "#ea580c", color: "white", width: "100%", height: "15vh" }}
//               className="flex-1"
//             >
//               <div className="flex items-center justify-between">
//                 <FiDollarSign size={25} />
//                 <Text size="lg">Total Revenue</Text>
//               </div>
//               <Text size="2xl" weight={900} align="center" className="mt-4">
//                 {data.totalRevenue !== null ? `$${data.totalRevenue}` : "Loading..."}
//               </Text>
//             </Card>
//             <Card
//               shadow="sm"
//               padding="lg"
//               style={{ backgroundColor: "gray", color: "white", width: "100%", height: "15vh" }}
//               className="flex-1"
//             >
//               <div className="flex items-center justify-between">
//                 <FaRegMessage size={25} />
//                 <Text size="lg">Total Messages</Text>
//               </div>
//               <Text size="2xl" weight={900} align="center" className="mt-4">
//                 {data.totalMessage !== null ? `${data.totalMessage}` : "Loading..."}
//               </Text>
//             </Card>
//           </Flex>
//         </Grid.Col>

//         <Grid.Col span={12} md={8}>
//           <Card shadow="sm" padding="lg" radius="md" className="h-full">
//             <Title order={3} className="mb-4 text-2xl font-bold">
//               Growth Over Time
//             </Title>
//             <LineChart
//               h={400}
//               data={data.combinedGrowthData}
//               dataKey="month"
//               withLegend
//               tooltipProps={{
//                 shared: true,
//               }}
//               series={[
//                 { name: "users", color: "indigo.6" },
//                 { name: "properties", color: "teal.6" },
//                 { name: "payments", color: "orange.6" },
//               ]}
//             />
//           </Card>
//         </Grid.Col>
//       </Grid>

//       <Card shadow="sm" padding="lg" className="mt-8">
//         <Title order={3} className="mb-4 text-2xl font-bold">
//           Latest Users
//         </Title>
//         <div className="relative overflow-x-auto sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   ID
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Name
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Email
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Phone
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Role
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Verified
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Joined
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
              
//               {data.users.map((user) => (
//                 <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
//                   <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     {user.id}
//                   </td>
//                   <td className="px-6 py-4">
//                     {user.name}
//                   </td>
//                   <td className="px-6 py-4">
//                     {user.email}
//                   </td>
//                   <td className="px-6 py-4">
//                     {user.phoneNumber}
//                   </td>
//                   <td className="px-6 py-4">
//                     {user.userType}
//                   </td>
//                   <td className="px-6 py-4">
//                     {Number(user.is_verified) === 1 ? "Yes" : "No"}
//                   </td>
//                   <td className="px-6 py-4">
//                     {moment(user.created_at).fromNow()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <p
//           className="text-blue-600 font-medium flex items-center justify-center gap-1 cursor-pointer hover:underline mt-4"
//           onClick={() => navigate("/navbar/users")}
//         >
//           See more
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </p>
//       </Card>
//     </Container>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Card, Text, Title, Grid, Container, Flex, Tabs } from "@mantine/core";
import { FiUsers, FiHome, FiDollarSign, FiBookmark } from "react-icons/fi";
import { BarChart } from "@mantine/charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaRegMessage } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalUsers: null,
    totalProperties: null,
    totalRevenue: null,
    totalMessage: null,
    combinedGrowthData: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/rent-easy/public/Admin/totalUsers.php"
        );
        console.log("API Response:", response.data);
        if (response.data.success) {
          setData({
            totalUsers: response.data.data.counts.total_users,
            totalProperties: response.data.data.counts.total_properties,
            totalRevenue: response.data.data.counts.total_revenue || 0,
            totalMessage: response.data.data.counts.total_message || 0,
            totalBooking: response.data.data.counts.total_booking || 0, 
          totalPayments: response.data.data.counts.total_payments || 0,
            combinedGrowthData: combineGrowthData(response.data.data),
            users: response.data.data.latest_users || [],
          });
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        setError("Fetch error");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const combineGrowthData = (data) => {
    const combinedDataMap = new Map();

    data.user_growth.forEach((item) => {
      combinedDataMap.set(item.month, {
        month: item.month,
        users: parseInt(item.users, 10),
        properties: 0,
        payments: 0,
      });
    });

    data.property_growth.forEach((item) => {
      if (combinedDataMap.has(item.month)) {
        combinedDataMap.get(item.month).properties = parseInt(item.properties, 10);
      } else {
        combinedDataMap.set(item.month, {
          month: item.month,
          users: 0,
          properties: parseInt(item.properties, 10),
          payments: 0,
        });
      }
    });

    data.payment_growth.forEach((item) => {
      if (combinedDataMap.has(item.month)) {
        combinedDataMap.get(item.month).payments = parseInt(item.payments, 10);
      } else {
        combinedDataMap.set(item.month, {
          month: item.month,
          users: 0,
          properties: 0,
          payments: parseInt(item.payments, 10),
        });
      }
    });

    return Array.from(combinedDataMap.values());
  };

  return (
    <Container fluid className="p-8">
      <Title order={1} className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </Title>

      {/* Replaced Grid with div and flexbox */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Revenue and Subscription Cards */}
        <div className="flex-1 md:w-2/3">
          <Flex gap="lg" direction={{ base: "column", md: "row" }}>
            {/* Total Users Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                width: "100%",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                position: "relative",
              }}
            >
              <div className="absolute top-4 left-4">
                <FiUsers size={20} />
              </div>
              <Text
                size="3xl"
                weight={900}
                style={{ marginTop: "40px", marginLeft: "20px" }}
              >
                {data.totalUsers !== null ? data.totalUsers : "Loading..."}
              </Text>
              <Text
                size="sm"
                style={{ marginTop: "8px", marginLeft: "20px", opacity: 0.8 }}
              >
                TOTAL USERS
              </Text>
            </Card>

            {/* Total Properties Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              style={{
                backgroundColor: "#0d9488",
                color: "white",
                width: "100%",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                position: "relative",
              }}
            >
              <div className="absolute top-4 left-4">
                <FiHome size={20} />
              </div>
              <Text
                size="3xl"
                weight={900}
                style={{ marginTop: "40px", marginLeft: "20px" }}
              >
                {data.totalProperties !== null ? data.totalProperties : "Loading..."}
              </Text>
              <Text
                size="sm"
                style={{ marginTop: "8px", marginLeft: "20px", opacity: 0.8 }}
              >
                TOTAL PROPERTIES
              </Text>
            </Card>
          </Flex>
        </div>

        {/* Right Side: Revenue and Messages Card */}
        <div className="md:w-1/3">
          <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "100%",
              height: "20vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Total Bookings */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FiBookmark size={20} style={{ color: "#4f46e5" }} />
                <Text  size="3xl"
                weight={900}
               >
                  Total Bookings
                </Text>
              </div>
              <Text  size="3xl"
                weight={900}
               >
                {data.totalBooking}
              </Text>
            </div>

            {/* Total Payments */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Text size="3xl" weight={900} color="gold" >
                  Total Payments
                </Text>
              </div>
              <Text  size="3xl"
                weight={900}
               >                {data.totalPayments}
              </Text>
            </div>
          </Card>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="mt-12">
        <Card shadow="sm" padding="lg" radius="md" className="h-full">
          <Title order={3} className="mb-4 text-2xl font-bold">
            Growth Over Time
          </Title>





          <div className="p-4 bg-white rounded-md  w-fit">
  <div className="text-sm text-gray-500">Total Revenue</div>
  <div className="text-xl font-semibold text-black mt-1 mb-3">
    {data.totalRevenue !== null ? `Rs.${data.totalRevenue}` : "Loading..."}
  </div>
</div>






              
          <BarChart
              h={300} 
              w={300} 
              data={data.combinedGrowthData}
              dataKey="month"
              xAxisProps={{ padding: { left: 30, right: 30 } }}
              tooltipProps={{
                content: ({ label, payload }) => {
                  if (!payload || payload.length === 0) return null;

                  // Extract data for the hovered month
                  const monthData = payload[0].payload;
                  return (
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                      <Text size="sm" weight={500} className="mb-2">
                        {label}
                      </Text>
                      <Text size="sm">Users: {monthData.users}</Text>
                      <Text size="sm">Properties: {monthData.properties}</Text>
                      <Text size="sm">Payments: {monthData.payments}</Text>
                    </div>
                  );
                },
              }}
              series={[
                { name: "users", color: "indigo.6" },
                { name: "properties", color: "teal.6" },
                { name: "payments", color: "orange.6" },
              ]}
            />
        </Card>
      </div>

      {/* Latest Users Section */}
      <Card shadow="sm" padding="lg" className="mt-8 bg-white rounded-xl border border-gray-100">
        <Title order={3} className="mb-6 text-2xl font-semibold text-gray-800">
          Latest Users
        </Title>

        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-600 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      ID
                      <svg className="w-3 h-3 ml-1.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      Verified
                      <svg className="w-3 h-3 ml-1.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-9 w-9">
                          <img 
                            className="h-9 w-9 rounded-full object-cover border border-gray-200" 
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                            alt={user.name} 
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 truncate max-w-[180px]">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {user.phoneNumber || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full 
                        ${user.userType === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          user.userType === 'moderator' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {Number(user.is_verified) === 1 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></span> Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <div className="whitespace-nowrap">{moment(user.created_at).format('MMM D, YYYY')}</div>
                        <div className="text-xs text-gray-500">{moment(user.created_at).fromNow()}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button 
            onClick={() => navigate("/navbar/users")}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            View all users
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default Dashboard;