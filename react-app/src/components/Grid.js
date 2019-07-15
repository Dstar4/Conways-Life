// @flow
import React, { Component } from 'react';

let x = 0;
let y = 0;
let g = 0;
let h = 0;
export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.continueAnimation = true;
    }

    prevTimestamp = null;

    onAnimFrame = (timestamp) => {
        // Request another animation frame for the future
        requestAnimationFrame(this.onAnimFrame)
        let prevTimestamp = null
        // If we haven't yet stored the previous time, fake it
        if (prevTimestamp === null) {
            prevTimestamp = timestamp - 30; // milliseconds
        }

        // Compute how long it took between frames
        const elapsed = timestamp - prevTimestamp

        // Remember this for next frame
        prevTimestamp = timestamp;

        console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

        // TODO: Do animation stuff to the canvas
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillRect(g, h, x, y);

        // Request the first animation frame to kick things off
        requestAnimationFrame(this.onAnimFrame);

    }


    componentDidMount() {
        // Request initial animation frame

        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });

    }

    componentWillUnmount() {
        // Stop animating
        this.continueAnimation = false;
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={500} height={500} />
                <div className=' grid-buttons'>
                    <button>Play</button>
                    <button>Pause</button>
                    <button props={this.stopAnimation}>Stop</button>
                </div>
            </div>)
    }
}
