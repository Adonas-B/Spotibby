import React, { Component } from 'react'
import styled from 'styled-components'

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
            <div>
                <TrackImage ></TrackImage>
                <h4>{this.props.artist}</h4>
                <h5>{this.props.title}</h5>
            </div>
        )
    }
}

export default Track
