// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);

	vscode.languages.registerHoverProvider(
		'*',
		new MyHoverProvider()
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}

class MyHoverProvider {
	provideHover(
        document,
        position,
        token,
    ) {
		let str;
		if (position.line % 2 === 0) {
			str = new vscode.MarkdownString(
`<span style="background-color:#0000FF;">Hello&nbsp;<span style="background-color:#FF0000;">Hello</span></span><br>
<span style="background-color:#00FF00;">World</span>`)
		} else {
			str = new vscode.MarkdownString(
`<span style="background-color:#0000FF;margin:0;">Hello&nbsp;<span style="background-color:#FF0000;margin:0;">Hello</span></span><br>
<span style="background-color:#00FF00;margin:0;">World</span>`)
		}
		
		str.isTrusted = true;
		str.supportHtml = true;

		return new vscode.Hover(str)
	}
}