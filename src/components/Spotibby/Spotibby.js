import React, { Component } from 'react';
import search_icon from '../../images/baseline_search_white_48dp.png';
import Series from '../Series/Series';
import Programme from '../Programme/Programme';
import LoaderV2 from '../Loader/LoaderV2';
import {
  SearchContainer,
  SearchInput,
  SearchResultsContainer,
  EpisodesContainer,
  Icon,
  AppContainer,
} from './Spotibby.style';
import { get_access_token } from '../../helpers/QueryParams';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

export class Spotibby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      currentDisplay: 'search',
      search_term: null,
      search_results: null,
      search_results_display: [],
      episodes: [],
      programme: null,
      currentProgramme: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (
      this.props.location.pathname.match('success') &&
      Cookies.get('access_token') === undefined
    ) {
      get_access_token(this.props.location.hash);
      this.props.history.push('/');
    }

    let session_search_term = sessionStorage.getItem('search_term');
    let session_search_results = sessionStorage.getItem('search_results');
    let session_episodes = sessionStorage.getItem('episodes');
    let session_programme_series_id = sessionStorage.getItem(
      'programme_series_id'
    );

    session_search_results = JSON.parse(session_search_results);
    session_episodes = JSON.parse(session_episodes);
    session_programme_series_id = JSON.parse(session_programme_series_id);

    this.setState({
      search_results: session_search_results,
      search_term: session_search_term,
      episodes: session_episodes,
      programme_series_id: session_programme_series_id,
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      search_term: e.target.value,
    });
  };

  handleSubmit(event) {
    console.log('handleSubmit');
    event.preventDefault();
  }

  handleSearchClick = (event) => {
    console.log('Searching');
    event.preventDefault();
    this.setState({
      isSearching: true,
      search_results: null,
      episodes: null,
      programme: null,
      currentProgramme: null,
    });

    fetch(`${process.env.REACT_APP_API_URL}/search/${this.state.search_term}`)
      .then((res) => {
        if (res.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + res.status
          );
          return;
        }
        res.json().then((data) => {
          sessionStorage.setItem(
            'search_results',
            JSON.stringify(data.search_results)
          );
          sessionStorage.setItem('search_term', this.state.search_term);
          this.setState({
            search_results: data.search_results,
            isSearching: false,
          });
        });
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
        this.setState({
          isSearching: false,
        });
      });
  };

  handleEpisodeClick = (episodes, programme_series_id) => {
    sessionStorage.setItem('episodes', JSON.stringify(episodes));
    sessionStorage.setItem(
      'programme_series_id',
      JSON.stringify(programme_series_id)
    );
    this.setState({
      programme_series_id: programme_series_id,
      episodes: episodes,
      currentDisplay: 'episodes',
    });
  };

  handleProgrammeClick = (programme) => {
    console.log(programme['id']);
    this.setState({
      programme: programme,
      // currentDisplay: 'episodes',
      currentProgramme: programme['id'],
    });
  };

  render() {
    const {
      isSearching,
      search_results,
      episodes,
      currentDisplay,
      search_term,
      programme_series_id,
    } = this.state;

    let search_results_display;
    let episodes_display;
    let single_series;

    if (programme_series_id) {
      single_series = search_results.filter(
        (p_s) => p_s.programme_series_id === programme_series_id
      );
    }

    if (search_results) {
      search_results_display = search_results.map((s_r) => (
        <Series
          info={s_r}
          handleEpisodeClick={this.handleEpisodeClick}
        ></Series>
      ));
    }

    if (episodes) {
      let past_episodes = episodes.filter(
        (programme) => programme.date === null
      );
      episodes_display = past_episodes.map((programme, index) => (
        <Programme
          key={index}
          programme={programme}
          tracks={programme['tracks']}
          handleProgrammeClick={this.handleProgrammeClick}
        ></Programme>
      ));
    }

    return (
      <AppContainer>
        {isSearching && <LoaderV2></LoaderV2>}
        <>
          {currentDisplay === 'search' ? (
            <SearchContainer>
              <>
                <form>
                  <SearchInput
                    go={isSearching}
                    placeholder="Search"
                    onChange={this.handleSearchChange}
                  ></SearchInput>
                  {!isSearching ? (
                    <Icon
                      type="image"
                      alt="Search Button"
                      src={search_icon}
                      onClick={this.handleSearchClick}
                    />
                  ) : null}
                </form>
              </>
              {!search_results ? (
                <h2>
                  {isSearching
                    ? `Searching for ${search_term}...`
                    : 'For your favourite BBC DJ.'}
                </h2>
              ) : null}
              {search_results ? <h2>{`Results for ${search_term}`}</h2> : null}
            </SearchContainer>
          ) : null}

          {search_results ? (
            <SearchResultsContainer>
              {programme_series_id ? (
                <Series
                  info={single_series[0]}
                  handleEpisodeClick={this.handleEpisodeClick}
                ></Series>
              ) : (
                search_results_display
              )}
            </SearchResultsContainer>
          ) : null}

          {episodes ? (
            <EpisodesContainer style={{ minWidth: '100%' }}>
              {episodes_display}
            </EpisodesContainer>
          ) : null}
        </>
      </AppContainer>
    );
  }
}

export default withRouter(Spotibby);
