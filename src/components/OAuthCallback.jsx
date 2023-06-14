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
            client_id: 'u-s4t2ud-bb2a73ab05b66cf3709517ff377eba7a4e91f57be600b7c31ba96931dad7341a',
            client_secret: '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',
            code: code,
            redirect_uri: 'http://localhost:5173/42-blockchain-club/home',
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