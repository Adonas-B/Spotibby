import React, { Component } from 'react';
import { SeriesContainer, SeriesImage } from './Series.style';

export class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/episodes/${this.props.info.programme_series_id}`
    )
      .then((res) => {
        if (res.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + res.status
          );
          return;
        }
        res.json().then((data) => {
          console.log(data);
          this.setState({
            episodes: data.episodes,
          });
          this.props.handleEpisodeClick(
            data.episodes,
            data.programme_series_id
          );
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  };

  render() {
    const { info } = this.props;
    return (
      <SeriesContainer onClick={this.handleClick}>
        <SeriesImage
          src={info.programme_image}
          alt={info.programme_series_name}
        />
        <span>{info.programme_series_name}</span>
      </SeriesContainer>
    );
  }
}

export default Series;
