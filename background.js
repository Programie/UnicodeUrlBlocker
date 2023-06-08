function isBadUrl(url) {
    let parsedUrl = new URL(url);

    // Remove path, query string and fragment, so they are not checked for bad characters
    parsedUrl.pathname = "";
    parsedUrl.search = "";
    parsedUrl.hash = "";

    // New URL only containing the base URL with potential bad characters
    url = decodeURI(parsedUrl.toString());

    for (let index = 0; index < url.length; index++) {
        let charCode = url.charCodeAt(index);

        // Check if this character is outside the allowed character range
        if (charCode < 32 || charCode > 255) {
            return true;
        }
    }

    return false;
}

function onBeforeRequest(requestDetails) {
    let url = requestDetails.url;

    if (isBadUrl(url)) {
        browser.browserAction.setBadgeBackgroundColor({"color": "red"});
        browser.browserAction.setBadgeText({text: "BLK"});
        browser.browserAction.setTitle({title: `Request Blocked: ${url}`});
        console.log(`Request Blocked: ${url}`);

        return {
            cancel: true
        };
    }

    browser.browserAction.setBadgeBackgroundColor({"color": "green"});
    browser.browserAction.setBadgeText({text: ""});
    browser.browserAction.setTitle({title: ""});
}

browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequest,
    {urls: ["<all_urls>"]},
    ["blocking"]
);