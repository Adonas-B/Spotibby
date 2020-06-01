import styled, { keyframes } from 'styled-components'

const AppContainer = styled.div`
    // height: 92vh;
    // padding: 4vw 4vw;
    // display: flex;
    // overflow-x: hidden;
    // align-items: center;
    // justify-content: center;
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

const SearchInput = styled.input.attrs({type: 'search', autoFocus: true })`
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
    //   width: 92vw;
`

const EpisodesContainer = styled.div`
      display: flex;
      overflow-x: auto;

`

const Icon = styled.input.attrs({type: 'image'})`
    transform: translate(13px, 13px);
`

export { SearchContainer, SearchInput, SearchResultsContainer, EpisodesContainer, Icon, AppContainer}