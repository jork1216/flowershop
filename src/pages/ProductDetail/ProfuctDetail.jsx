import { useParams, Link } from 'react-router-dom';

const ProductDetail = ({ allProducts }) => {
  // 1. Grab the ID from the URL (e.g., /product/5)
  const { id } = useParams();

  // 2. Find the product in your data array that matches the ID
  // Note: useParams returns a string, so we convert it to a number if your IDs are numbers
  const product = allProducts.find((p) => String(p.id) === id);

  // 3. Handle cases where the product doesn't exist (e.g., manual URL typing)
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Link box-className="back-link" to="/">← Back to products</Link>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          {product.soldOut && <span className="badge badge-soldout">Sold out</span>}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="price-container">
            <span className="current-price">{product.price}</span>
            {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
          </div>

          <p className="product-description">
            {product.description || "Beautiful hand-picked flowers perfect for any occasion."}
          </p>

          <div className="product-actions">
            <input type="number" min="1" defaultValue="1" className="qty-input" />
            <button 
              className="add-to-cart-btn" 
              disabled={product.soldOut}
            >
              {product.soldOut ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;