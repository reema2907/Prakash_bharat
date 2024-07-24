import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ChakraProvider,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Login = () => {
  const location = useLocation();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
  const { isOpen: isLogInOpen, onOpen: onLogInOpen, onClose: onLogInClose } = useDisclosure();
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (location.state) {
      if (location.state.drawerType === 'signUp') {
        onSignUpOpen();
      } else if (location.state.drawerType === 'logIn') {
        onLogInOpen();
      }
    }
  }, [location.state, onSignUpOpen, onLogInOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          address: '',
        });
      } else {
        throw new Error('Error in form submission');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Drawer isOpen={isSignUpOpen} placement='right' onClose={onSignUpClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input name="firstName" placeholder='First name' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input name="lastName" placeholder='Last name' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" placeholder='Username' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" type='password' placeholder='Password' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input name="confirmPassword" type='password' placeholder='Confirm Password' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input name="email" placeholder='Email Address' onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input name="address" placeholder='Address' onChange={handleInputChange} />
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme='blue' onClick={handleFormSubmit}>
              SUBMIT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer isOpen={isLogInOpen} placement='right' onClose={onLogInClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Log In</DrawerHeader>
          <DrawerBody>
            <Input placeholder='Username' />
            <Input mt={4} placeholder='Password' type='password' />
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onLogInClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'
              onClick={() => {
                const examplePromise = new Promise((resolve) => {
                  setTimeout(() => resolve(200), 5000);
                });

                toast.promise(examplePromise, {
                  success: { title: 'Promise resolved', description: 'Login Successfully' },
                  error: { title: 'Promise rejected', description: 'Something went wrong' },
                  loading: { title: 'Promise pending', description: 'Please wait' },
                });
              }}
            >
              SUBMIT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default Login;
