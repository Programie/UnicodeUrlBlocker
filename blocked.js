document.addEventListener("DOMContentLoaded", () => {
    let blockedUrl = new URL(new URL(document.location).searchParams.get("url"));

    document.querySelectorAll(".blocked-domain").forEach(element => element.textContent = blockedUrl.hostname);
    document.querySelector("#blocked-url").textContent = decodeURI(blockedUrl.toString());

    document.querySelector("#goto-blocked-url").addEventListener("click", () => {
        browser.storage.local.get("allowedDomains").then((storageResult) => {
            let allowedDomains = new Set(storageResult.allowedDomains || []);

            allowedDomains.add(blockedUrl.hostname);

            browser.storage.local.set({
                allowedDomains: Array.from(allowedDomains)
            }).then(() => {
                document.location.href = blockedUrl.toString();
            });
        });
    });

    document.querySelector("#go-back").addEventListener("click", () => {
        history.back();
    });
});