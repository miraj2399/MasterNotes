
import GroupSection from '../components/GroupSection'
import PersonalSpaceSection from '../components/PersonalSpaceSection'
import Cookies from 'js-cookie';
export default function Dashboard (){
    const handleLogout = () => {
        Cookies.remove('token')
        window.location.href = "/login"
    }
    return (
        <>
        <div className='grid gap-20 bg-white'>
        <GroupSection/>
        <PersonalSpaceSection/>
        </div>
        </>
    )
}