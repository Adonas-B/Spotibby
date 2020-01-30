import React, { Component } from 'react'
import SpotifyLogin from 'react-spotify-login';


export class Spotify extends Component {
    constructor(props){
        super(props)
    }

    onSuccess = response => {
        console.log(response);
        sessionStorage.setItem('access_token', response['access_token']);
    
    }

    onFailure = response => console.error(response);

    render() {
        const client_id = '1f044393f8714a7b9b9ab87a4777622c';
        const redirect_uri = 'http://localhost:3000/success/';
        const scopes = 'playlist-modify-public user-library-read';
        return (
            <SpotifyLogin 
                clientId={client_id}
                redirectUri={redirect_uri}
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                scope={scopes}/>
            
        )
    }
}

export default Spotify
