import backgroundImage from '../images/pic7.webp';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { Box, Button,WrapItem,Wrap } from '@chakra-ui/react';
import { ChakraProvider, Heading, Flex, Spacer, Divider, Center } from '@chakra-ui/react';



function Complaint() {
 const [complaint, setComplaint] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            if (mapRef.current === null) {
                mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
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
            L.marker([position.coords.latitude, position.coords.longitude]).addTo(mapRef.current);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Complaint: " + complaint);
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
    };
 
  
   
  const places=['Lal Qila','Qutub Minar','JLN Stadium','Kalkaji Mandir','Akshardham','Jama Masjid',' Central Secretariat','Rajiv Chowk',' Jor Bagh','Chandni Chowk ',' Sarojini Nagar','Khan Market',' RK Ashram Marg','Nehru Place']

  return (
    <ChakraProvider>
      <Flex bg='black' h='500px' color='white' justifyContent='flex-start'>
        <Box width='700px' >
          <Heading paddingTop={'1rem'} marginBlockEnd={'auto'} fontFamily= 'cursive' fontSize={'xx-large'} >
            Select the locations  </Heading>
            <Wrap paddingTop={'4rem'}>
            {places.map((status, i) => (
              <WrapItem key={i}>
                <Button
                 
                >
              {status} 
            </Button>
          </WrapItem>
            ))}
            
          </Wrap>
           
           <Box  paddingTop={'6rem'}>
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
              >   
        </Box> 
        
</Flex>
      
     <Center height='30px'>
  <Divider orientation='vertical' />
</Center>
     
        <div className="container" >
            <h1>Street Light Complaint Form</h1>
            <form id="complaintForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="complaint">Complaint Description:</label>
                    <textarea
                        className="form-control"
                        id="complaint"
                        name="complaint"
                        rows="4"
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-attach">
                    <label htmlFor="fileInput">Choose an Image:</label>
                    <input type="file" id="fileInput" name="fileInput" />
                    <input type="submit" value="Upload" />
                </div>
                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="latitude"
                        name="latitude"
                        readOnly
                        value={latitude}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="longitude"
                        name="longitude"
                        readOnly
                        value={longitude}
                    />
                </div>
                <div id="map" ref={mapContainerRef} style={{ height: '300px' }}></div>
                <button type="button" className="btn btn-primary" onClick={getLocation}>
                    Get My Location
                </button>
                <button type="submit" className="btn btn-success">
                    Submit Complaint
                </button>
            </form>
        </div>

 
 
      
     

    </ChakraProvider>
  );
}

export default Complaint;
