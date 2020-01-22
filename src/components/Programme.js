import React, { Component } from 'react'
import styled from 'styled-components'
import Track from './Track'

const ProgrammeContainer =styled.div`
    display: flex;
    color: rgb(255,255,255);

`

const ProgrammeImage =styled.img`
    height: 90px;
    width: 90px:
    padding-right: 40px;
`

export class Programme extends Component {
    constructor(props){
        super(props)
        this.state={
            episodes : null
        }
    }

    handleClick = () => {
        fetch(`${process.env.REACT_APP_API_URL}/programme/${this.props.info.programme_id}`)
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
                    })
                    this.props.handleProgrammeClick(data)
                })
    
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
              })
        
    }

    render() {
        const { info } = this.props

        let tracks_display;

        if (info['tracks']) {
            tracks_display = info['tracks'].map(t => <Track artist={t.artist} title={t.title}></Track>)
        }

        return (
            <div>
                <ProgrammeContainer style={{color: 'white'}} onClick={this.handleClick}>
                    <ProgrammeImage src={info.programme_image} alt=""/>
                    <h2>{info.programme_name}</h2>
                </ProgrammeContainer>
                {tracks_display}
            </div>
        )
    }
}

export default Programme
