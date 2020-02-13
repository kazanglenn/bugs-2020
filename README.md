![Bugs 2020 Logo](https://github.com/kazanglenn/bugs-2020/blob/develop/images/bugs2020-logo.png)

## Introduction

This is a project with the intention of creating a simple simulated environment to demonstrate machine learning and adaptation in an unpredictable environment. There are mobile entities, `bugs`, that exist and harvest static entities, `algae`, for energy. The `algae` reproduce by spawning new entities in close proximity, where there is not already algae present, leading to clumping. The `bugs` reproduce when they have consumed enough energy, in the form of the `algae`, to do so. Movement takes energy away from the `bugs`, with an additional penalty based on the `bugs` speed. The `algae` accumulate energy through time, to a maximum.

The `bugs` periodically mutate, changing attributes such as the speed at which they move, or the level of energy they will accumulate before reproducing. Each `bug` lineage is indicated by a colour. There are 10 initial `bug` attribute permutations seeded in the environment.

In time species will come to dominate, with better attribute sets. If too efficient, all the `algae` are consumed and that results in the end of the simulation. There is no random re-seeding at the moment. Classic foxes and rabbit cycles can be observed, with synchnronised boom-bust population oscilations of both `bugs` and `algae`.

![Population Cycles](https://github.com/kazanglenn/bugs-2020/blob/develop/images/bugs-and-algae.png)

## Motivation

A driver for the development of this app was the exploration and demonstration of certain technologies. One of the drivers was to show a 2D graphics library working well within the context of a `React` app. Additionally, an objective was to demonstrate the use of `Redux` as a solution for inter-component communications in `React`. Of course, the full list of 3rd party components can be found in the code, but the key technologies employed are;

 1. React
 2. Redux
 3. Pixi.js
 4. Chart.js
 5. Material-UI

## Hosting and Access

The app is hosted using github pages. See the `envornment` links from the project home page (above). Below is an example of the complete app running.

![Complete Screenshot](https://github.com/kazanglenn/bugs-2020/blob/develop/images/bugs-2020-02-fullpage.png)

