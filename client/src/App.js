import React, { Component } from 'react';
import { Grid } from './components/Grid'
import Buttons from './components/Buttons';
import './index.css'
// import styled from 'styled-components'




class App extends Component {
  constructor() {
    super()
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generations: 0,
      speed: 100,
      speedIndex: 0,
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
  pauseButton = () => {
    console.log("pause button")
    clearInterval(this.intervalId)
  }
  resetButton = () => {
    console.log("reset button")
    clearInterval(this.intervalId)
    this.setState({ generation: 0 })
    let gridCopy = arrayClone(this.state.gridFull);
    this.setState({
      gridFull: gridCopy
    })
    this.seed()
  }
  clearButton = () => {
    clearInterval(this.intervalId)
    this.setState({ generation: 0 })
    let gridCopy = arrayClone(this.state.gridFull);
    this.setState({
      gridFull: gridCopy
    })
  }
  speedButton = () => {
    const speeds = [ 4, 200, 1000 ]
    if (this.state.speedIndex < speeds.length - 1) {
      this.setState({
        speedIndex: this.state.speedIndex + 1,
        speed: speeds[ this.state.speedIndex ]
      })
    } else {
      this.setState({
        speedIndex: 0,
        speed: speeds[ this.state.speedIndex ]
      })
    }
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.state.speed)

  }
  playButton = () => {
    clearInterval(this.intervalId)
    this.setState({ generation: 0 })
    this.intervalId = setInterval(this.play, this.state.speed)
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
  // gridSize = (r = 30, c = 50) => {
  //   this.rows = r

  //   this.cols = c
  // }
  render() {
    // console.log(this.rows)
    // console.log(this.cols)
    return (
      <div className='container' >
        <div className='head-wrapper'>
          <h1 className='header'>Cellular Automata and Conway's "Game of Life"</h1>

          <div id='top-level' className='center'>
            <Grid
              gridFull={this.state.gridFull}
              rows={this.rows}
              cols={this.cols}
              selectBox={this.selectBox}
            />
            <Buttons
              playButton={this.playButton}
              resetButton={this.resetButton}
              pauseButton={this.pauseButton}
              incrementButton={this.play}
              speedButton={this.speedButton}
              speed={this.state.speed}
              clear={this.clearButton}
            />
          </div>
          <section id='presets-wrapper' className='container'>
            <h2>Generations: {this.state.generation}</h2>
            <button>Preset 1</button>
            <button>Preset 2</button>

            <section className="rules-wrapper ">
              <h2>Rules:</h2>
              <ul className='container'>
                <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                <li>Any dead cell with three live neighbors becomes a live cell, as if by reproduction.</li>
              </ul>
            </section>
          </section>
          <hr />
        </div>
        <section id='about'>
          <h2>The making of Conway's game of life</h2>
          <p>
            When trying to tackle the problem of implementing my own version of Conway;s Game of Life I first reached to Polya's Problem Solving Techniques to break the problem down into pieces that are easier to tackle. The first step is to understand. To understand this problem I wanted to do more than just get a solution. I wanted to understand some of the history behind it and how it relates to computing history.</p>

          <h3>Step 1 - Understand**</h3>
          <h4>History</h4>

          <p>The origins of Conway's Game of Life go back to a British mathematician John Horton Conway who came up with a famous version of the Life concept theorized in the 1940's. These early versions of Life were an attempt to replicate a Turing Machine.</p>

          <h4>Touring Machine</h4>

          <p>A Turing Machine is an abstract concept of a machine that can read an *infinite tape* which is divided into cells. A *head* would move over this tape and read or write the cells one at a time. The *state register* would hold what was then though of as the *state of mind*. This could be compared to something like scope in a modern programming language which holds the variables and functions you currently have access to. Lastly a *table* of instructions is needed. This will tell the head to move over the tape, read or write a cell, and to control the state register. This idea of a Turing machine was created by Alan Turing and was used to  break German codes in World War II. This was the early thought behind creating a CPU for a computer.</p>


          <h4>Conway's Life</h4>

          <p>The general concept of Life had been around for about 30 years prior to John Conway's popularization by using a 2D array. After his implementation the area exploded with new growth and began to reach outside the world of academia.

          The idea of cellular automaton was that you take a grid and a finite number of states (like off and on). Each state of an individual cell would then affect the state of a neighboring cell. Using this idea a set of rules for Life developed.</p>

          <h4>Conway's Rules</h4>

          <ul>
            <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>

            <li>Any live cell with two or three live neighbors lives on to the next generation.</li>

            <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>

            <li>Any dead cell with three live neighbors becomes a live cell, as if by reproduction.</li>
          </ul>

          <h4>Step 2 - Plan</h4>
          <p>Armed with our knowledge of the history of the problem and the rules we can go about thinking how to implement this ourselves. A good first step is to think about how you would implement the grid. We know that as we go through generations this will need to animate quickly and need to keep that in mind. I decided to implement my solution with a series of boxes with a border that forms a grid. You could also do this with the HTML `canvas` element. This would generally be a more performant way of running this.</p>

          <p>Once we have a grid set up we need to start thinking about how we can represent our data in the grid. This would be a good time to look over something called a double buffer. A double buffer will allow us to display one set of data and then switch to a whole new set all at one, to prevent a partial update. This is very much like the problem in cellular automaton where we need to be able to change the state based on our neighbors, but all at once, not one at a time. If we just ran through the elements changing values we would not get an accurate result, so we need to make sure we do not manipulate the array of values while we are still constructing the new array. Once we have finished constructing our new array of values we need to replace the first one with it.</p>

          <p>But how do we change those values to construct the second array? To do this we need to implement Conway's Rules of Life. This is not easy, but there are a few concepts that will really . We need to think about how to identify all neighbors of a cell in a grid. We can do this with two loops running through our rows and columns of the grid.</p>

          <p>There are 8 neighbors for every cell. If we are representing our current row and the current column running in loops, we can think about selecting our neighbors like this.</p>
          <figure>
            <pre>
              <code>[col - 1, row + 1]   [col, row + 1]   [col + 1, row + 1]</code><br />
              <code>[col - 1, row]       [col, row]       [col + 1, row]</code><br />
              <code>[col - 1, row - 1]   [col, row - 1]   [col + 1, row - 1]</code><br />
            </pre>
          </figure>


          <p>Now that we can select the cells we need we can start to count up the live cells around us and then apply conway's rules to see if the cell will make it to the next generation. Once we have achieved this we can set the arrays for the next generation and display the new one in our grid. Doing something like changing the color of a cell for live or dead is a great way to see your progress.</p>

          <h4>Step 3 - Carry out the plan</h4>

          <p>We have a good plan together, we understand the problem. It is time to start coding. You may run into unexpected hurdles here but stick with the plan. Make sure you refer back to the plan when you get stuck, and if you still feel lost maybe you need to go back to Step 1 and understand the problem a bit better. If you go back with a more specific problem this can be ful for fully understanding.</p>

          <h4>Step 4 - Look Back</h4>

          <p>Now that you have come to a solution you are ready to look back on what you did, and think about what you can do better or some possible edge cases you may not have accounted for. See if you can optimize your code to run as fast as possible, or make your grid really large to test your performance.</p>
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
