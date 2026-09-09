import './ProductList.css';

export default function ProductList({ products }) {
  return (
    <div className="pl-container">
      <h2 className="pl-heading">Product List</h2>
      <div className="pl-list">
        {products.map(product => (
          <div key={product.id} className="pl-item">
            <img src={product.thumbnail} alt={product.title} className="pl-image" />
            <span className="pl-title">{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
