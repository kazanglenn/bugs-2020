# Bugs 2020

## Introduction

![Bugs 2020 Logo](https://github.com/kazanglenn/bugs-2020/blob/develop/images/bugs2020-logo.png)

This is a project with the intention of creating a simple simulated environment to demnstrate machine learning and adaptation in an unpredictable environment. There are mobile entities, `bugs`, that exist and harvest static entities, `algae`, for energy. The `algae` reproduce by spawning new entities in close proximity, leading to clumps. The `bugs` reproduce when they have consumed enough energy, in the form of `algae` to do so. Movement takes energy away from them, with an additional penalty based on the `bugs` speed.

A driver for the development of this app was the exploration and demonstration of certain key technologies. One of the drivers was to show a 2D graphics library working well within the context of a React app. Additionally, an objective was to demonstrate the use of `redux` as a solution for inter-component communications. Of course, the full list of 3rd party components can be found in the code, but the key technologies employed are;

 1. React
 2. Redux
 3. Pixi.js
 4. Chart.js
 5. Material-UI

The app is hosted using github pages. See the `envornment` links from the project home page (above). Below is an example of the app running.

![Bugs 2020 Screenshot](https://github.com/kazanglenn/bugs-2020/blob/develop/images/bugs-2020-02-fullpage.png)

