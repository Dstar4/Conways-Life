import React from 'react';
// import styled from 'styled-components'
import { Button } from 'semantic-ui-react'


class Buttons extends React.Component {
    render() {
        return (
            <div className=' grid-buttons'>
                <Button primary onClick={this.props.playButton}>Play</Button>
                <Button primary onClick={this.props.pauseButton}>Pause</Button>
                <Button primary onClick={this.props.resetButton}>Reset</Button>
                <Button primary onClick={this.props.incrementButton}>Increment</Button>
                <Button primary onClick={this.props.speedButton}>{this.props.speed}Speed</Button>
            </div>
        )
    }
}

export default Buttons