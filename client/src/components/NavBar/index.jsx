import './styles.scss'
import Icon from '../../assets/logout.png'

export const NavBar = ({imgUrl, username}) => {
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        window.location.reload()
    }
    return (
        <header>
            <div className="profile">
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