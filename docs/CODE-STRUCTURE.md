# Code Structure

## build/

Here all the assets needed to build the project are stored.

## src/

All the software's files:

- index.js

  Takes care of all the electronjs processes.

- menu.js

  Builds the app top menu and refreshes it every time needed (for example, if a feedUrl is saved, it has to be displayed under saved=>feedUrl=>...).

- feedReader.js

  This file handles all the processes to read the page.

- store.js

  This file handles all the config saving operations.

- scheduleRead.js

  This file handles the reading repetition (creates the loops and stops them).

- repeatConfig.js

  This file handles the output files by the automatic reading.

- index.html

  Is the GUI of the software.

- index.css

  Styles the page.
