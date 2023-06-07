function checkUrl(requestDetails) {
    let url = decodeURI(requestDetails.url);

    for (let index = 0; index < url.length; index++) {
        let charCode = url.charCodeAt(index);

        if (charCode < 32 || charCode > 255) {
            browser.browserAction.setBadgeBackgroundColor({"color": "red"});
            browser.browserAction.setBadgeText({text: "BLK"});
            browser.browserAction.setTitle({title: `Request Blocked: ${url}`});
            console.log(`Request Blocked: ${url}`);
            return {
                cancel: true
            };
        }
    }

    browser.browserAction.setBadgeBackgroundColor({"color": "green"});
    browser.browserAction.setBadgeText({text: ""});
    browser.browserAction.setTitle({title: ""});
}

browser.webRequest.onBeforeRequest.addListener(
    checkUrl,
    {urls: ["<all_urls>"]},
    ["blocking"]
);