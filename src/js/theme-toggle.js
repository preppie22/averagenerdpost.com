// function updateThemeIcon(theme) {
//     const icon = document.getElementById('light-mode-icon');
//     if (theme === 'dark') {
//         icon.src = '/assets/icons/dark-mode-moon.svg';
//         icon.alt = 'Switch to light mode';
//     } else {
//         icon.src = '/assets/icons/light-mode-sun.svg';
//         icon.alt = 'Switch to dark mode';
//     }
// }

function initialize_theme() {
    let theme = localStorage.getItem('data-theme');

    if (!theme) {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('data-theme', theme);
    }

    document.documentElement.setAttribute('data-theme', theme);
    // updateThemeIcon(theme);
};

function toggle_light_mode() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("data-theme", newTheme);
    root.setAttribute("data-theme", newTheme);
    // updateThemeIcon(newTheme);
}