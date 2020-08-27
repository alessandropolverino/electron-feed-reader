# Code Structure

## build/

Here all the assets needed to build the project are stored.

## src/

All the software's files:

- index.js

  Takes care of all the electronjs processes.

## src/css

- index.css

  Styles the page.

## src/js

- main.js

  Manages the different processes.

- feed_reader.js

  Handles reading and saving.

- menu.js

  Builds the app top menu and refreshes it every time needed (for example, if a feedUrl is saved, it has to be displayed under saved=>feedUrl=>...).

- store.js

  This file handles all the config saving operations.
