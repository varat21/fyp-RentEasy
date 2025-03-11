import React from 'react';
import { Container, Title, Text, Card, Grid } from '@mantine/core';
import { IconMapPin, IconCash, IconFileText, IconHome, IconShield, IconUser, IconCalendar } from '@tabler/icons-react';

const Blogs = () => {
  // Static data for the blog cards
  const blogData = [
    { icon: <IconMapPin size={28} />, title: 'Location', color: 'blue', text: 'Ensure the property is in a safe and convenient area. Check for proximity to public transport, schools, and workplaces.' },
    { icon: <IconCash size={28} />, title: 'Budget', color: 'teal', text: 'Determine your budget and account for additional costs like utilities, maintenance, and security deposits.' },
    { icon: <IconFileText size={28} />, title: 'Lease Agreement', color: 'orange', text: 'Read the lease agreement carefully. Look for clauses on rent increases, maintenance, and termination.' },
    { icon: <IconHome size={28} />, title: 'Property Condition', color: 'pink', text: 'Inspect the property for damages. Document the condition with photos to avoid disputes later.' },
    { icon: <IconShield size={28} />, title: 'Security', color: 'grape', text: 'Check for security features like locks, alarms, and surveillance. Ensure the neighborhood is safe.' },
    { icon: <IconUser size={28} />, title: 'Landlord Reputation', color: 'cyan', text: 'Research the landlord or property management. Look for reviews or ask previous tenants.' },
    { icon: <IconCalendar size={28} />, title: 'Future Plans', color: 'lime', text: 'Consider your long-term plans. Look for flexible lease terms if you\'re unsure about staying long.' },
  ];

  return (
    <Container size="lg" className="py-16 min-h-[50vh]">
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
        {blogData.map((item, index) => (
          <Grid.Col key={index} md={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" className="h-full hover:shadow-md transition-shadow">
              <div className={`bg-${item.color}-100 text-${item.color}-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              <Title order={3} className="text-2xl font-semibold text-gray-800 mb-3">
                {item.title}
              </Title>
              <Text className="text-gray-600">
                {item.text}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;