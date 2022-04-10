import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: {
    brand: '',
    createdAt: new Date(),
    description: '',
    productId: '',
    image: [''],
    name: '',
    quantity: 0,
    price: 0,
    priceWithTax: 0,
    priceWithoutTax: 0,
    tax: 0,
    ean: '',
    status: '',
    availableOptions: [
      {
        size: '',
        color: ''
      }
    ],
    categories: {
      name: '',
      _id: '',
      category: '',
      parent: ''
    }
  },
  error: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts(state, { payload }) {
      state.products = payload;
    },

    updateProduct(state, { payload }) {
      state.product = { ...state.product, ...payload };
    },

    uploadPhoto(state, { payload }) {
      state.product.image.push(payload);
    },

    setProduct(state, { payload }) {
      state.product = payload;
    },

    setErrorMessage(state, { payload }) {
      state.error = payload;
    }
  }
});

export const { setAllProducts, setErrorMessage, setProduct, updateProduct, uploadPhoto } =
  productsSlice.actions;

export default productsSlice.reducer;
