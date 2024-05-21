import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartPage from '@product/cart';
import { fetchCartProducts, removeFromCart, placeOrder, fetchUserProfile } from '@services/api'


jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../services/api', () => ({
  fetchCartProducts: jest.fn(),
  removeFromCart: jest.fn(),
  placeOrder: jest.fn(),
  fetchUserProfile: jest.fn(),
}));

const mockUserProfile = {
  username: 'John Doe',
  profile: {
    mobile: '1234567890',
    pincode: '123456',
    address: '123 Main St',
    addresses: ['123 Main St', '456 Secondary St'],
  },
};

const mockCartItems = {
  cart_items: [
    { product_id: 1, name: 'Product 1', amount: 10, quantity: 1 },
    { product_id: 2, name: 'Product 2', amount: 20, quantity: 2 },
  ],
  total_amount: 50,
};

describe('CartPage', () => {
  beforeEach(() => {
    fetchCartProducts.mockResolvedValue(mockCartItems);
    fetchUserProfile.mockResolvedValue(mockUserProfile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart items and user profile correctly', async () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );


    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('$50')).toBeInTheDocument();
    });

    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
    });
  });

  test('handles remove from cart correctly', async () => {
    removeFromCart.mockResolvedValue();

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(removeFromCart).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Product removed from cart successfully!');
    });
  });

  test('handles place order correctly', async () => {
    placeOrder.mockResolvedValue();

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Select Delivery Address')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Select Delivery Address'), {
      target: { value: '123 Main St' },
    });

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => {
      expect(placeOrder).toHaveBeenCalledWith('123 Main St');
      expect(toast.success).toHaveBeenCalledWith('Order placed successfully!');
    });
  });

  test('shows error if delivery address is not selected', async () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Place Order')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please select a delivery address.');
    });
  });
});
