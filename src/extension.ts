import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"listExtensions",
		async () => {
			const extensions = vscode.extensions.all.filter(
				(ext) => !ext.id.startsWith("vscode.") // skip built-ins
			)

			const rows: string[] = []
			rows.push("Extension Name,Extension ID,Extension URL")

			extensions.forEach((ext) => {
				const name = ext.packageJSON.displayName || ext.id.split(".")[1]
				const id = ext.id
				const url = `https://marketplace.visualstudio.com/items?itemName=${id}`
				rows.push(`"${name}","${id}","${url}"`)
			})

			const csvContent = rows.join("\n")

			const doc = await vscode.workspace.openTextDocument({
				content: csvContent,
				language: "csv",
			})

			vscode.window.showTextDocument(doc)
			vscode.window.showInformationMessage(
				"Extension list CSV opened in new tab!"
			)
		}
	)

	context.subscriptions.push(disposable)
}

export function deactivate() {}
