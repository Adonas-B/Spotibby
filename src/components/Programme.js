import React, { Component } from 'react'
import styled from 'styled-components'
import Track from './Track'
import LoaderV2 from './LoaderV2'
import LoginOrAdd from './LoginOrAdd'
import Cookies from 'js-cookie'

const ProgrammeContainer =styled.div`
    display: flex;
    align-items: center;
    color: rgb(255,255,255);
    height: 180px;
    width: 160px;
    // border: solid 1px white;
    padding-left: 0.4em;
    padding-right: 0.4em;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: larger;
    text-align: left;
    border-right: 3px solid rgb(255,0,146);
    // border-top: 2px solid rgb(255,0,146);
    border-left: 3px solid rgb(30,215,96);

`

// const ProgrammeImage =styled.img`
//     height: 90px;
//     width: 160px;
//     padding-right: 40px;
// `


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
