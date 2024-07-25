import React from 'react';
import { Box, Button, Image, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/pic7.webp'; // Ensure the correct path to your image

function Complaint() {
  const navigate = useNavigate();

  const redirectToComplaintPage = () => {
    navigate('/complaintform');
  };

  return (
    <Flex
      height="100vh"
      bg="black"
    >
      <p style={{ fontSize: 'x-large' }}>
      Centralized monitoring system that streamlines street light
      fault detection and location.  <br></br>Our innovative platform ensures optimal
      lighting for safe and secure communities.<br></br>
    </p>
      <Box
        
        width={['50%', '60%', '60%']} // Decreased width
        height={['90%', '90%', '90%']} // Increased height
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        
        
      >
      <Box>
          <Image
            src={image1}
            alt="Streetlight Issue"
            objectFit="cover"
            width="100%"
            height="90%"
            borderRadius="10px"
          />
          
    
       </Box>
        
        <Button
          mt={18}
          color="white"
          bg="teal"
          fontFamily="cursive"
          fontWeight="bold"
          width="300px"
          height={45}
          borderRadius="10px"
          onClick={redirectToComplaintPage}
        >
          REPORT STREETLIGHT ISSUES
        </Button>
        
        
      </Box>
    </Flex>
  );
}

export default Complaint;
