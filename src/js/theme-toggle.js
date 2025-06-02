window.addEventListener("DOMContentLoaded", (event) => {
    var page = document.getElementsByTagName("body")[0];
    const currentTheme = localStorage.getItem("data-theme") ? localStorage.getItem("data-theme") : null;
    if (currentTheme == "dark") {
        page.setAttribute('data-theme','dark');
    } else  if (currentTheme == "light") {
        page.setAttribute('data-theme', 'light');
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            page.setAttribute('data-theme', 'dark');
            localStorage.setItem('data-theme', 'dark');
        } else {
            page.setAttribute('data-theme', 'light');
            localStorage.setItem('data-theme', 'light');
        }
    }
});

function toggle_light_mode() {
    var app = document.getElementsByTagName("BODY")[0];
    const currentTheme = localStorage.getItem("data-theme");
    if (currentTheme == "dark") {
        localStorage.setItem("data-theme", "light");
        app.setAttribute("data-theme", "light");
    } else {
        localStorage.setItem("data-theme", "dark");
        app.setAttribute("data-theme", "dark");
    }		
}