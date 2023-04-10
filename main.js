// initialize setting
chrome.runtime.onInstalled.addListener((details) => {
    if(details.reason == 'install') {
        // set initial settings upon extension install
        chrome.storage.local.set({enable: true});
    }
})

// watch for changes and apply accordingly
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        if(changes.enable.newValue) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ['shorts_to_watch_url_converter']
            });
            chrome.tabs.onUpdated.addListener(eventListener);
        } else {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ['shorts_to_watch_url_converter']
            });
            chrome.tabs.onUpdated.removeListener(eventListener);
        }
    }
})

// watch for skipped requests and refresh the tab to trigger the ruleset
let eventListener = (tabID, changeInfo, tab) => {
    const shortsRegex = "^.*://.*youtube\\.com/shorts/(.+)"
    if(changeInfo.status == 'complete' && tab.url.match(shortsRegex)) {
        chrome.tabs.reload(tabID);
    }
}