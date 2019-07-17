import React from 'react';

class Buttons extends React.Component {
    render() {
        return (
            <div className=' grid-buttons'>
                <button onClick={this.props.playButton}>Play</button>
                <button onClick={this.props.pauseButton}>Pause</button>
                <button onClick={this.props.resetButton}>Reset</button>
            </div>
        )
    }
}

export default Buttons