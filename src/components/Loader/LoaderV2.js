import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotatePink = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0.4;
  }

  33% {
    transform: rotate(360deg);
    opacity: 0.9;
  }

  66% {
    transform: rotate(720deg);
    opacity: 0.1;
  }
  100% {
    transform: rotate(1080deg);
    opacity: 0.4;
  }
  
`;

const rotateGreen = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0.6;
  }

  33% {
    transform: rotate(360deg);
    opacity: 0.1;
  }

  66% {
    transform: rotate(720deg);
    opacity: 0.9;
  }

  100% {
    transform: rotate(1080deg);
    opacity: 0.6;
  }
  
`;

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: rgba(255,255,255,0.8);
`

const Circle = styled.div`
    position: absolute;
    height: 4em;
    width: 4em;
    // left: 50%;
    // top: 50%;
    border-radius: 50%;
`

const CircleGreen = styled(Circle)`
    border: ridge 3em rgb(30, 215, 96);
    background: linear-gradient(135deg, rgb(30, 215, 96) 50%, rgb(49, 120, 45) 50%);
    animation: ${rotateGreen} 6s linear infinite;
`
const CirclePink = styled(Circle)`
    border: groove 3em rgb(243, 64, 140);
    background: linear-gradient(135deg, rgb(172, 0, 88) 50%, rgb(243, 64, 140) 50%);
    animation: ${rotatePink} 6s linear infinite;
`

function LoaderV2() {
    return (
        <Container>
            <CircleGreen></CircleGreen>
            <CirclePink></CirclePink>
        </Container>
    )
}

export default LoaderV2
