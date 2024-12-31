import React from 'react';
import backgroundImage from '../images/backgservice.jpeg';
import image1 from '../images/pic5.jpg';
import image2 from '../images/street.jpg';
import { Flex, Box, Heading, Center, Divider, Text, Image } from '@chakra-ui/react';
import './styles.css'; // Import the external CSS file

function About() {
  return (
    <div>
      {/* First Flex Box Section */}
      <Flex bg="black" h="500px" color="white" justifyContent="flex-start">
        <Box display="flex" alignItems="center">
          <Heading fontFamily="cursive" fontSize="xxx-large">
            ALL ABOUT PRAKASH BHARAT
          </Heading>
        </Box>
        <Box
          className="image-box"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </Flex>

      {/* Divider */}
      <Center height="30px">
        <Divider orientation="vertical" />
      </Center>

      {/* Second Flex Box Section */}
      <Flex
        bg="black"
        h="700px"
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Box className="circle-image">
            <Image src={image1} h="100%" w="100%" objectFit="cover" />
          </Box>
          <Box className="circle-image">
            <Image src={image2} h="100%" w="100%" objectFit="cover" />
          </Box>
          <Box className="circle-image">
            <Image src={image2} h="100%" w="100%" objectFit="cover" />
          </Box>
        </Flex>

        <Flex justifyContent="space-between" width="100%" px="40px">
          <Text className="text-box" flex="1">
            Prakash Bharat stands as a beacon of light, offering a multilingual platform designed with utmost user-friendliness across diverse languages.
          </Text>
          <Text className="text-box" flex="1">
            Our mission is to foster economic stability by providing gainful employment opportunities to local electricians who may have previously experienced uncertain income streams.
          </Text>
          <Text className="text-box" flex="1">
            Prakash Bharat seamlessly tracks the user's location, facilitating the expedient allocation of the nearest qualified electrician to address the reported issue.
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}

export default About;
