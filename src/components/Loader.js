import React, { Component } from 'react'
import {Spring, config, Keyframes} from 'react-spring/renderprops'


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Container = Keyframes.Spring({
    // Single props
    show: {opacity: 1},
    // Chained animations (arrays)
    showAndHide: [{opacity: 1}, {opacity: 0}],
    // Functions with side-effects with access to component props
    wiggle: async (next, cancel, ownProps) => {
      await next({x: 100, config: config.wobbly})
      await delay(1000)
      await next({x: 0, config: config.gentle})
    }
  })

export class Loader extends Component {
    
    render() {
        return (
            <div>
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
            <Container state="showAndHide">{styles => <div style={styles}>Hello</div>}</Container>
            </div>
            
        )
    }
}

export default Loader
