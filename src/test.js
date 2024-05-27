import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';

jest.mock('../../services/products', () => ({
  getProductDetails: jest.fn(() => Promise.resolve({
    product_name: 'Test Product',
    amount: 100,
    image_url: 'test-image-url',
    description: 'Test description'
  }))
}));

describe('ProductDetailPage component', () => {
  it('renders product details correctly', async () => {
    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('Description: Test description')).toBeInTheDocument();
    });
  });

  it('adds product to cart when "Add to Cart" button is clicked', async () => {
    render(
      <Router>
        <ProductDetailPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Add to Cart'));
    await waitFor(() => {
      expect(screen.getByText('Product added to cart successfully!')).toBeInTheDocument();
    });
  });
});
