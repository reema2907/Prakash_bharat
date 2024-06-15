import React from 'react';
import { Box, Button, Image, Flex ,Text} from '@chakra-ui/react';
import image1 from '../images/pic7.webp'; // Ensure the correct path to your image

function Complaint() {
  const redirectToComplaintPage = () => {
    // Implement your redirection logic here
    window.location.href = '/complaint.html'; // Example redirection
  };

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="black"
    >
       
      <Box
        bg="black"
        width={['50%', '60%', '60%']} // Decreased width
        height={['100%', '100%', '100%']} // Increased height
        p={4}
        borderRadius="10px"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="80%" // Width of the inner box
          height="60%" // Height of the inner box
          mb={4} // Margin bottom
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          borderRadius="10px"
          boxShadow="md"
        >
          <Image
            src={image1}
            alt="Streetlight Issue"
            objectFit="cover"
            width="100%"
            height="100%"
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
        <text>
          fkj 
        </text>
         <Text
        color="white"
        fontFamily="cursive"
        fontSize="large"
        mt={10} // Margin top for spacing
        textAlign="center"
      >
        Please report any issues with the streetlights in your area.<br></br>Users can effortlessly report defective street lights, providing accurate locations through our GIS /GPS  interface. This data is then leveraged for a swift and effective resolution of reported issues.

      </Text>
      </Box>
    </Flex>
  );
}

export default Complaint;
