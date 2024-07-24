import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Flex,
  Button,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Container,
} from '@chakra-ui/react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (drawerType) => {
    navigate('/Login', { state: { drawerType } });
  };

  return (
    <ChakraProvider>
      <Container maxW='full' bg='green.200' color='#262626'>
        <Flex justify='space-around' align='center' p='4'>
          <Box p='2'>
            <Heading size='md' fontSize='2xl' fontWeight='bold' letterSpacing='wide' fontFamily='cursive'>
              Prakash Bharat App
            </Heading>
          </Box>
          <Spacer />
          <Link to='/'>
            <Button variant='ghost'>Home</Button>
          </Link>
          <Link to='/about'>
            <Button variant='ghost'>About</Button>
          </Link>
          <Link to='/complaint'>
            <Button variant='ghost'>Complaint</Button>
          </Link>
          <Spacer />
          <ButtonGroup>
            <Button colorScheme='teal' mr={4} onClick={() => handleNavigation('signUp')}>
              Sign Up
            </Button>
            <Button colorScheme='teal' onClick={() => handleNavigation('logIn')}>
              Log In
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default Navbar;
