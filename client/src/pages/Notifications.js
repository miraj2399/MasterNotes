import NotificationCenter from "../components/NotificationCenter";
// Notifications component

export default function Notifications() {
    return (
        // Div container with flex layout to center its content vertically and horizontally

        <div className="flex flex-col items-center justify-center">
            {/* Render the NotificationCenter component */}

            <NotificationCenter />
        </div>
    )
}
