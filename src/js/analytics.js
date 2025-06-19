try {
    const script = document.createElement('script');
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = '{"token": "b3d8bf182ab14ad681a46e8b8afa0f43"}';

    script.onerror = () => {
        console.log("Cloudflare Insights script could not be loaded. This may be due to a network issue or an ad-blocker.");
    };
    document.head.appendChild(script);
} catch (error) {
    console.error("Error loading Cloudflare Insights script:", error);
}