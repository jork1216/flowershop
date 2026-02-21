
import "./BestSeller.css"; // Import the CSS file

function BestSeller() {
  // Array of objects holding the details for each product
  const products = [
    { id: 1, name: "Wine", price: "P890.00", oldPrice: "P990.00" },
    { id: 2, name: "Blush", price: "P890.00", oldPrice: "P990.00" },
    { id: 3, name: "Flamingo", price: "P890.00", oldPrice: "P990.00" },
    { id: 4, name: "Kiss", price: "P1,890.00", oldPrice: "P1,990.00" },
    { id: 5, name: "Cherry", price: "P2,890.00", oldPrice: "P2,990.00" },
    { id: 6, name: "Dream", price: "P1,890.00", oldPrice: "P1,990.00" },
  ];

  return (
    <div className="best-seller-section">
      
      {/* Top Header Row */}
      <div className="header">
        <h2 className="title">Best Seller</h2>
        <button className="see-all-btn">SEE ALL COLLECTIONS</button>
      </div>

      {/* Product Cards Row */}
      <div className="product-list">
        {/* We use .map() instead of a for loop. It's the standard way to list items in React */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            
            <div className="image-box">
              <span className="sale-badge">Sale</span>
              
              {/* This is a placeholder for your actual images */}
              <div className="image-placeholder"></div>
            </div>

            <h3 className="product-name">{product.name}</h3>
            
            <div className="price-row">
              <span className="current-price">{product.price}</span>
              <span className="old-price">{product.oldPrice}</span>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}

export default BestSeller;