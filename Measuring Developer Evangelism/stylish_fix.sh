#!/bin/bash
echo "Fixing jshint-stylish to work with solarized...";

if [ -e "node_modules/jshint-stylish/index.js" ]; then
  sed -i -e 's/chalk.gray/chalk.yellow/g' node_modules/jshint-stylish/index.js 
  echo "Fixed!";
else
  echo "jshint-stylish was not found. Install with npm install";
fi
