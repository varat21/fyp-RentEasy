import React from 'react';
import {
  IconMapPin,
  IconCash,
  IconHome,
  IconFileText,
  IconUser,
  IconShield,
  IconBuilding,
  IconTools,
  IconAlertCircle,
} from '@tabler/icons-react';

const blogData = [
  {
    icon: <IconMapPin size={32} />,
    title: 'Location Matters More Than You Think',
    text: 'The right location enhances convenience, security, and accessibility. Assess proximity to essential services, safety, traffic conditions, and business potential (for shophouses). Visit the area at different times to gauge real living or business conditions.',
  },
  {
    icon: <IconCash size={32} />,
    title: 'Understand the Total Cost, Not Just the Rent',
    text: 'Rent is just one part of the financial equation. Clarify security deposits, maintenance charges, utility bills, and parking fees. Compare rental prices with similar properties to ensure a fair deal.',
  },
  {
    icon: <IconHome size={32} />,
    title: 'Inspect the Property Thoroughly',
    text: 'Never rely solely on photos or the landlord’s word. Check structural conditions, plumbing, electrical systems, furniture, and ventilation. Take photos of any damages before moving in to avoid disputes.',
  },
  {
    icon: <IconFileText size={32} />,
    title: 'Read and Understand the Lease Agreement',
    text: 'A rental agreement is legally binding. Clarify rental duration, termination policies, repair responsibilities, and subletting restrictions. Seek legal advice if anything is unclear.',
  },
  {
    icon: <IconUser size={32} />,
    title: 'Know Your Landlord and Building Policies',
    text: 'A responsive and fair landlord makes a huge difference. Verify the landlord’s reputation, understand building rules, and clarify business-use permissions for shophouses or apartments used as offices.',
  },
  {
    icon: <IconShield size={32} />,
    title: 'Prioritize Safety & Security',
    text: 'Check locks, CCTV, security guards, emergency exits, and fire safety compliance. Visit the area at night to assess lighting and overall security.',
  },
  {
    icon: <IconBuilding size={32} />,
    title: 'Business Potential for Shophouses',
    text: 'For shophouses, evaluate foot traffic, competitor presence, and zoning regulations. Ensure the location aligns with your business goals and target audience.',
  },
  {
    icon: <IconTools size={32} />,
    title: 'Maintenance and Repairs',
    text: 'Clarify who is responsible for maintenance and repairs—landlord or tenant. Ensure the property is well-maintained to avoid unexpected costs and discomfort.',
  },
  {
    icon: <IconAlertCircle size={32} />,
    title: 'Avoid Common Pitfalls',
    text: 'Beware of landlords who delay repairs, unclear lease terms, or properties with hidden damages. Always do thorough research and ask questions before committing.',
  },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Essential Checklist Before Renting a House, Shophouse, or Apartment
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Key considerations to ensure a smooth renting experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;