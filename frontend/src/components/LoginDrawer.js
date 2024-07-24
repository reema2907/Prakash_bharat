import React, { useState } from 'react';
import {
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const LoginDrawer = ({ isOpen, onClose, drawerType }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const url = drawerType === 'signUp' ? 'http://localhost:5000/api/users/signup' : 'http://localhost:5000/api/users/login';
      const response = await fetch(url, {
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
        onClose();
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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{drawerType === 'signUp' ? 'Create your account' : 'Log In'}</DrawerHeader>

          <DrawerBody>
            {drawerType === 'signUp' ? (
              <>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input name="firstName" placeholder="First name" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input name="lastName" placeholder="Last name" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" placeholder="Username" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input name="email" placeholder="Email Address" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input name="address" placeholder="Address" onChange={handleInputChange} />
                </FormControl>
              </>
            ) : (
              <>
                <Input placeholder="Username" name="username" onChange={handleInputChange} />
                <Input mt={4} placeholder="Password" type="password" name="password" onChange={handleInputChange} />
              </>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleFormSubmit}>
              SUBMIT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default LoginDrawer;
