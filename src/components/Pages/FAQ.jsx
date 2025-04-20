// import { Accordion, Container, Grid, Image, Title } from '@mantine/core';
// import classes from './FaqWithImage.module.css';

// const FAQ = () => {
//   return (
//     <div className={classes.wrapper}>
//       <Container size="lg">
//         <Grid id="faq-grid" gutter={50}>
//           <Grid.Col span={{ base: 12, md: 6 }}>
//             <Image src={"/image1.svg"} alt="House Renting FAQs" />
//           </Grid.Col>
//           <Grid.Col span={{ base: 12, md: 6 }}>
//             <Title order={2} ta="left" className={classes.title}>
//               Frequently Asked Questions
//             </Title>

//             <Accordion chevronPosition="right" variant="separated">
//               <Accordion.Item className={classes.item} value="rent-payment">
//                 <Accordion.Control>How do I pay my rent?</Accordion.Control>
//                 <Accordion.Panel>
//                   You can pay your rent through bank transfer, credit/debit card, or via our online payment portal.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item className={classes.item} value="lease-termination">
//                 <Accordion.Control>What is the process for terminating my lease early?</Accordion.Control>
//                 <Accordion.Panel>
//                   Lease termination policies vary. You may need to provide a notice period and pay an early termination fee. Check your lease agreement for details.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item className={classes.item} value="security-deposit">
//                 <Accordion.Control>How is my security deposit handled?</Accordion.Control>
//                 <Accordion.Panel>
//                   Your security deposit is held until you move out. If there are no damages beyond normal wear and tear, it will be refunded.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item className={classes.item} value="maintenance-requests">
//                 <Accordion.Control>How do I submit a maintenance request?</Accordion.Control>
//                 <Accordion.Panel>
//                   You can submit maintenance requests through our tenant portal or by contacting property management directly.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item className={classes.item} value="pet-policy">
//                 <Accordion.Control>Are pets allowed in the rental units?</Accordion.Control>
//                 <Accordion.Panel>
//                   Pet policies vary by property. Some allow pets with an additional deposit and monthly fee, while others have restrictions.
//                 </Accordion.Panel>
//               </Accordion.Item>
//             </Accordion>
//           </Grid.Col>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default FAQ;



import React, { useState, useEffect } from 'react';
import { 
  Accordion, 
  Container, 
  Grid, 
  Image, 
  Title, 
  Loader, 
  Center, 
  Alert
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('http://localhost/rent-easy/public/faq-api.php');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }

        setFaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '200px' }}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconX size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  // Filter active FAQs and ensure valid data
  const activeFAQs = Array.isArray(faqs) 
    ? faqs.filter(faq => 
        faq.is_active && 
        faq.faqs_id !== undefined && 
        faq.question && 
        faq.answer
      ) 
    : [];

  return (
    <div style={{ padding: '60px 0' }}>
      <Container size="lg">
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="/image1.svg" alt="House Renting FAQs" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" style={{ marginBottom: '30px', fontWeight: 600 }}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" variant="separated">
              {activeFAQs.map((faq) => (
                <Accordion.Item 
                  key={faq.faqs_id} 
                  value={faq.faqs_id.toString()}
                  style={{ 
                    marginBottom: '10px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <Accordion.Control>{faq.question}</Accordion.Control>
                  <Accordion.Panel>{faq.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default FAQ;