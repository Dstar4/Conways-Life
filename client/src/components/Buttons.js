import React from 'react';

class Buttons extends React.Component {
    render() {
        return (
            <div className=' grid-buttons'>
                <button onClick={this.props.playButton}>Play</button>
                {/* <button onClick={}>Pause</button> */}
                <button>Reset</button>
            </div>
        )
    }
}

export default Buttons