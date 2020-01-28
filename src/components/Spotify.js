import React, { Component } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import SpotifyLogin from 'react-spotify-login';

const ContinueButton = styled.div`
    border: solid white 2px;
    color: white;
    font-size: larger;
`

export class Spotify extends Component {
    constructor(props){
        super(props)
    }
    // componentDidMount() {
    //     const values = queryString.parse(this.props.location.search)
    //     console.log(values.code) // "top"
    //     // console.log(values.origin)
    //     console.log(this.props.location.search)
    //     sessionStorage.setItem('token', values.code);
    // }

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

// export class Spotify extends Component {
//     constructor(props){
//         super(props)
//     }
//     componentDidMount() {
//         const values = queryString.parse(this.props.location.search)
//         console.log(values.code) // "top"
//         // console.log(values.origin)
//         console.log(this.props.location.search)
//         sessionStorage.setItem('token', values.code);
//     }

//     handleClick = () => {
//         let token = sessionStorage.getItem('token');
//         console.log(token)
//         const grant_type = 'authorization_code';
//         const client_id = '1f044393f8714a7b9b9ab87a4777622c';
//         const client_secret = 'd4b05b6484504c90b5301607d36e9f9a';
//         const code = token;
//         const redirect_uri = 'http://localhost:3000/success/';

//         const data = {
//             grant_type : 'authorization_code',
//             client_id : '1f044393f8714a7b9b9ab87a4777622c',
//             client_secret : 'd4b05b6484504c90b5301607d36e9f9a',
//             code : token,
//             redirect_uri : 'http://localhost:3000/success/',
//         }

//         // const request_url = `https://accounts.spotify.com/api/token?grant_type=${grant_type}&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`
//         const request_url = `https://accounts.spotify.com/api/token`
//         console.log(request_url)
//         fetch(request_url, {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => {
//             console.log(response)
//         })

//     }

//     render() {
        
//         return (
//             <div>
//                 <ContinueButton onClick={this.handleClick}>Continue</ContinueButton>
//                 <a href="" target="_blank">Click MEEEEEE</a>
//             </div>
//         )
//     }
// }

// export default Spotify
