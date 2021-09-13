import './styles.scss'
import Icon from '../../assets/logout.png'
import { useHistory } from 'react-router'
import backIcon from '../../assets/back-arrow.png'

export const NavBar = ({isProfile}) => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'))
    const history = useHistory()

 
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        history.push('/')
    }
    return (
        <header>
            {isProfile && 
                <a href="/home">
                    <img src={backIcon} alt="back-icon" class="backIcon"/>
                </a>
            
            }
            <div className="profile" onClick={() => history.push('/profile')}>
                <img src={userLocal?.users_imageurl} alt="ImageProfile" />
                <p className="username">{userLocal?.users_username}</p>
            </div>
            <div className="logout" onClick={() => handleLogout()}>
                <img src={Icon} alt="" />
                <p>logout</p>
            </div>
            
        </header>
    )
}