// combined-script.js
(function () {
    // window.addEventListener("load", () => console.log("Google Analytics: " + document.title));
    // console.log("Google Analytics: " + document.title)
    const isDeveloperMode = new URLSearchParams(window.location.search).get("developer") === "true";

    // Load Google Analytics if not in developer mode
    if (!isDeveloperMode) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-2466715FY8";
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-2466715FY8");

        console.log("Google Analytics loaded");
    } else console.log("Developer Mode - Google Analytics skipped");

    // Else, Developer Mode is active - update all links and iframes to include "developer=true" in the URL
    if (isDeveloperMode) {
        const showConsoleLogs = false;
        // Update all links to include "developer=true" in the URL when clicked
        function handleLinks() {
            if (showConsoleLogs) console.log("Processing links...");
            const links = document.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                links[i].addEventListener("click", function (event) {
                    event.preventDefault();
                    const originalURL = new URL(this.href);
                    originalURL.searchParams.set("developer", "true");
                    window.location.href = originalURL.toString();
                });
                if (showConsoleLogs) console.log(links[i].href);
            }
            if (showConsoleLogs) console.log("Links processed");
        }

        // Run the functions when the page loads
        window.addEventListener("load", function () {
            if (showConsoleLogs) console.log("Developer mode active...");
            handleLinks();
            if (showConsoleLogs) console.log("Developer mode activated");
        });
    }
})();
