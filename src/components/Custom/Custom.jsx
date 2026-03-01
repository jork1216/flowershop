import { Link } from "react-router-dom";
import "./Custom.css";
import bouquetImage from "../../assets/kiss.jpg";

function Custom() {
    return (
        <div className="custom-section">
            <div className="custom-container">
                <div className="custom-content">
                    <span className="custom-label">CUSTOMIZED BOUQUET</span>
                    
                    <h1 className="custom-title">
                        Design YOUR <br />Own Bouquet!
                    </h1>
                    
                    <p className="custom-description">
                        Can’t find the perfect match? Work one-on-one with us to create a 
                        one-of-a-kind arrangement. Choose your favorite blooms, color palette, 
                        and premium wrappers to make your gift truly personal.
                    </p>

                    <div className="custom-actions">
                        <Link to="/request" className="cbtn cbtn-solid">REQUEST NOW</Link>
                        <Link to="/learn-more" className="cbtn cbtn-outline">LEARN MORE</Link>
                    </div>
                </div>

                <div className="custom-image-wrapper">
                    <img src={bouquetImage} alt="Customized red rose bouquet" className="custom-image" />
                </div>
            </div>
        </div>
    );
}

export default Custom;