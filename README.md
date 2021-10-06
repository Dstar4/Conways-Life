# The making of Conway's game of life

When trying to tackle the problem of implementing my own version of Conway;s Game of Life I first reached to Polya's Problem Solving Techniques to break the problem down into pieces that are easier to tackle. The first step is to understand. To understand this problem I wanted to do more than just get a solution. I wanted to understand some of the history behind it and how it relates to computing history.

---
## **Step 1 - Understand**

## History

The origins of Conway's Game of Life go back to a British mathematician John Horton Conway who came up with a famous version of the Life concept theorized in the 1940's. These early versions of Life were an attempt to replicate a Turing Machine.

**Touring Machine**

A Turing Machine is an abstract concept of a machine that can read an *infinite tape* which is divided into cells. A *head* would move over this tape and read or write the cells one at a time. The *state register* would hold what was then though of as the *state of mind*. This could be compared to something like scope in a modern programming language which holds the variables and functions you currently have access to. Lastly a *table* of instructions is needed. This will tell the head to move over the tape, read or write a cell, and to control the state register. This idea of a Turing machine was created by Alan Turing and was used to help break German codes in World War II. This was the early thought behind creating a CPU for a computer.


**Conway's Life**

The general concept of Life had been around for about 30 years prior to John Conway's popularization by using a 2D array. After his implementation the area exploded with new growth and began to reach outside the world of academia.

The idea of cellular automaton was that you take a grid and a finite number of states (like off and on). Each state of an individual cell would then affect the state of a neighboring cell. Using this idea a set of rules for Life developed.

---
**Conway's Rules**


* Any live cell with fewer than two live neighbors dies, as if by underpopulation.

* Any live cell with two or three live neighbors lives on to the next generation.

* Any live cell with more than three live neighbors dies, as if by overpopulation.

* Any dead cell with three live neighbors becomes a live cell, as if by reproduction.

---
## **Step 2 - Plan**

Armed with our knowledge of the history of the problem and the rules we can go about thinking how to implement this ourselves. A good first step is to think about how you would implement the grid. We know that as we go through generations this will need to animate quickly and need to keep that in mind. I decided to implement my solution with a series of boxes with a border that forms a grid. You could also do this with the HTML `canvas` element. This would generally be a more performant way of running this.

Once we have a grid set up we need to start thinking about how we can represent our data in the grid. This would be a good time to look over something called a double buffer. A double buffer will allow us to display one set of data and then switch to a whole new set all at one, to prevent a partial update. This is very much like the problem in cellular automaton where we need to be able to change the state based on our neighbors, but all at once, not one at a time. If we just ran through the elements changing values we would not get an accurate result, so we need to make sure we do not manipulate the array of values while we are still constructing the new array. Once we have finished constructing our new array of values we need to replace the first one with it.

But how do we change those values to construct the second array? To do this we need to implement Conway's Rules of Life. This is not easy, but there are a few concepts that will really help. We need to think about how to identify all neighbors of a cell in a grid. We can do this with two loops running through our rows and columns of the grid.

There are 8 neighbors for every cell. If we are representing our current row and the current column running in loops, we can think about selecting our neighbors like this.

```js

[col - 1, row + 1]   [col, row + 1]   [col + 1, row + 1]
[col - 1, row]       [col, row]       [col + 1, row]
[col - 1, row - 1]   [col, row - 1]   [col + 1, row - 1]

```

Now that we can select the cells we need we can start to count up the live cells around us and then apply conway's rules to see if the cell will make it to the next generation. Once we have achieved this we can set the arrays for the next generation and display the new one in our grid. Doing something like changing the color of a cell for live or dead is a great way to see your progress.

---

## **Step 3 - Carry out the plan**

We have a good plan together, we understand the problem. It is time to start coding. You may run into unexpected hurdles here but stick with the plan. Make sure you refer back to the plan when you get stuck, and if you still feel lost maybe you need to go back to Step 1 and understand the problem a bit better. If you go back with a more specific problem this can be helpful for fully understanding. If canvas is confusing, decide if you can think of another way to achieve your goals without it.

---

## **Step 4 - Look Back**

Now that you have come to a solution you are ready to look back on what you did, and think about what you can do better or some possible edge cases you may not have accounted for. See if you can optimize your code to run as fast as possible, or make your grid really large to test your performance.
