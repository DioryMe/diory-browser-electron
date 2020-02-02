# Design docs: Choose Home Folder

## Story

"As a user I need to tell application where my data is"

## Features

1. Defining for the first time
1. Changing folder path

### Defining for the first time

1. Specific startup wizard
1. "Please define home folder from preferences" message on startup
1. Mysterious button that you need to know to click
1. Default home folder with static example contents

### Changing folder path

1. Address bar
  * Like in web browser
1. Preferences menu
  * Like in Dropbox and other desktop apps
1. Mysterious button to launch folder selection dialog
  * Easiest to implement

## Exception handling

Some kind of notification when there's a problem with selected home folder.

1. Home.json is invalid or missin from folder
1. Invalid or missing diograph.json in subfolders



