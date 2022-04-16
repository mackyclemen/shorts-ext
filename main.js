// watch for changes and apply accordingly
chrome.storage.onChanged.addListener((changes, area) => {
    console.log("storage changed", changes, area);
    if (area === 'local') {
        if(changes.enable.newValue) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ['shorts_to_watch_url_converter']
            });
        } else {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ['shorts_to_watch_url_converter']
            });
        }
    }
})