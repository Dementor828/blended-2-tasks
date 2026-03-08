import { CURRENT_THEME, setItem } from "./local-storage-api";
import refs from "./refs";

refs.themeChangeBtn.addEventListener('click', function () {
    
    const bodyClasses = refs.body.classList

    if (bodyClasses.contains('theme-dark')) {
        bodyClasses.replace('theme-dark', 'theme-light');
        setItem(CURRENT_THEME, 'theme-light')
    } else {
        bodyClasses.replace('theme-light', 'theme-dark');
        setItem(CURRENT_THEME, 'theme-dark')
    }
    
})