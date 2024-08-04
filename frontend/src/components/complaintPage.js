import backgroundImage from '../images/pic7.webp';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useToast, Box, Button, WrapItem, Wrap, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Table, Thead, Tbody, Tr, Th, Td, ChakraProvider, Heading, Flex, Spacer, Divider, Center, FormControl, FormLabel, Input } from '@chakra-ui/react';

import './App.css';
//import customMarkerIcon from '../images/marker-icon.png'; // Import your custom marker icon image

function Complaint() {
    const [formData, setFormData] = useState({
        description: '',
        address: '',
        latitude: '',
        longitude: '',
    });
    const [electricianData, setElectricianData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const url = 'http://localhost:5000/api/submit/Form-Submit';
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
                    description: '',
                    address: '',
                    latitude: '',
                    longitude: '',
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

    const places = [
        'Lal Qila', 'Qutub Minar', 'JLN Stadium', 'Kalkaji Mandir', 'Akshardham',
        'Jama Masjid', 'Central Secretariat', 'Rajiv Chowk', 'Jor Bagh',
        'Chandni Chowk', 'Sarojini Nagar', 'Khan Market', 'RK Ashram Marg', 'Nehru Place'
    ];

    const PlaceButtons = () => {
        const [status, setStatus] = useState(places.reduce((acc, place) => {
            acc[place] = true;
            return acc;
        }, {}));

        const handleClick = async (place) => {
            const newStatus = { ...status, [place]: !status[place] };
            setStatus(newStatus);

            const selected = Object.keys(newStatus).find(p => !newStatus[p]);
            onOpen();
            if (selected) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/data/${encodeURIComponent(selected)}`);
                    setElectricianData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        return (
            <Box width='700px' justifyContent={'space-around'}>
                <Heading paddingTop={'1rem'} marginBlockEnd={'auto'} fontFamily='cursive' fontSize={'xx-large'}>
                    Select the locations
                </Heading>
                <Wrap paddingTop={'4rem'}>
                    {places.map((place) => (
                        <WrapItem key={place}>
                            <Button
                                onClick={() => handleClick(place)}
                                colorScheme={status[place] ? 'blue' : 'red'}
                            >
                                {place}
                            </Button>
                            </WrapItem>
                            ))}
                 </Wrap>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Selected Locations</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {loading ? <p>Loading...</p> : electricianData ? (
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Electrician</Th>
                                                        <Th>Place</Th>
                                                        <Th>Contact</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>{electricianData.name}</Td>
                                                        <Td>{electricianData.place}</Td>
                                                        <Td>{electricianData.contact}</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        ) : (
                                            <p>No data available</p>
                                        )}
                                    </ModalBody>
                                    <ModalFooter />
                                </ModalContent>
                            </Modal>
                       
               
                <Box paddingTop={'1rem'}>
                    <Button
                        color="white"
                        bg="teal"
                        fontFamily="cursive"
                        fontWeight="bold"
                        borderRadius="10px"
                    >
                        Submit the Locations
                    </Button>
                </Box>
            </Box>
        );
    };

    return (
        <ChakraProvider>
            <Flex bg='black' h='500px' color='white' justifyContent='flex-start'>
                <PlaceButtons />
                <Spacer />
                <Box
                    width='700px'
                    height='450px'
                    bg='white'
                    borderRadius='8px'
                    margin='20px'
                    backgroundImage={`url(${backgroundImage})`}
                    backgroundSize='cover'
                    backgroundPosition='right'
                    backgroundRepeat='no-repeat'
                />
            </Flex>
            <Center height='30px'>
                <Divider orientation='vertical' />
            </Center>
            <Box bg='antiquewhite' p={4}>
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
                        <Input name="description" value={formData.description} onChange={handleInputChange} />
                        <FormLabel>Address</FormLabel>
                        <Input type='text' name='address' value={formData.address} onChange={handleInputChange} />
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
