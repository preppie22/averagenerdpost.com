function initialize_theme() {
    let theme = localStorage.getItem('data-theme');

    if (!theme) {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('data-theme', theme);
    }

    document.documentElement.setAttribute('data-theme', theme);
};
function toggle_light_mode() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("data-theme", newTheme);
    root.setAttribute("data-theme", newTheme);
}