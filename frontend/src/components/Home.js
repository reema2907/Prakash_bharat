import React from 'react';
import backgroundImage from '../images/background2.jpg';
import background1 from '../images/people.jpg';
import background2 from '../images/electrican1.jpg';
import { Box, ChakraProvider, Heading, Flex, Spacer, Divider, Center } from '@chakra-ui/react';
import './styles.css'; // Import the external CSS file

function Home() {
  return (
    <ChakraProvider>
      {/* First Flex Box Section */}
      <Flex bg="black" h="500px" color="white" justifyContent="flex-start">
        <Box  display='flex' alignItems='center' >
          <Heading className="home-custom-heading">
            PRAKASH BHARAT  WELCOMES  YOU!
          </Heading>
        </Box>
        <Spacer />
        <Box className="home-custom-box" style={{ backgroundImage: `url(${backgroundImage})` }}></Box>
      </Flex>

      {/* Divider */}
      <Center className="home-custom-divider">
        <Divider orientation="vertical" />
      </Center>

      {/* Second Flex Box Section */}
      <Flex bg="black" h="900px" color="white" justifyContent="center" alignItems="center">
        <Box className="home-custom-flex">
          <Heading className="home-custom-heading">
            WHAT WE DO
          </Heading>
          <p style={{ fontSize: 'x-large' }}>
            Centralized monitoring system that streamlines street light
            fault detection and location. <br />Our innovative platform ensures optimal
            lighting for safe and secure communities.
            <br />
          </p>
          <Flex justifyContent="space-between" mt={100}>
            <Box
              className="home-custom-box-450"
              style={{ backgroundImage: `url(${background2})` }}
            ></Box>

            <Box
              className="home-custom-box-450"
              style={{ backgroundImage: `url(${background1})` }}
              ml="100px" // Adjust the space between the boxes using marginLeft
            ></Box>
          </Flex>
        </Box>
      </Flex>

      {/* Divider */}
      <Center className="home-custom-divider">
        <Divider orientation="vertical" />
      </Center>
    </ChakraProvider>
  );
}

export default Home;
