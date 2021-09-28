import './styles.scss'
import Icon from '../../assets/logout.png'
import { useHistory } from 'react-router'
import backIcon from '../../assets/back-arrow.png'
import { destroyCookie } from 'nookies'

export const NavBar = ({
    isProfile, 
    imgUrl, 
    username
}) => {
    const history = useHistory()
 
    const handleLogout = async () => {
        await destroyCookie(null, 'access-token')
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
                <img src={imgUrl} alt="ImageProfile" />
                <p className="username">{username}</p>
            </div>
            <div className="logout" onClick={() => handleLogout()}>
                <img src={Icon} alt="" />
                <p>logout</p>
            </div>
            
        </header>
    )
}