import { useCallback, useContext } from 'react';
import Switchh from 'react-switch';
import { ThemeContext as themeContext } from '../contexts/ThemeContext';
import { ThemeContext } from 'styled-components'
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";


export const Switch = () => {
     const { theme, setTheme } = useContext(themeContext);
     const tm = useContext(ThemeContext);
     const handleTheme = useCallback(() => {
          // Setting the mode preference in localstorage
          if (theme === 'light'){
               window.localStorage.setItem('preference-mode', 'dark');
               setTheme('dark')
          } else {
               window.localStorage.setItem('preference-mode', 'light');
               setTheme('light')
          }
     }, [theme, setTheme]);

     return (
          <Switchh
               checked={theme === 'dark' ? true : false}
               onChange={handleTheme}
               uncheckedIcon={false}
               checkedIcon={false}
               height={15}
               width={40}
               handleDiameter={20}
               onColor={tm.blue}
               offColor={tm.lightGray}
               offHandleColor={tm.medGray}
          />
     )
}