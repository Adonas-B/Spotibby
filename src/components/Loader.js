import React, { Component } from 'react'
import {Spring, config, Keyframes} from 'react-spring/renderprops'


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const center = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

export class Loader extends Component {
    
    render() {
        return (
            <div style={center}>
                <Spring
                config={{duration:"3500"}}
                from={{ 
                    x: 1200, 
                    stroke :  'rgba(30, 125, 96)'
                }}
                to={{ 
                    x: 0,
                    stroke :  'rgba(243, 64, 140)'
                     }}>
                    {props => (
                        <svg style={{height: '300px', width:"400px", background: "rgba(25, 20, 20)"}}>
                        <path d="M 20 160 C 40 100 40 100 60 160 C 80 240 80 240 100 160 C 120 60 120 60 140 160 C 160 280 180 280 200 160 C 220 20 240 20 260 160 C 280 300 320 300 340 160 Q 360 80 380 40 " 
                        fill="rgba(25, 20, 20)" stroke={props.stroke} strokeWidth="8" strokeDashoffset={props.x} strokeDasharray="1200"/>
                      </svg>
                        // <svg strokeDashoffset={props.x}>
                        //     <path d="..." />
                        //  </svg>
                )}
            </Spring>
            </div>
            
        )
    }
}

export default Loader
