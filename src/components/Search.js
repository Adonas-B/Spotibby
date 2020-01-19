import React, { Component } from 'react'
import styled from 'styled-components'
import search_icon from '../images/baseline_search_white_24dp.png'
import Loader from './Loader'
import Series from './Series'
import Programme from './Programme'

const SearchContainer = styled.div`
    color: rgb(255,255,255);
    // display: flex;
    // justify-content: center;
`

const SearchInput = styled.input`
    border: solid black 1px;
    // height: 24px;
    font-size: 24px;
    width: 100px;
    color: rgba(230,230,230);
    background-color: rgb(25,20,20);
    ::-webkit-input-placeholder {
        font-family: 'Alata', sans-serif;
        color: rgba(230,230,230);
        background-color: rgb(0,0,0);
      }
`

export class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false,
            currentDisplay: 'search',
            search_term: null,
            search_results: null,
            search_results_display: []
        }
    }

    componentDidMount(){
        console.log(this.props.API_URL)
    }

    handleSearchChange = (e) => {
        this.setState({
            search_term: e.target.value
        })
    }
    
    handleSearchClick = () => {

        this.setState({
            isSearching: true
        })
        
        fetch(`${this.props.API_URL}/search/${this.state.search_term}`)
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
                    search_results: data.search_results,
                    isSearching: false
                })
            })

        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
          })
    }

    handleEpisodeClick = (episodes) => {
        this.setState({
            episodes: episodes,
            currentDisplay: 'episodes'
        })
    }

    handleProgrammeClick = (programme) => {
        console.log(programme)
        this.setState({
            programme: programme,
            currentDisplay: 'programme'
        })
    }


    render() {
        const { isSearching, search_results, episodes, currentDisplay } = this.state
        let search_results_display;
        let episodes_display;

        if (search_results) {
            search_results_display = search_results.map((s_r) => 
            <Series 
                info={s_r} 
                handleEpisodeClick={this.handleEpisodeClick}>
            </Series>
            )
        } 

        if (episodes) {
            episodes_display = episodes.map( e => 
                <Programme 
                    info={e} 
                    handleProgrammeClick={this.handleProgrammeClick}>
                </Programme>
            )
        }
        return (
            <div>
                {isSearching && <Loader></Loader>}
                {currentDisplay == 'search' ?
                <SearchContainer>
                    <SearchInput placeholder="Search" onChange={this.handleSearchChange}></SearchInput>
                    <img src={search_icon} alt="Search Button" onClick={this.handleSearchClick}/>
                    <div>For your favourite BBC DJ.</div>
                    <div>
                        {search_results_display}
                    </div>
                </SearchContainer>
                : null}
                {currentDisplay == 'episodes' ?
                <div>

                    {episodes_display}
                </div>
                : null}
            </div>
        )
    }
}

export default Search
