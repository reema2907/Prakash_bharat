
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useToast, Box, Button,  ChakraProvider, Heading, Flex,  FormControl, FormLabel, Input } from '@chakra-ui/react';

import './App.css';
//import customMarkerIcon from '../images/marker-icon.png'; // Import your custom marker icon image

function Complaint() {
    
    const [description, setdescription] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const toast = useToast();

    useEffect(() => {
    const initMap = () => {
        if (mapRef.current === null) {
            mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            const customIcon = new L.Icon({
                iconUrl: `${process.env.PUBLIC_URL}/images/marker-icon.png`,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41]
            });

            L.marker([51.5, -0.09], { icon: customIcon }).addTo(mapRef.current)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();
        }
    };

    initMap();

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
}, []);


    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/submit/Form-Submit', {
            description,
            address,
            latitude,
            longitude,
            // Add more fields if needed
        });

        if (response.status === 201) {
            toast({
                title: 'Success',
                description: response.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: 'Failed to submit the form.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    } catch (error) {
        toast({
            title: 'Error',
            description: `An error occurred: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
};
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        if (mapRef.current) {
            mapRef.current.setView([position.coords.latitude, position.coords.longitude], 13);

            const customIcon = new L.Icon({
               iconUrl: `${process.env.PUBLIC_URL}/images/marker-icon.png`,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41]
            });

            L.marker([position.coords.latitude, position.coords.longitude], { icon: customIcon }).addTo(mapRef.current);
        }
    }; 

    return (
        <ChakraProvider>
            <Box bg='black' p={4}>
                <Flex
                    bg='white'
                    borderRadius="10px"
                    direction="column"
                    width={{ base: '100%', sm: '90%', md: '70%', lg: '70%', xl: '70%' }}
                    mx="auto" p={4}
                >
                    <Heading textAlign={'center'}>
                        Street Light Complaint form
                    </Heading>
                    <FormControl>
                        <FormLabel>Complaint Description:</FormLabel>
                        <Input name="description" value={description} onChange={(e)=> setdescription(e.target.description) } />
                        <FormLabel>Address</FormLabel>
                        <Input type='text' name='address' value={address} onChange={(e)=> setAddress(e.target.address)} />
                        <FormLabel>Choose an Image:</FormLabel>
                        <input type="file" name="fileInput" />
                        <FormLabel>Latitude:</FormLabel>
                        <Input type="text" id="latitude" name="latitude" value={latitude} readOnly />
                        <FormLabel>Longitude:</FormLabel>
                        <Input type="text" id="longitude" name="longitude" value={longitude} readOnly />
                        <FormLabel id="map" ref={mapContainerRef} style={{ height: '300px', marginTop: '16px' }}></FormLabel>
                        <Flex justify="left" gap="2" wrap="wrap">
                            <Button
                                color="white"
                                bg="teal"
                                fontFamily="cursive"
                                fontWeight="bold"
                                borderRadius="10px"
                                onClick={getLocation}
                            >
                                Get My Location
                            </Button>
                            <Button
                                color="white"
                                bg="teal"
                                fontFamily="cursive"
                                fontWeight="bold"
                                borderRadius="10px"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit Complaint
                            </Button>
                        </Flex>
                    </FormControl>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

export default Complaint;
