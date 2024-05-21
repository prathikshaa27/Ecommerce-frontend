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
  username: 'Ramya',
  profile: {
    mobile: '9761245678',
    pincode: '654123',
    address: 'No 7 Main street Chennai',
    addresses: ['No 10 Main street Karur'],
  },
};

const mockCartItems = {
  cart_items: [
    { product_id: 1, name: 'Samsung A30', amount: 18000, quantity: 1 },
    { product_id: 2, name: 'Vivo y21', amount: 20000, quantity: 2 },
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
      expect(screen.getByText('Samsung A30')).toBeInTheDocument();
      expect(screen.getByText('Vivo Y21')).toBeInTheDocument();
      expect(screen.getByText('38000')).toBeInTheDocument();
    });

    
    await waitFor(() => {
      expect(screen.getByText('Ramya')).toBeInTheDocument();
      expect(screen.getByText('9761245678')).toBeInTheDocument();
      expect(screen.getByText('No 7 Main street Chennai')).toBeInTheDocument();
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
      expect(screen.getByText('Samsung A30')).toBeInTheDocument();
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
      target: { value: ' No 7 Main street Chennai' },
    });

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => {
      expect(placeOrder).toHaveBeenCalledWith('No 7 Main street Chennai');
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
