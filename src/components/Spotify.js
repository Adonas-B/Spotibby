import React, { Component } from 'react'
import SpotifyLogin from 'react-spotify-login';
import Cookies from 'js-cookie'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';


const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export class Spotify extends Component {
    constructor(props){
        super(props)
    }


    onSuccess = response => {
        console.log(response);
        const inOneHour = 1/24
        Cookies.set('access_token', response['access_token'], { expires: inOneHour})
        this.setState({
            success: true
        })
    }

    onFailure = response => console.error(response);

    render() {
        const client_id = '1f044393f8714a7b9b9ab87a4777622c';
        const redirect_uri = 'http://localhost:3000/success/';
        const scopes = 'playlist-modify-public user-library-read';
        return (
            <ButtonContainer>
                <SpotifyLogin
                    className="Connect" 
                    clientId={client_id}
                    redirectUri={redirect_uri}
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    scope={scopes}/>
            </ButtonContainer>
            
        )
    }
}

export default Spotify
