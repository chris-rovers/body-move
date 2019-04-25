# README

A simple extension that reminds developers to get up, stretch, take a walk or exercise. Being a developer involves a lot of sitting and it's important to stand up and move!

## Features

User can enter a number to set the amount of minutes to wait before triggering the reminder.
A persistent message in the status bar will display what time the next reminder is due to trigger.

- Run setMoveTimer command via Command Pallette to adjust the reminder interval, at any time
- Run clearMoveTimer command via Command Pallette to clear the reminder interval, at any time (disables reminders)
- reminders can be reinstated with the setMoveTimer command

## Requirements

Just the will to get up and move, when reminded.

## Extension Settings

This extension contributes the following settings:

* command: extension.body-move
* command: body-move.setMoveTimer
* command: body-move.clearMoveTimer

## Known Issues

TBD

## Release Notes

### 0.1.2
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
