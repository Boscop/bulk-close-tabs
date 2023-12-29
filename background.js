function announce_close() {
	console.log("closing all youtube tabs")
	chrome.tabs.query({}, function (tabs) {
		var closeable = [];
		for (var i = 0; i < tabs.length; ++i) {
			// console.log(tabs[i]);
			const patterns = [
				"youtube.com/watch?",
				"youtu.be/",
				"google.com/search?",
				"duckduckgo.com/?q=",
			]
			for (const pattern of patterns) {
				if (tabs[i].url.includes(pattern)) {
					console.log("closing tab: " + tabs[i].url);
					closeable.push(tabs[i].id);
				}
			}
		}
		console.log("closing " + closeable.length + " tabs");
		chrome.tabs.remove(closeable);
		console.log("tabs closed");
	});
}
chrome.browserAction.onClicked.addListener(function (tab) {
	announce_close();
});
