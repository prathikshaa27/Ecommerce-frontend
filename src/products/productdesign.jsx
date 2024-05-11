import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="col" key={product.id}>
      <div className="card h-100">
        <Link to={`/products/${product.id}`} className="card-link">
          <img src={product.image_url} className="card-img-top" alt={product.product_name} style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{product.product_name}</h5>
            <p className="card-text">Price: ${product.amount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
