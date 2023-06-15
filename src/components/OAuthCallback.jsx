import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

// Make the API request to fetch user data using the access token

const OAuthCallback = () => {

    const { updateUser } = useContext(UserContext);

    const fetchUserData = async (accessToken, endpoint) => {
        try {
            const response = await axios.get('https://api.intra.42.fr/' + endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = response.data;
            updateUser(userData);
            // setUserData(userData);
            console.log('User Data:', userData);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        // Use the state to ensure auth flow originates from this application 
        const state = urlParams.get('state');
        
        const data = {
            grant_type: 'authorization_code',
            client_id: 'YOUR_APP_UID_FOUND_ON_INTRA',
            client_secret: 'YOUR_SECRET_FOUND_ON_INTRA',
            code: code,
            redirect_uri: 'http://localhost:5173/home',
        };

        fetch('https://api.intra.42.fr/oauth/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        })

        .then((response) => response.json())

        .then((data) => {
            const accessToken = data.access_token;
            fetchUserData(accessToken, "v2/me");
            // Do something with the access token (e.g., store it in state or local storage)
            console.log('Access Token:', accessToken);
        })
        .catch((error) => {
            console.error('TOKEN Error:', error);
        });





    }, []);

    
      return <div>Processing...</div>;
}

export default OAuthCallback