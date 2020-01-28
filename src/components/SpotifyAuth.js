import React, { Component } from 'react'
import  styled  from 'styled-components'
import spotify_icon from '../images/Spotify_Icon_RGB_Green.png'

const ConnectButton = styled.div`
    background-color: rgb(25,20,20);
    padding: 5px;
    color: white;
    height: 44px;
    font-size: larger;
    display:flex;
    align-items: center;
    justify-content: center;
    border: solid 3px rgb(30,215,96);
    border-radius: 4px;
`

const ConnectImage = styled.img`
    padding: 0 10px;
`

const ConnectText = styled.a`
    color: white;
`

export class SpotifyAuth extends Component {
    constructor(props){
        super(props);
    }

    render() {

        const client_id = '1f044393f8714a7b9b9ab87a4777622c';
        const response_type = 'code';
        const redirect_uri = 'http://localhost:3000/authorise/';
        const scope = 'playlist-modify-public user-library-read' 

        const request_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

        return (
            <div>
                {/* <AddButton onClick={this.handleConnectClick}> */}
                <ConnectButton href={request_url}>
                    {/* {request_url} */}
                    <ConnectImage height='34px' width='34px' src={spotify_icon}></ConnectImage>
                    {/* <span href={request_url }>Connect</span> */}
                    <ConnectText href={request_url}>Connect</ConnectText>
                </ConnectButton>
            </div>
        )
    }
}

export default SpotifyAuth
