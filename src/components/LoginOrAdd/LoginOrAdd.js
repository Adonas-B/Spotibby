import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import SpotifyLogin from 'react-spotify-login';

const REACT_APP_URL = process.env.REACT_APP_URL

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function LoginOrAdd(props) {
    const [hasToken, setHasToken] = useState(false)
    const client_id = '1f044393f8714a7b9b9ab87a4777622c';
    const redirect_uri = `${REACT_APP_URL}/success`;
    const scopes = 'playlist-modify-public user-library-read';

    const { handleAddClick, spotifyPlaylistId } = props

     function onSuccess(response){
        console.log(response);
        const inOneHour = 1/24
        Cookies.set('access_token', response['access_token'], { expires: inOneHour})
        setHasToken(true)
    }
    
    function onFailure(response) {
        console.error(response);
    }

    function addToSpotify() {
        handleAddClick()
    }

    useEffect(() => {
        if (Cookies.get('access_token')) {
            setHasToken(true)
        }
    }, [hasToken])

    return (
        <ButtonContainer>
            {hasToken ?  
            <div className="Connect" onClick={addToSpotify}>
                <span>{spotifyPlaylistId ? "Added" : "Add"}</span>
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

