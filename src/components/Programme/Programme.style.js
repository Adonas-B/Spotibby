import styled from 'styled-components'

const ProgrammeContainer =styled.div`
    display: flex;
    align-items: center;
    color: rgb(255,255,255);
    height: 180px;
    width: ${props => props.full ? '92vw' : '160px'};
    // border: solid 1px white;
    padding-left: 0.4em;
    padding-right: 0.4em;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: larger;
    text-align: left;
    border-right: 3px solid rgb(255,0,146);
    // border-top: 2px solid rgb(255,0,146);
    border-left: 3px solid rgb(30,215,96);
    scroll-snap-align: start;

`
export { ProgrammeContainer }