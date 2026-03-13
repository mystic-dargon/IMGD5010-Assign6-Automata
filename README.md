# IMGD5010 - Assign6 - Automata: The Game of Life

**Viewing the Simulation:**

[Game of Life | View Only](https://editor.p5js.org/mystic-dargon/full/1Bzu8S-Ml) || [Game of Life | Code View](https://editor.p5js.org/mystic-dargon/sketches/1Bzu8S-Ml) 

In order to change between the Game of Life replica and my custom variant, open the index.html document. Within the second set of body tags, include the line "<script src="sketch_var.js"></script>" for the variant, or the line "<script src="sketch.js"></script>" for the unmodified replica.<br><br>

**Inspiration:**

For my Game of Life variant, I chose to take an object-oriented approach so that I could work with the history of the cells as well as their current state. Dead cells are colored blue when they first die and slowly fade to white, while living cells start red and slowly turn orange the longer they've been alive. This gives the cells a bit of a trailing effect, where the blue dead cells show off where the mass used to be.

I also decided to add a probabilistic element to my variant, where cells are more likely to die the more crowded/lonely they are, and have an 80% chance of reproducing under the normal birth conditions. This results in a generally more long-lived simulation and a lack of blinkers (since their stablitiy can easily be disrupted if one of the blinking cells fail to die).
