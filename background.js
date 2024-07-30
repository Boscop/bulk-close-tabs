function announce_close() {
	chrome.tabs.query({}, tabs => {
		console.log("open tabs", tabs.length);
		console.log("pinned tabs:");
		var unpinned_tab_ids = [];
		tabs.forEach(tab => {
			if (tab.pinned) {
				console.log(tab.id, tab.title, tab.url);
			} else {
				unpinned_tab_ids.push(tab.id);
			}
		});
		console.log("closing", unpinned_tab_ids.length, "unpinned tabs");
		chrome.tabs.remove(unpinned_tab_ids);
		console.log("unpinned tabs closed");
	});
	// chrome.tabs.query({}, function (tabs) {
	// 	console.log("bulk closing tabs");
	// 	var closeable = [];
	// 	for (var i = 0; i < tabs.length; ++i) {
	// 		// console.log(tabs[i]);
	// 		const patterns = [
	// 			"youtube.com/watch?",
	// 			"youtu.be/",
	// 			"google.com/search?",
	// 			"duckduckgo.com/?q=",
	// 			"https://twitter.com/",
	// 			"spotify.com/",
	// 			"soundcloud.com/",
	// 		]
	// 		for (const pattern of patterns) {
	// 			if (tabs[i].url.includes(pattern)) {
	// 				console.log("closing tab: " + tabs[i].url);
	// 				closeable.push(tabs[i].id);
	// 			}
	// 		}
	// 	}
	// 	console.log("closing " + closeable.length + " tabs");
	// 	chrome.tabs.remove(closeable);
	// 	console.log("tabs closed");
	// });

	/* chrome.windows.getAll({ populate: true }, function (windows) {
		console.log("bulk closing windows", windows.length);
		var maxWidth = 0;
		var maxHeight = 0;
		for (const window of windows) {
			if (window.width > maxWidth) {
				maxWidth = window.width;
			}
			if (window.height > maxHeight) {
				maxHeight = window.height;
			}
		}
		console.log("max window size:", maxWidth, maxHeight);

		const closeable = [];
		for (const window of windows) {
			if (window.type === "normal") {
				if (window.width < maxWidth || window.height < maxHeight) {
					const tab = window.tabs[0];
					console.log("keeping window:", window.type, window.id, tab.title, tab.url);
				} else {
					closeable.push(window.id);
				}
			}
		}
		console.log("closing " + closeable.length + " windows");
		for (const id of closeable) {
			chrome.windows.remove(id, function () {
				console.log("window closed:", id);
			});
		}
		console.log("windows closed");
	}); */
}
chrome.browserAction.onClicked.addListener(function (tab) {
	announce_close();
});
