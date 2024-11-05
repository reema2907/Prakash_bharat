import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChakraProvider,
  Flex,
  Button,
  Box,
  Heading,
  Spacer,
  Container,
} from '@chakra-ui/react';

const Navbar = () => {
  

  return (
    <ChakraProvider>
      <Container maxW="full" bg="green.200" color="#262626">
        <Flex justify="space-around" align="center" p="3">
          <Box p="2">
            <Heading size="md" fontSize="2xl" fontWeight="bold" letterSpacing="wide" fontFamily="cursive">
              Prakash Bharat App
            </Heading>
          </Box>
          <Spacer />
          <Link to="/">
            <Button  variant="ghost">Home</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/complaint">
            <Button variant="ghost">Complaint</Button>
          </Link>
          <Spacer />
        
        </Flex>
      </Container>

     
    </ChakraProvider>
  );
};

export default Navbar;
