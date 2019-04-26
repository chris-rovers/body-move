# README

A simple extension that reminds developers to get up, stretch, take a walk or exercise. Being a developer involves a lot of sitting and it's important to stand up and move!

## Features

User can enter a number to set the reminder interval in minutes.
A persistent message in the status bar will display what time the next reminder will trigger.

- run **setMoveTimer** command via Command Pallette (or click the Status Bar) to adjust the reminder interval
- run **checkMoveTimer** command via Command Pallette to check the reminder interval
- run **clearMoveTimer** command via Command Pallette to clear the reminder interval (disables reminders)
- run **hideMoveTimer** command via Command Pallette to hide body.move() status bar item
- run **showMoveTimer** command via Command Pallette to show body.move() status bar item
- reminders can be reinstated with the **setMoveTimer** command

## Requirements

Just the will to get up and move, when reminded.

## Extension Settings

This extension contributes the following settings:

* command: extension.body-move
* command: body-move.setMoveTimer
* command: body-move.clearMoveTimer
* command: body-move.checkMoveTimer
* command: body-move.hideMoveTimer
* command: body-move.showMoveTimer

## Release Notes

### 0.2.0
04-26-2019
- Added checkMoveTimer command to view the reminder interval value
- Added hideMoveTimer command to hide body.move() status bar item
- Added showMoveTimer command to show body.move() status bar item
- Limited reminder interval value to 180 minutes (3 hours)

### 0.1.0
04-25-2019
- Added setMoveTimer command to adjust the reminder interval
- Added clearMoveTimer command to clear the reminder interval, thus disabling reminders

### 0.0.2
04-23-2019
- Shortened the message in the status bar.

### 0.0.1
04-23-2019
- Initial release of body-move VS Code extension.

  Planned features:

  - users can disable reminder via command
  - users can update timer interval via command
