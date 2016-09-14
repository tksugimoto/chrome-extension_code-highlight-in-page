
const CONTEXT_MENU_ID_FIRE = "a";

function createContextMenus() {
	chrome.contextMenus.create({
		title: "ページ内のコードをハイライト",
		id: CONTEXT_MENU_ID_FIRE
	});
}

chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.runtime.onStartup.addListener(createContextMenus);

chrome.contextMenus.onClicked.addListener(info => {
	if (info.menuItemId === CONTEXT_MENU_ID_FIRE) {
		const frameId = info.frameId;

		Promise.resolve().then(() => {
			return executeScript("/highlight.js/highlight.pack.js", frameId);
		}).then(() => {
			return executeScript("/highlight-in-pre.js", frameId);
		}).then(() => {
			chrome.tabs.insertCSS({
				frameId: frameId,
				file: "/highlight.js/styles/default.css"
			});
		});
	}
});

function executeScript(filePath, frameId = 0) {
	return new Promise(resolve => {
		chrome.tabs.executeScript({
			frameId: frameId,
			file: filePath
		}, resolve);
	});
}
