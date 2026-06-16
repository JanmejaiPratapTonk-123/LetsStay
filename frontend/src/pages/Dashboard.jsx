import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="text-center pt-12">
                <h1 className="text-4xl">
                    Dashboard
                </h1>

                <p className="text-2xl">
                    Manage your bookings and stays.
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;