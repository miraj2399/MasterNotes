
// Importing necessary components and dependencies
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
            <div className='grid gap-20 bg-white'>
                <GroupSection />
                <PersonalSpaceSection />
            </div>
        </>
    )
}