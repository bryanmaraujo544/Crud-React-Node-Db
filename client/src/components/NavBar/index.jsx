import { NavBarContainer } from './styles'
import Icon from '../../assets/logout.png'
import { useHistory } from 'react-router'
import backIcon from '../../assets/back-arrow.png'
import { destroyCookie } from 'nookies'
import { Switch } from '../Switch'
import { useCallback, useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

export const NavBar = ({
    isProfile, 
    imgUrl, 
    username
}) => {

    const history = useHistory();
    const { theme } = useContext(ThemeContext);
 
    const handleLogout = async () => {
        await destroyCookie(null, 'access-token');
        history.push('/')
        window.location.reload();
    }
    return (
        <NavBarContainer isDark={theme === 'dark' ? true : false}>
            {isProfile && 
                <img src={backIcon} onClick={() => history.push('/home')} alt="back-icon" class="backIcon"/>
                
            }
            <div className="profile" onClick={() => history.push('/profile')}>
                <img src={imgUrl} alt="" />
                <p className="username">{username}</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '24px'}} className="logout" onClick={() => handleLogout()}>
                    <img src={Icon} alt="" />
                    <p>logout</p>
                </div>
                <Switch
                />
            </div>
        </NavBarContainer>
    )
}