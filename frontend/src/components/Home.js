import backgroundImage from '../images/background2.jpg'; // Import the image
import background1 from '../images/people.jpg'; 
import background2 from '../images/electrican1.jpg'; 
import { Box} from '@chakra-ui/react';
import {ChakraProvider, Heading, Flex, Spacer, Divider, Center } from '@chakra-ui/react';



function Home() {
  return (
    <ChakraProvider>
      <Flex bg='black' h='500px' color='white' justifyContent='flex-start'>
        <Box display='flex' alignItems='center'>
          
          <Heading  fontFamily= 'cursive' fontSize={'xxx-large'} >
      PRAKASH BHARAT <br /><br /> WELCOMES <br /><br /> YOU!
    </Heading>
        </Box>
        <Spacer/>
        <Box
  width='800px'
  height='450px'
  bg='white'
  borderRadius='8px'
  margin='20px'
  backgroundImage={`url(${backgroundImage})`}
  backgroundSize='cover'
  backgroundPosition='right'
  backgroundRepeat='no-repeat'
></Box> 
</Flex>
     <Center height='30px'>
  <Divider orientation='vertical' />
</Center>


<Flex bg='black' h='900px' color='white' justifyContent='center' alignItems='center'>
  <Box display='flex' alignItems='center' flexDirection='column' textAlign='center'>
    <Heading fontFamily='cursive' fontSize={'xxx-large'}>
      WHAT WE DO 
    </Heading>
    <p style={{ fontSize: 'x-large' }}>
      Centralized monitoring system that streamlines street light
      fault detection and location.  <br></br>Our innovative platform ensures optimal
      lighting for safe and secure communities.<br></br>
    </p>
    <Flex justifyContent='space-between' mt={100}>
      <Box
        width='450px'
        height='450px'
        bg='white'
        borderRadius='8px'
        backgroundImage={`url(${background2})`}
        backgroundSize='cover'
        backgroundPosition='bottom'
              backgroundRepeat='no-repeat'
              
      >
      </Box>
           
      <Box
        width='450px'
        height='450px'
        bg='white'
        borderRadius='8px'
        backgroundImage={`url(${background1})`}
        backgroundSize='cover'
        backgroundPosition='bottom'
        backgroundRepeat='no-repeat'
        ml='100px' // Adjust the space between the boxes using marginLeft
      ></Box>
    </Flex>
  </Box>
</Flex>
 <Center height='30px'>
  <Divider orientation='vertical' />
      </Center>
      
     

    </ChakraProvider>
  );
}

export default Home;
