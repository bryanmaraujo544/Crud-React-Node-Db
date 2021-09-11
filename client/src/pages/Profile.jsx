import { NavBar } from '../components/NavBar'
import '../styles/Profile.scss'
export const Profile = () => {
    const userLocal = JSON.parse(window.localStorage.getItem('user'))

    return (
        <div className="profile-container">
            <NavBar
                isProfile
            />
        </div>
    )
}