import customer1 from '../../assets/customers/customer1.jpg';
import customer2 from '../../assets/customers/customer2.jpg';
import customer3 from '../../assets/customers/customer3.jpg';
import customer4 from '../../assets/customers/customer4.jpg';
import customer5 from '../../assets/customers/customer5.jpg';
import customer6 from '../../assets/customers/customer6.jpg';
import './Customer.css';
import { useState } from 'react';

function Customer() {
  // A simple array of customer data to keep the code clean
  const reviews = [
      { id: 1, name: 'Mikey Sam', img: customer1, isCenter: false },
      { id: 2, name: 'Nessy Ptz', img: customer2, isCenter: false },
      { id: 3, name: 'Niño John Reyes', img: customer3, isCenter: true },
      { id: 4, name: 'Jake Smith', img: customer4, isCenter: false },
      { id: 5, name: 'Mimi Reyes', img: customer5, isCenter: false },
      { id: 6, name: 'John Doe', img: customer6, isCenter: false },
  ];

  // Track which card is currently in the center
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  // Show only 5 cards centered around the active index
  const getVisibleReviews = () => {
    const visible = [];
    for (let offset = -2; offset <= 2; offset++) {
      const index = (activeIndex + offset + reviews.length) % reviews.length;
      visible.push({ ...reviews[index], isCenter: offset === 0 });
    }
    return visible;
  };


  return (
    <div className="customer-section">
      
      {/* 1. Header and Ratings */}
      <div className="cs-header">
        <h2>REAL CUSTOMER STORIES</h2>
        <div className="rating-summary">
          <span className="stars">★★★★★</span>
          <span className="score"> 5.00 (5)</span>
          <span className="verified"> ☑  Verified</span>
        </div>
      </div>

 {/* 2. Carousel with flanking arrows */}
      <div className="carousel-wrapper">
        <button className="arrow-btn" onClick={handlePrev}>‹</button>

        <div className="carousel">
          {getVisibleReviews().map((review, i) => (
            <div
              key={i}
              className={`card ${review.isCenter ? 'active' : ''}`}
              style={{ backgroundImage: `url(${review.img})` }}
            >
              <div className="card-overlay">
                <div className="card-stars">★★★★★</div>
                <div className="card-name">{review.name}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn" onClick={handleNext}>›</button>
      </div>

    </div>
  );
}

export default Customer;