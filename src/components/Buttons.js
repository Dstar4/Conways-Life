import React from 'react';
// import styled from 'styled-components'
// import { Button } from 'semantic-ui-react'
import '../index.css'


class Buttons extends React.Component {
    render() {
        return (
            <div className=' grid-buttons'>
                <button className='control-button' onClick={this.props.playButton}>Play</button>
                <button className='control-button' onClick={this.props.pauseButton}>Pause</button>
                <button className='control-button' onClick={this.props.incrementButton}>Increment</button>
                <button className='control-button' onClick={this.props.clear}>Clear</button>
                <button className='control-button' onClick={this.props.resetButton}>Reset</button>
                {/* <button className='control-button' onClick={this.props.speedButton}>{this.props.speed}x Speed</button> */}
            </div>
        )
    }
}

export default Buttons