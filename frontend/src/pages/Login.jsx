import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="text-center pt-12">
                <h1 className="text-4xl">
                    Login
                </h1>

                <p className="text-2xl">
                    Login to access your account.
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default Login;