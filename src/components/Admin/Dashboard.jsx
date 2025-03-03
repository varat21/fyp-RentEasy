import React, { useEffect, useState } from "react";
import { Card, Text, Title, Grid, Container } from "@mantine/core";
import { FiUsers, FiHome } from "react-icons/fi";
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
      <Title order={1} className="mb-8">
        Admin Dashboard
      </Title>

      {/* Statistics Cards */}
      <Grid gutter="xl" className="mb-8">
        <Grid.Col span={12} md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="bg-blue-500 text-white">
            <div className="flex items-center justify-between">
              <FiUsers size={32} />
              <Text size="lg" weight={700}>Total Users</Text>
            </div>
            <Text size="2xl" weight={900} align="center" mt="md">
              {totalUsers !== null ? totalUsers : "Loading..."}
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="bg-green-500 text-white">
            <div className="flex items-center justify-between">
              <FiHome size={32} />
              <Text size="lg" weight={700}>Total Properties</Text>
            </div>
            <Text size="2xl" weight={900} align="center" mt="md">
              {totalProperties !== null ? totalProperties : "Loading..."}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* User Growth Chart */}
      <Card shadow="sm" padding="lg" radius="md" className="mb-8">
        <Title order={3} className="mb-4">User Growth Over Time</Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity & Notifications */}
      <Grid gutter="xl">
        <Grid.Col span={12} md={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={3} className="mb-4">Recent Activity</Title>
            <Text>No recent activity.</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={3} className="mb-4">Notifications</Title>
            <Text>No new notifications.</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
