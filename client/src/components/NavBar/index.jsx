import { NavBarContainer } from './styles'
import Icon from '../../assets/logout.png'
import { useHistory } from 'react-router'
import backIcon from '../../assets/back-arrow.png'
import { destroyCookie } from 'nookies'
import Switch from 'react-switch'
import { useCallback, useContext, useState, useRef } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

export const NavBar = ({
    isProfile, 
    imgUrl, 
    username
}) => {
    const history = useHistory();

    const { theme, setTheme } = useContext(ThemeContext);
    console.log(theme)


    const handleTheme = useCallback(() => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }, [theme])
 
    const handleLogout = async () => {
        await destroyCookie(null, 'access-token')
        history.push('/')
    }
    return (
        <NavBarContainer isDark={theme === 'dark' ? true : false}>
            {isProfile && 
                <a href="/home">
                    <img src={backIcon} alt="back-icon" class="backIcon"/>
                </a>
            }
            <div className="profile" onClick={() => history.push('/profile')}>
                <img src={imgUrl} alt="ImageProfile" />
                <p className="username">{username}</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '24px'}}className="logout" onClick={() => handleLogout()}>
                    <img src={Icon} alt="" />
                    <p>logout</p>
                </div>
                <Switch
                   checked={theme === 'dark' ? true : false}
                   onChange={handleTheme}
                />
            </div>
        </NavBarContainer>
    )
}