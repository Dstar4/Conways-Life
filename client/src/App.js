import React, { Component } from 'react';
import { Grid } from './components/Grid'
import Buttons from './components/Buttons';

class App extends Component {
  constructor() {
    super()
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[ row ][ col ] = !gridCopy[ row ][ col ];
    this.setState({
      gridFull: gridCopy
    })
  }
  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 3) === 1) {
          gridCopy[ i ][ j ] = true
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  playButton = () => {
    console.log("play button")
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed)
  }

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
    // TODO Rules algo here
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // permutations
        // --------------------
        // top left
        // [i-1][j-1]
        // top
        // [i][j-1]
        // top right
        // [i+1][j+1]


        // i-1  |  j  | j+1  | j-1
        // i+1  |  j  | j+1  | j-1
        // j-1  |  i  | i+1  | i-1
        // j+1  |  i  | i+1  | i-1


        //left box

        // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
        // Any live cell with two or three live neighbors lives on to the next generation.
        // Any live cell with more than three live neighbors dies, as if by overpopulation.
        // Any dead cell with three live neighbors becomes a live cell, as if by reproduction.
        // keeps track of how many true or "live" boxes are neighbors.

        let count = 0;
        if (i > 0) if (g[ i - 1 ][ j ]) count++; // left
        // look for the box that is i-1 the current box if true increment count
        if (i > 0 && j > 0) if (g[ i - 1 ][ j - 1 ]) count++; // lower left
        // Look for the box up 1 and to the left 1
        if (i > 0 && j < this.cols - 1) if (g[ i - 1 ][ j + 1 ]) count++; // upper left
        // Look for the box above current box
        if (j < this.cols - 1) if (g[ i ][ j + 1 ]) count++; // upper
        // look for the box below the current box
        if (j > 0) if (g[ i ][ j - 1 ]) count++; // lower
        if (i < this.rows - 1) if (g[ i + 1 ][ j ]) count++; // right
        if (i < this.rows - 1 && j > 0) if (g[ i + 1 ][ j - 1 ]) count++; // lower right
        if (i < this.rows - 1 && j < this.cols - 1) if (g[ i + 1 ][ j + 1 ]) count++; //lower left
        if (g[ i ][ j ] && (count < 2 || count > 3)) g2[ i ][ j ] = false;
        if (!g[ i ][ j ] && count === 3) g2[ i ][ j ] = true;
        // Set new grid
        // Use the count to set to true or false depending on number of neighbors
        if (g[ i ][ j ] && (count < 2 || count > 3)) g2[ i ][ j ] = false;
        if (!g[ i ][ j ] && count === 3) g2[ i ][ j ] = true
      }

    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    })
  }

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div className='container help' >
        <h1>Cellular Automata and Conway's "Game of Life"</h1>
        <div id='top-level' className='help container'>
          <section className='help'>
          </section>
          <Grid
            gridFull={this.state.gridFull}
            rows={this.rows}
            cols={this.cols}
            selectBox={this.selectBox}
          />
          <Buttons playButton={this.playButton} />
          <section id='presets-wrapper' className='container'>
            <div className='container'>
              <h2>Generations: {this.state.generation}</h2>
              <button>Preset 1</button>
            </div>
            <div className='container'>
              <button>Preset 2</button>
            </div>
          </section>
          <section className="rules-wrapper ">
            <h2>Rules:</h2>
            <ul className='container'>
              <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
              <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
              <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
              <li>Any dead cell with three live neighbors becomes a live cell, as if by reproduction.</li>
            </ul>
          </section>
        </div>
        <section id='about'>
          <h2>About this Algorithm:
        </h2>
          <p>
            A cellular automaton (plural: cellular automata, abbreviated CA) is a program that operates on data
            typically stored in a 2D grid. (1D, 3D and n-D cellular automata run on lines, cubes, etc.)

            A simple set of rules describes how the value in a cell on the grid changes over time, often as the
            result of the states of that cell's neighbors.

            Sometimes neighbors includes the 4 orthogonally adjacent cells; sometimes it includes all 8 surrounding
            cells including diagonals.

            Each round of the simulation examines the current state of the grid, and then produces an entirely new
            grid consisting of the old state. (Remember the discussion about double buffers earlier--we don't want
            to modify the same grid we're examining, lest we munge future results.)

            This new grid becomes the "current" state of the simulation, and the process repeats. Each new grid is
            referred to as a generation.

            The beautiful thing about cellular automata is that sometimes very complex behavior can emerge from very
            simple rules.

            Practically speaking, CAs have been used in biological and chemical simulations and other areas of
            research, such as CA-based computer processors, and other numeric techniques.
        </p>
          <p>
            Turing Completeness
            We say a computing system is Turing Complete if it is capable of performing arbitrary, general purpose
            computation.

            Using a construct in The Game of Life called a glider gun, it's possible to build a rudimentary NAND
            gate in the Game of Life. While a NAND gate by itself isn't enough to be Turing Complete, the "infinite"
            grid of The Game of Life allows you to use them (or any other functionally complete operator) to build
            any other type of logical "circuitry" and memory, as well.

            Anything computable can be computed in The Game of Life given a large enough grid and enough time. Most
            people, however, find JavaScript to be a far easier development medium.
        </p>
          <h4>
            Double Buffering

        </h4>
          <p>There's a technique that's commonly used in graphics programming called double buffering. This is when we
              display one buffer to the user, but do work on one that's hidden from sight. In this way, the user
              doesn't see the buffer being generated, they only see the one that was previously completed.

              When we're done doing work on the hidden buffer, we page flip and show the hidden buffer to the user.
              Then the previously-displayed buffer becomes the new hidden buffer, and work begins again.

              There are multiple benefits to this approach.

              One is that the user doesn't see the work being progressively completed. From their perspective, the
              work is suddenly done as soon as the page flips.

              Another is that the program can use the previous buffer (i.e. the one that is currently being displayed)
              as a source for material to perform calculations to produce the next buffer. This is particularly
              beneficial where you need to produce a completely new output based on the complete previous output. If
              you were to only use a single buffer, you'd have to overwrite the pixels as you went, and this might
              affect the outcome of the subsequent pixels in an undesirable way.

              And this is very useful when implementing a cellular automaton.

              There will be two arrays of data for the automaton. One of them holds the data that the user currently
              sees on the canvas. The other one is where the next frame to be shown is being actively constructed.

              After the new frame is constructed, the next from becomes the current frame, and the current frame
              becomes the next frame. And the process repeats.

              Also note that this approach is vaguely reminiscent of the Model and View in the MVC pattern where the
            Model is manipulated then displayed by the View.</p>
        </section>
      </div >
    );
  }
}

// deep clone for arr
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr))
  // Array.from(arr)
}

export default App;
