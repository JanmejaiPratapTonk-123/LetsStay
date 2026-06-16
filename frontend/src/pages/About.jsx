import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="text-center pt-12">
                <h1 className="text-4xl">
                    About us
                </h1>

                <p className="text-2xl">
                    Learn more about LetsStay and out mission.
                </p>
            </div>
            
            <Footer />
        </div>
    );
}

export default About;