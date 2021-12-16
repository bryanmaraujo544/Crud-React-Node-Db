import { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext('');

export const ThemeContextProvider = ({children}) => {
     const userPreferenceMode = window.localStorage.getItem('preference-mode');
     // const deviceModeIsDark = window.matchMedia('(prefers-color-scheme: dark)');
     
     // If the user has no preference mode setted in the localStorage, the default theme is light
     const [theme, setTheme] = useState(userPreferenceMode === null ? 'light' : userPreferenceMode);

     return (
          <ThemeContext.Provider value={{theme, setTheme}}>
               {children}
          </ThemeContext.Provider>
     )
}