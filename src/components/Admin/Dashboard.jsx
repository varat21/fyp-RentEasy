

import React, { useEffect, useState } from "react";
import { Card, Text, Title, Grid, Container, Flex } from "@mantine/core";
import { FiUsers, FiHome, FiDollarSign } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";


const Dashboard = () => {
  // State variables for API data
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalProperties, setTotalProperties] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null); // New state for revenue
  const [userGrowthData, setUserGrowthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/rent-easy/public/Admin/totalUsers.php"
        );

        if (response.data.success) {
          setTotalUsers(response.data.data.counts.total_users);
          setTotalProperties(response.data.data.counts.total_properties);
          setTotalRevenue(response.data.data.counts.total_revenue || 0); // Add revenue data
          setUserGrowthData(response.data.data.user_growth);
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="p-8">
      <Title order={1} className="mb-8 font-bold text-3xl">
        Admin Dashboard
      </Title>

      {/* Statistics Cards */}
      <Flex gap="md" wrap="wrap" className="mb-8">
        {/* Total Users Card */}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white flex-1 min-w-[250px]"
        >
          <div className="flex items-center justify-between">
            <FiUsers size={25} />
            <Text size="lg">
              Total Users
            </Text>
          </div>
          <Text size="2xl" weight={900} align="center" mt="md">
            {totalUsers !== null ? totalUsers : "Loading..."}
          </Text>
        </Card>

        {/* Total Properties Card */}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex-1 min-w-[250px]"
        >
          <div className="flex items-center justify-between">
            <FiHome size={25} />
            <Text size="lg" weight={700}>
              Total Properties
            </Text>
          </div>
          <Text size="2xl" weight={900} align="center" mt="md">
            {totalProperties !== null ? totalProperties : "Loading..."}
          </Text>
        </Card>

        {/* Total Revenue Card */}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="bg-gradient-to-r from-gray-300 to-gray-600 text-white flex-1 min-w-[250px]"
        >
          <div className="flex items-center justify-between">
            <FiDollarSign size={25} />
            <Text size="lg" weight={700}>
              Total Revenue
            </Text>
          </div>
          <Text size="2xl" weight={900} align="center" mt="md">
            {totalRevenue !== null ? `$${totalRevenue}` : "Loading..."}
          </Text>
        </Card>
      </Flex>

      {/* User Growth Chart */}
      <Card shadow="sm" padding="lg" radius="md" className="mb-8">
        <Title order={3} className="mb-4 font-bold text-2xl">
          User Growth Over Time
        </Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity & Notifications */}
      <Grid gutter="xl">
        <Grid.Col span={12} md={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={3} className="mb-4 font-bold text-2xl">
              Recent Activity
            </Title>
            <Text>No recent activity.</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={3} className="mb-4 font-bold text-2xl">
              Notifications
            </Title>
            <Text>No new notifications.</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;