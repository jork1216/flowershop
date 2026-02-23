
import './Customer.css';

function Customer() {
  // A simple array of customer data to keep the code clean
const reviews = [
    { id: 1, name: 'Mikoy Sampiano', img: '/images/mikoy.jpg', isCenter: false },
    { id: 2, name: 'Nestor Ptz', img: '/images/nestor.jpg', isCenter: false },
    { id: 3, name: 'Niño Jovan Reyes', img: '/images/nino.jpg', isCenter: true },
    { id: 4, name: 'John Smith', img: '/images/john.jpg', isCenter: false },
    { id: 5, name: 'Miyaka Reyes', img: '/images/miyaka.jpg', isCenter: false },
  ];

  return (
    <div className="customer-section">
      
      {/* 1. Header and Ratings */}
      <div className="header">
        <h2>Real customer stories</h2>
        <div className="rating-summary">
          <span className="stars">★★★★★</span>
          <span className="score">5.00 ★ (9)</span>
          <span className="verified">☑ Verified</span>
        </div>
      </div>

      {/* 2. Image Gallery/Carousel */}
      <div className="carousel">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`card ${review.isCenter ? 'active' : ''}`}
            style={{ backgroundImage: `url(${review.img})` }}
          >
            {/* The gradient overlay with stars and name */}
            <div className="card-overlay">
              <div className="card-stars">★★★★★</div>
              <div className="card-name">{review.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Navigation Arrows */}
      <div className="controls">
        <button className="arrow-btn">{'<'}</button>
        <button className="arrow-btn">{'>'}</button>
      </div>

    </div>
  );
}

export default Customer;