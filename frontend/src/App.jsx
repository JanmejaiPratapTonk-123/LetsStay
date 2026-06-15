import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Footer from "./components/Footer"

function App() {
	return (
		<div className="App">
			<Navbar />
			<Hero />
			<section className="pt-12 flex ">
				<Card />
				<Card />
				<Card />
			</section>
			<Footer />
		</div>
	);
}

export default App;