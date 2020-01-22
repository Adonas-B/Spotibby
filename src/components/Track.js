import React, { Component } from 'react'
import styled from 'styled-components'


const TrackContainer = styled.div`
    color: white;
    border-top: solid 2px #1DB954;
    border-bottom: solid 2px #f54997;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px 0;
    padding: 5px 0;
`

const TrackImage = styled.image`
    height: 88px;
    widgth: 88px;
`

export class Track extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <TrackContainer>
                {/* <TrackImage ></TrackImage> */}
                <span style={{fontSize: '2em'}}>{this.props.artist}</span>
                <span style={{fontSize: '1.2em'}}>{this.props.title}</span>
            </TrackContainer>
        )
    }
}

export default Track
