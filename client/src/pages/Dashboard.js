
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
        <div className='grid gap-10 divide-y'> {/* cyan background? */}
            <h1 className='hover:text-gray-600 text-gray-800 text-4xl text-center font-extralight m-10'>RU NOTES</h1>
        <GroupSection/>
        <PersonalSpaceSection/>
        </div>
        </>
    )
}