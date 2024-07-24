import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChakraProvider,
  Flex,
  Button,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import LoginDrawer from './LoginDrawer';

const Navbar = () => {
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
  const { isOpen: isLogInOpen, onOpen: onLogInOpen, onClose: onLogInClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Container maxW="full" bg="green.200" color="#262626">
        <Flex justify="space-around" align="center" p="4">
          <Box p="2">
            <Heading size="md" fontSize="2xl" fontWeight="bold" letterSpacing="wide" fontFamily="cursive">
              Prakash Bharat App
            </Heading>
          </Box>
          <Spacer />
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/complaint">
            <Button variant="ghost">Complaint</Button>
          </Link>
          <Spacer />
          <ButtonGroup>
            <Button colorScheme="teal" mr={4} onClick={onSignUpOpen}>
              Sign Up
            </Button>
            <Button colorScheme="teal" onClick={onLogInOpen}>
              Log In
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>

      {/* Login and Signup Drawers */}
      <LoginDrawer isOpen={isSignUpOpen} onClose={onSignUpClose} drawerType="signUp" />
      <LoginDrawer isOpen={isLogInOpen} onClose={onLogInClose} drawerType="logIn" />
    </ChakraProvider>
  );
};

export default Navbar;
