import React, { Component } from 'react'
import styled from 'styled-components'

const SeriesContainer =styled.div`
    display: flex;
    color: rgb(255,255,255);
    text-align: left;
    align-items: center;
    padding-left: 0.8em;
    padding-right: 0.8em;
    font-size: larger;
`

const SeriesImage =styled.img`
    padding-right: 1em;
    height: 90px;
    width: 160px;
`

export class Series extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    handleClick = () => {
        
        console.log(this.props.info.programme_series_id)
        console.log(`${process.env.REACT_APP_API_URL}/episodes/${this.props.info.programme_series_id}`)
        fetch(`${process.env.REACT_APP_API_URL}/episodes/${this.props.info.programme_series_id}`)
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
                        episodes: data.episodes,
                    })
                    this.props.handleEpisodeClick(data.episodes)
                })
    
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
              })
        
    }

   

    render() {
        const { info } = this.props
        return (
            <SeriesContainer onClick={this.handleClick}>
                <SeriesImage src={info.programme_image} alt={info.programme_series_name}/>
                <span>{info.programme_series_name}</span>
            </SeriesContainer>
        )
    }
}

export default Series
