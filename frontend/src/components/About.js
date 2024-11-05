import backgroundImage from '../images/backgservice.jpeg';

import image3 from '../images/pic4.jpg';
import image2 from '../images/street.jpg';
import image1 from '../images/pic5.jpg';

// The variable image3 is a duplicate of image1, so it's removed.


import { Flex, Box, Heading, Center, Divider, Text,Image} from '@chakra-ui/react';


function About() {
 

  const imageStyles = {
    width: '850px',
    height: '480px',
    bg: 'white',
    borderRadius: '8px',
    margin: '10px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };
  
  

  return (
    <div>
      <Flex bg="black" h="500px" color="white" justifyContent="flex-start">
        <Box display="flex" alignItems="center">
          <Heading fontFamily="cursive" fontSize="xxx-large">ALL ABOUT PRAKASH BHARAT</Heading>
        </Box>
        <Box style={{ ...imageStyles }}></Box>
      </Flex>

      <Center height="30px">
        <Divider orientation="vertical" />
      </Center>

      <Flex
        bg="black"
        h="700px"
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Box
            bg="black"
            borderRadius="50%"
            h="400px"
            w="400px"
            m="40px"
            overflow="hidden"
            position="relative"
            color="white"
          >
            <Image src={image1} h="100%" w="100%" objectFit="cover" />
          </Box>
          <Box
            bg="black"
            borderRadius="50%"
            h="400px"
            w="400px"
            m="40px"
            overflow="hidden"
            position="relative"
            color="white"
          >
            <Image src={image3} h="100%" w="100%" objectFit="cover" />
          </Box>
          <Box
            bg="black"
            borderRadius="50%"
            h="400px"
            w="400px"
            m="40px"
            overflow="hidden"
            position="relative"
            color="white"
          >
            <Image src={image2} h="100%" w="100%" objectFit="cover" />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" width="100%" px="40px">
          <Text
            fontSize="18px"
            fontWeight="bold"
            textAlign="center"
            flex="1"
            px="10px"
          >
          Prakash Bharat stands as a beacon of light, offering a multilingual platform designed with utmost user-friendliness across diverse languages. 

          </Text>
          <Text
            fontSize="18px"
            fontWeight="bold"
            textAlign="center"
            flex="1"
            px="10px"
          >
           Our mission is to foster economic stability by providing gainful employment opportunities to local electricians who may have previously experienced uncertain income streams. 

          </Text>
          <Text
            fontSize="18px"
            fontWeight="bold"
            textAlign="center"
            flex="1"
            px="10px"
          >
           Prakash Bharat seamlessly tracks the user's location, facilitating the expedient allocation of the nearest qualified electrician to address the reported issue
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};
export default About;
