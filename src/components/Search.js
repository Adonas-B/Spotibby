import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import search_icon from '../images/baseline_search_white_48dp.png'
import Loader from './Loader'
import Series from './Series'
import Programme from './Programme'
import SpotifyAuth from './SpotifyAuth'
import LoaderV2 from './LoaderV2'

const AppContainer = styled.div`
    height: 100vh;
    padding: 0 2vw;
    display: flex;
    // align-items: center;
`

const SearchContainer = styled.div`
    color: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const colorFade = keyframes`
    0% {
        border-bottom: solid 8px #f54997;
        // padding-left: 0px;
    }
    50% {
        border-bottom: solid 8px #1DB954;
        transform: translateX(20vw);
        // padding-left: 200px;
    }
    100% {
        border-bottom: solid 8px #f54997;
        // padding-left: 0px;
    }
`

const SearchInput = styled.input.attrs({type: 'search', autoFocus:'true'})`
    font-family: 'Alata', sans-serif;
    border: none;
    padding: 0px;
    // height: 24px;
    font-size: 48px;
    max-width: 300px;
    width: 70vw;
    color: rgba(255, 255,255);
    background-color: rgb(25,20,20);
    border-bottom: solid 8px #f54997;
    animation: ${props => props.go ? colorFade : ""} 3s linear infinite;
    :focus {
        outline: none;
    }
    ::-webkit-input-placeholder {
        font-family: 'Alata', sans-serif;
        color: rgba(210,210,210);
        // background-color: rgb(0,0,0);
      }
`

const SearchResultsContainer = styled.div`
      border-bottom: solid 8px rgb(30,215,96);
      border-top: solid 8px rgb(30,215,96);
      padding: 0.7em 0em;
      width: 96vw;
`

const EpisodesContainer = styled.div`
      display: flex;
      overflow: auto;
      
`

const Icon = styled.img`
    transform: translate(13px, 13px);
`

export class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false,
            currentDisplay: 'search',
            search_term: null,
            search_results: null,
            search_results_display: [],
            episodes: null,
            programme: null,
            currentProgramme: null
        }
    }

    componentDidMount(){
    }

    handleSearchChange = (e) => {
        this.setState({
            search_term: e.target.value
        })
    }
    
    handleSearchClick = () => {

        this.setState({
            isSearching: true,
            search_results: null,
            episodes: null,
            programme: null,
            currentProgramme: null
        })

        fetch(`${process.env.REACT_APP_API_URL}/search/${this.state.search_term}`)
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
                    // currentDisplay: 'search-results',
                    isSearching: false
                })
            })

        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
          })
    }

    handleEpisodeClick = (episodes, programme_series_id) => {
        this.setState({
            programme_series_id: programme_series_id,
            episodes: episodes,
            currentDisplay: 'episodes'
        })
    }

    handleProgrammeClick = (programme) => {
        console.log(programme['id'])
        this.setState({
            programme: programme,
            // currentDisplay: 'episodes',
            currentProgramme: programme['id']
        })
    }


    render() {
        const { isSearching, search_results, episodes, currentDisplay, search_term, programme, programme_series_id } = this.state
        let search_results_display;
        let episodes_display;
        let single_series;

        if (programme_series_id) {
            single_series = search_results.filter(p_s => p_s.programme_series_id === programme_series_id);
        }

        if (search_results) {
            search_results_display = search_results.map((s_r) => 
            <Series 
                info={s_r} 
                handleEpisodeClick={this.handleEpisodeClick}>
            </Series>
            )
        } 

        if (episodes) {
            let past_episodes = episodes.filter(programme => programme.date === null);
            episodes_display = past_episodes.map((programme, index) => 
                <Programme
                    key={index} 
                    programme={programme}
                    tracks={programme['tracks']} 
                    handleProgrammeClick={this.handleProgrammeClick}>
                </Programme>
                )
            }
        

        return (
            <AppContainer>
                {isSearching && <LoaderV2 ></LoaderV2>}
                
                <div>
                    {currentDisplay === 'search' ?
                    <SearchContainer>
                        <div>
                            <SearchInput 
                                go={isSearching}
                                placeholder="Search" 
                                onChange={this.handleSearchChange}>
                            </SearchInput>
                            {!isSearching ? 
                            <Icon src={search_icon} alt="Search Button" onClick={this.handleSearchClick}/> : null }
                        </div>
                        {!search_results ? 
                        <h2>{isSearching ? `Searching for ${search_term}...` : "For your favourite BBC DJ."}</h2> : null }
                        {search_results ? 
                        <h2>{`Results for ${search_term}`}</h2> : null }
                </SearchContainer>
                : null }
                {search_results ? 
                    <SearchResultsContainer>
                        { programme_series_id ? <Series info={single_series[0]} handleEpisodeClick={this.handleEpisodeClick}></Series> : search_results_display }
                    </SearchResultsContainer> : null
                }
                    <EpisodesContainer>
                        {episodes_display}
                    </EpisodesContainer>
                </div> 
            </AppContainer>
        )
    }
}

export default Search
