import React, { Component } from 'react'
import Track from '../Track/Track'
import LoaderV2 from '../Loader/LoaderV2'
import LoginOrAdd from '../LoginOrAdd/LoginOrAdd'
import Cookies from 'js-cookie'
import { ProgrammeContainer } from './Programme.style'

export class Programme extends Component {
    constructor(props){
        super(props)
        this.state={
            episodes : null,
            isTracksShown: false,
            isLoading: false,
        }
    }

    handleAddClick = () => {
        let access_token = Cookies.get('access_token')
        console.log('ADDING')
        this.setState({ isLoading: true })
        fetch(`${process.env.REACT_APP_API_URL}/programme/${this.props.programme.programme_id}/add?access_token=${access_token}`)
                .then(res => {
                    if (res.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                          res.status);
                        return;
                      }
                    res.json()
                    .then(data =>  {
                        console.log(data)
                        this.setState({ isLoading: false })
                    })
        
                })
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  })
    }

    handleClick = () => {
        if(this.state.tracks){
            this.setState({
                isTracksShown : this.state.isTracksShown ? false : true
            })
        }
        else {
            fetch(`${process.env.REACT_APP_API_URL}/programme/${this.props.programme.programme_id}`)
                .then(res => {
                    if (res.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                          res.status);
                        return;
                      }
                    res.json()
                    .then(data =>  {
                        console.log(data)
                        this.setState({
                            episodes: data,
                            tracks: data['tracks'],
                            isTracksShown : this.state.isTracksShown ? false : true
                        })
                        this.props.handleProgrammeClick(data)
                    })
        
                })
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  })
        }
        
    }

    render() {
        const { programme } = this.props
        const { isTracksShown, tracks, isLoading } = this.state

        let tracks_display;

        if (tracks) {
            tracks_display = tracks.map(t => <Track artist={t.artist} title={t.title}></Track>)
        }

        return (
            <div>
                {isLoading && <LoaderV2></LoaderV2>}
                <ProgrammeContainer style={{color: 'white'}} onClick={this.handleClick}>
                    {/* <ProgrammeImage src={programme.programme_image} alt=""/> */}
                    <span>{programme.programme_name ? programme.programme_name : programme.programme_title}</span>
                </ProgrammeContainer>
                {isTracksShown ? 
                <div>

                    <span style={{color: 'white'}}>Tracks Played:</span>
                    <LoginOrAdd handleAddClick={this.handleAddClick}></LoginOrAdd>
                    {tracks_display}
                </div> :
                null }
            </div>
        )
    }
}

export default Programme
