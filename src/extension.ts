// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let timerStatus: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log("Your \"body.move()\" extension is now active.");
	let waitTime = 0; // to be set by user via SetReminderTime() function
	timerStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	timerStatus.color = '#fff';
	context.subscriptions.push(timerStatus);

	// ask the user to enter how many minutes to delay the reminder
	function SetReminderTime() {
		vscode.window.showInputBox({placeHolder:
			"How many minutes should I wait to remind you to get up and move?"}).then(function (answer) { 
				if(answer){ 
				let timeSelection = parseInt(answer);
				// validate the user's input
				if(timeSelection > 0) {
					vscode.window.showInformationMessage("I\'ll remind you to get up in " + timeSelection + " minute(s).");
					waitTime = timeSelection * 60000;
					InitializeReminder();
				}
				else {
					vscode.window.showErrorMessage("Please enter a valid integer, greater than zero.");
					SetReminderTime();
				}
			} // outer if
		}); // showInputBox()
	} //SetReminderTime()

	SetReminderTime();

	// trim extra seconds and set reminder to fire at the top of the the minute (currently only an issue on first run)
	// intending to add a way that user can adjust the interval via command
	function InitializeReminder() {
		let date = new Date();
		let curSeconds = date.getSeconds() * 1000;
		let intervalTime = waitTime - curSeconds;
		let timer = setTimeout(ShowReminder, intervalTime);
		UpdateStatusBar();
	} // InitializeReminder()

	// fire off the reminder via Information Message
	function ShowReminder() {
		let messages = ["Time to get up and move!", "Go take a walk!", "You should stand up and strech!", "Go get some fresh air!",
									"Go do some exercise!"];
		// randomly select a message to display
		let reminderMessage = messages[Math.floor(Math.random() * messages.length)];
		vscode.window.showInformationMessage(reminderMessage);
		// queue the next reminder
		InitializeReminder();
	} // Move()

	// update the status bar to show what time the next reminder will be
	function UpdateStatusBar() {
		let hours = "";
		let minutes = "";
		let date = new Date();
		date.setTime(date.getTime() + waitTime); // set the reminder time to be displayed in status bar
		hours = date.getHours().toString();
		
		// change minutes from single-digits to double-digits
		if(date.getMinutes() < 10) {
			minutes = "0" + date.getMinutes();
		}
		else {
			minutes = date.getMinutes().toString();
		}

		// determine AM or PM
		if(date.getHours() % 24 > 12) {
			date.setHours(date.getHours() - 12);
			hours = date.getHours().toString();
			timerStatus.text = "body.move() at " + hours + ":" + minutes + " PM.";
		}
		// if midnight, change 00 to 12
		else if(date.getHours() === 0) {
			date.setHours(12);
			hours = date.getHours().toString();
			timerStatus.text = "body.move() at " + hours + ":" + minutes + " AM.";
		}
		else {
			timerStatus.text = "body.move() at " + hours + ":" + minutes + " AM.";
		}
		
		// print the message to status bar
		timerStatus.show();

	} // UpdateStatusBar()

} // activate()

// this method is called when your extension is deactivated
export function deactivate() {}