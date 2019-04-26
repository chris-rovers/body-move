// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let timerStatus: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log("Your \"body.move()\" extension is now active.");
	let waitTime = 0; // to be set by user via SetReminderTime() function
	let reminderTime = ""; // the actual number entered by the user. Used by CheckReminderTime()
	let timer: any; // a timeout to be set by InitializeReminder()
	let messages = ["Time to get up and move!", "Go take a walk!", "You should stand up and strech!", "Go get some fresh air!",
									"Go do some exercise!"];

	//user commands to be run from Command Pallette
	const setMoveTimer = 'body-move.setMoveTimer';
	context.subscriptions.push(vscode.commands.registerCommand(setMoveTimer, SetReminderTime));
	const clearMoveTimer = 'body-move.clearMoveTimer';
	context.subscriptions.push(vscode.commands.registerCommand(clearMoveTimer, ClearReminderTime));
	const checkMoveTimer = 'body-move.checkMoveTimer';
	context.subscriptions.push(vscode.commands.registerCommand(checkMoveTimer, CheckReminderTime));
	const hideMoveTimer = 'body-move.hideMoveTimer';
	context.subscriptions.push(vscode.commands.registerCommand(hideMoveTimer, HideStatusBar));
	const showMoveTimer = 'body-move.showMoveTimer';
	context.subscriptions.push(vscode.commands.registerCommand(showMoveTimer, ShowStatusBar));

	// status bar
	timerStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	timerStatus.color = '#fff';
	timerStatus.command = setMoveTimer;
	timerStatus.tooltip = "Click here to adjust body.move() timer.";
	context.subscriptions.push(timerStatus);

	// ask the user to enter minutes for reminder interval
	function SetReminderTime() {
		vscode.window.showInputBox({placeHolder:
			"Set the minute interval (up to 180 minutes) that you'd like to be reminded to move."}).then(function (answer) { 
			if(answer){ 
				let timeEntry = parseInt(answer);
				// validate the user's input
				if(timeEntry > 0 && timeEntry <= 180) {
					vscode.window.showInformationMessage("body.move() reminder set for " + timeEntry + " minute intervals.");
					reminderTime = "body.move() reminder set for " + timeEntry + " minute intervals.";
					waitTime = timeEntry * 60000;
					InitializeReminder();
					ShowStatusBar();
				} // if
				else if(timeEntry > 180) {
					vscode.window.showErrorMessage("Value should not exceed 180 minutes (3 hours).");
					SetReminderTime();
				} // else if
				else {
					vscode.window.showErrorMessage("Please enter a valid integer, greater than zero.");
					SetReminderTime();
				} // else
			} // outer if
		}); // .then(function())
	} //SetReminderTime()

	SetReminderTime();

	function ClearReminderTime() {
		clearTimeout(timer);
		vscode.window.showInformationMessage("body.move() reminder cleared.");
		timerStatus.text = "body.move() not set.";
	} // ClearReminder()

	// trim extra seconds and set reminder to fire at the top of the the minute
	function InitializeReminder() {
		let date = new Date();
		let curSeconds = date.getSeconds() * 1000;
		let intervalTime = waitTime - curSeconds;
		timer = setTimeout(ShowReminder, intervalTime);		
		UpdateStatusBar();
	} // InitializeReminder()

	function CheckReminderTime() {
		vscode.window.showInformationMessage(reminderTime);
	} // CheckReminderTime()

	function HideStatusBar() {
			timerStatus.hide();
	} // HideStatusBar()

	function ShowStatusBar() {
		timerStatus.show();
	} // ShowStatusBar()

	// fire off the reminder via Information Message
	function ShowReminder() {
		// randomly select a message to display from messages[]
		let message = messages[Math.floor(Math.random() * messages.length)];
		vscode.window.showInformationMessage(message);
		// queue the next reminder
		InitializeReminder();
	} // Move()

	// update the status bar to show what time the next reminder will be
	function UpdateStatusBar() {
		let hours = "";
		let minutes = "";
		let meridiem = "";
		let date = new Date();
		date.setTime(date.getTime() + waitTime); // set the reminder time that will be displayed in status bar
		hours = date.getHours().toString();
		
		// change minutes from single-digits to double-digits
		if(date.getMinutes() < 10) {
			minutes = "0" + date.getMinutes().toString();
		}
		else {
			minutes = date.getMinutes().toString();
		}

		// determine AM or PM
		if(date.getHours() % 24 >= 12) {
			date.setHours(date.getHours() - 12);
			hours = date.getHours().toString();
			meridiem = " PM.";
		}
		else {
			meridiem = " AM.";
		}

		// if midnight, change 00 to 12
		if(date.getHours() === 0) {
			date.setHours(12);
			hours = date.getHours().toString();
		}
		
		// update the text that will show in the status bar
		timerStatus.text = "body.move() at " + hours + ":" + minutes + meridiem;
				
	} // UpdateStatusBar()

} // activate()

// this method is called when your extension is deactivated
export function deactivate() {}