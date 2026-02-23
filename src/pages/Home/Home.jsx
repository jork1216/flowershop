import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import BestSeller from "../../components/BestSeller/BestSeller";
import Custom from "../../components/Custom/Custom";
import Customer from "../../components/Customer/Customer.jsx";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <BestSeller />
            <Custom />
            <Customer />
            <Footer />
        </div>
    );
}

export default Home;