import { themes, ThemeInput } from '@stardust-ui/react';

enum themeTypes{
    Dark='dark',
    Default='default',
    Contrast='contrast'
};

// gets theme name from url params
export const getThemeFromURL = (url: string): string => {
    var indexOfEquals: number = url.indexOf("=");
    if(indexOfEquals <= 0){ // no equals
        return 'default';
    }
    var subs = url.substring(indexOfEquals+1);

    return subs;
}

// gets theme type from string
export const getTheme = (theme:string):ThemeInput => {
    var newTheme:ThemeInput = themes.teams;
    
    if(theme === themeTypes.Contrast){
        newTheme = themes.teamsHighContrast;
    }
    
    if(theme === themeTypes.Dark){
        newTheme = themes.teamsDark;
    }

    return newTheme;
}
