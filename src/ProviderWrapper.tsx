import React from 'react';
import { Provider, themes, ThemeInput } from '@stardust-ui/react';
import App from './App';

enum themeTypes{
    Dark='dark',
    Default='default',
    Contrast='contrast'
};

// wraps provider component so that theme can be held in state
export class ProviderWrapper extends React.Component<any, any>{

    constructor(props: any){
        super(props);
        //theme from params
        var url:string = window.location.href;
        var theme: string = this.getThemeFromURL(url);
        this.state = {
            currentTheme: this.getTheme(theme)
        }
    }

    render(){
        return (
            <Provider theme={this.state.currentTheme}> 
                <App onThemeChange={this.handleThemeChange}/>
            </Provider>
        );
    }

    // gets theme name from url params
    public getThemeFromURL(url: string): string{
        var indexOfEquals: number = url.indexOf("=");
        if(indexOfEquals <= 0){ // no equals
            return 'default';
        }
        var subs = url.substring(indexOfEquals+1);

        return subs;
    }

    //gets theme from a string
    public getTheme(theme:string){
        var newTheme:ThemeInput = themes.teams;
    
        if(theme === themeTypes.Contrast){
            newTheme = themes.teamsHighContrast;
        }
    
        if(theme === themeTypes.Dark){
            newTheme = themes.teamsDark;
        }

        return newTheme;
    }

    //handler for change in theme
    public handleThemeChange = (theme:string) =>{
        this.setState({currentTheme: this.getTheme(theme)});
    }

}