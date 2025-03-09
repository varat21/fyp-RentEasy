import React from 'react';
import { Container, Title, Text, Card, List, ThemeIcon, Grid } from '@mantine/core';
import { IconCheck, IconMapPin, IconCash, IconFileText, IconHome, IconShield, IconUser, IconCalendar } from '@tabler/icons-react';

const Blogs = () => {
  return (
    <Container size="lg" className="py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <Title order={1} className="text-5xl font-bold text-gray-800 mb-4">
          What to Watch Before Renting
        </Title>
        <Text className="text-xl text-gray-600">
          Essential tips for tenants looking to rent a house, room, or shop.
        </Text>
      </div>

      {/* Blog Content */}
      <Grid gutter="xl">
        {/* Location */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="blue" className="mb-4">
              <IconMapPin size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Location
            </Title>
            <Text className="text-gray-600">
              Ensure the property is in a safe and convenient area. Check for proximity to public transport, schools, and workplaces.
            </Text>
          </Card>
        </Grid.Col>

        {/* Budget */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="teal" className="mb-4">
              <IconCash size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Budget
            </Title>
            <Text className="text-gray-600">
              Determine your budget and account for additional costs like utilities, maintenance, and security deposits.
            </Text>
          </Card>
        </Grid.Col>

        {/* Lease Agreement */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="orange" className="mb-4">
              <IconFileText size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Lease Agreement
            </Title>
            <Text className="text-gray-600">
              Read the lease agreement carefully. Look for clauses on rent increases, maintenance, and termination.
            </Text>
          </Card>
        </Grid.Col>

        {/* Property Condition */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="pink" className="mb-4">
              <IconHome size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Property Condition
            </Title>
            <Text className="text-gray-600">
              Inspect the property for damages. Document the condition with photos to avoid disputes later.
            </Text>
          </Card>
        </Grid.Col>

        {/* Security */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="grape" className="mb-4">
              <IconShield size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Security
            </Title>
            <Text className="text-gray-600">
              Check for security features like locks, alarms, and surveillance. Ensure the neighborhood is safe.
            </Text>
          </Card>
        </Grid.Col>

        {/* Landlord Reputation */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="cyan" className="mb-4">
              <IconUser size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Landlord Reputation
            </Title>
            <Text className="text-gray-600">
              Research the landlord or property management. Look for reviews or ask previous tenants.
            </Text>
          </Card>
        </Grid.Col>

        {/* Future Plans */}
        <Grid.Col md={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
            <ThemeIcon size="xl" radius="md" variant="light" color="lime" className="mb-4">
              <IconCalendar size={28} />
            </ThemeIcon>
            <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
              Future Plans
            </Title>
            <Text className="text-gray-600">
              Consider your long-term plans. Look for flexible lease terms if you're unsure about staying long.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Blogs;