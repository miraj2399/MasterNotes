
import GroupSection from '../components/GroupSection'
import PersonalSpaceSection from '../components/PersonalSpaceSection'
import Cookies from 'js-cookie';
// Define and export the Dashboard component

export default function Dashboard() {
    // Function to handle user logout

    const handleLogout = () => {
        // Remove the 'token' cookie

        Cookies.remove('token')
        // Redirect the user to the login page

        window.location.href = "/login"
    }

    // JSX structure for rendering the Dashboard UI

    return (
        <>
            <div className='grid gap-10 divide-y'> {/* cyan background? */}
                <h1 className='animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black hover:text-blue-900 m-16 flex items-center justify-center'>RU NOTES</h1>
                <GroupSection />
                <PersonalSpaceSection />
            </div>
        </>
    )
}
