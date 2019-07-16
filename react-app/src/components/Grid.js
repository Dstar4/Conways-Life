// @flow
import React, { Component } from 'react';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.continueAnimation = false;
        this.state = {
            x: 50,
            y: 50,
            g: 0,
            h: 0,
        }
    }
    stopAnimation = (e) => {
        e.preventDefault()
        console.log('clicked')
        this.setState({ continueAnimation: false })
    }
    // startAnimation = (e) => {
    //     e.preventDefault()
    //     console.log('clicked')
    //     this.setState({ continueAnimation: true })
    // }

    startAnimation = (e) => {
        e.preventDefault()
        console.log('clicked')
        this.setState({ x: 0 })
        this.setState({ y: 0 })
        this.setState({ continueAnimation: true })
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
        // console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

        // TODO: Do animation stuff to the canvas
        let canvas = this.refs.canvas; // refers to the ref attribute in render()
        let context = canvas.getContext('2d'); // etc.
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const pixelRGBA = getPixel(imageData, 10, 10);
        console.log(pixelRGBA)

        context.putImageData(imageData, 0, 0)
        // Set the pixel at 10,20 to pure red and display on the canvas:
        function getPixel(imageData, x, y) {
            const w = imageData.width; // Conveniently the width is here
            const h = imageData.height;

            if (x < 0 || x >= w || y < 0 || y >= h) {
                // Out of bounds
                return null;
            }

            // Compute index within the array
            const index = (w * y + x) * 4;

            // Return a copy of the R, G, B, and A elements
            return imageData.data.slice(index, index + 4);
        }

        // let buffer = imageData.data; // Obtained from getImageData()
        // let x = 10, y = 20;
        // let index = (y * canvas.width + x) * 4;

        // buffer[ index + 0 ] = 0xff; // Red: 0xff == 255, full intensity
        // buffer[ index + 1 ] = 0x00; // Green: zero intensity
        // buffer[ index + 2 ] = 0x00; // Blue: zero intensity
        // buffer[ index + 3 ] = 0xff; // Alpha: 0xff == 255, fully opaque

        context.putImageData(imageData, 0, 0); context.fillRect(this.state.g, this.state.h, this.state.x, this.state.y);

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
                    <button onClick={e => this.startAnimation(e)}>Play</button>
                    <button onClick={e => this.stopAnimation(e)}>Pause</button>
                    <button>Reset</button>
                </div>
            </div >)
    }
}
