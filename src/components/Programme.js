import React, { Component } from 'react'
import Track from './Track'

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

        if (this.state.episodes) {
            tracks_display = this.state.episodes.tracks.map(t => <Track artist={t.artist} title={t.title}></Track>)
        }

        return (
            <div onClick={this.handleClick}>
                <img src={info.programme_image} alt=""/>
                {info.programme_name}
                {tracks_display}
            </div>
        )
    }
}

export default Programme
