import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import SpotifyLogin from 'react-spotify-login';


const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function LoginOrAdd(props) {
    const [hasToken, setHasToken] = useState(false)
    const client_id = '1f044393f8714a7b9b9ab87a4777622c';
    const redirect_uri = 'http://localhost:3000/success/';
    const scopes = 'playlist-modify-public user-library-read';

     function onSuccess(response){
        console.log(response);
        const inOneHour = 1/24
        Cookies.set('access_token', response['access_token'], { expires: inOneHour})
        setHasToken(true)
    }
    
    function onFailure(response) {
        console.error(response);
    }

    function handleAddClick() {
        props.handleAddClick()
    }

    useEffect(() => {
        Cookies.get('access_token') ? setHasToken(true) : setHasToken(false)
        }
    )
    return (
        <ButtonContainer>
            {hasToken ?  
            <div className="Connect" >
                <span>ADD</span>
            </div> 
            :
            <SpotifyLogin
                className="Connect" 
                clientId={client_id}
                redirectUri={redirect_uri}
                onSuccess={onSuccess}
                onFailure={onFailure}
                scope={scopes}/>
            }
        </ButtonContainer>
    )
}
