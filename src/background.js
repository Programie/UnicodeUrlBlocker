import * as browser from "webextension-polyfill";

let allowedDomains = new Set();

function updateAllowedDomains() {
    browser.storage.local.get("allowedDomains").then((storageResult) => {
        allowedDomains = new Set(storageResult.allowedDomains || []);
    });
}

function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}

function isBadUrl(url) {
    let parsedUrl = new URL(url);

    if (allowedDomains.has(parsedUrl.hostname)) {
        return false;
    }

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

function redirectToUrl(tabId, url) {
    if (isFirefox()) {
        // Workaround for Firefox as we can't use redirectUrl to redirect to a moz-extension URL
        browser.tabs.update(tabId, {
            url: url
        });

        return {
            cancel: true
        };
    } else {
        return {
            redirectUrl: url
        };
    }
}

function onBeforeRequest(requestDetails) {
    let url = requestDetails.url;

    if (isBadUrl(url)) {
        let redirectUrl = new URL(browser.runtime.getURL("block-page/index.html"));
        redirectUrl.searchParams.set("url", url);

        return redirectToUrl(requestDetails.tabId, redirectUrl.toString());
    }
}

updateAllowedDomains();
browser.storage.onChanged.addListener(updateAllowedDomains);

browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequest,
    {urls: ["<all_urls>"]},
    ["blocking"]
);