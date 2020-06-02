import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

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

    function addToSpotify() {
        handleAddClick()
    }

    useEffect(() => {
        if (Cookies.get('access_token')) {
            setHasToken(true)
        }
    }, [hasToken])

    const spotify_authorise_url = `https://accounts.spotify.com/authorize?` 
                                    + `client_id=${client_id}` 
                                    + `&redirect_uri=${redirect_uri}`
                                    + `&scope=${scopes}`
                                    + `&response_type=token`

    return (
        <ButtonContainer>
            {hasToken ?  
            <div className="Connect" onClick={addToSpotify}>
                <span>{spotifyPlaylistId ? "Added" : "Add"}</span>
            </div> 
            :
            <a className='Connect' href={spotify_authorise_url}>Connect Spotify</a>
        }
        </ButtonContainer>
    )
}

