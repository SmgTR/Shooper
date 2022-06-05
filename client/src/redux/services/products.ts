/* eslint-disable @typescript-eslint/indent */
import { gql } from '@apollo/client';

import { setAllProducts, uploadPhoto } from 'redux/slices/products-slice';

const GET_PRODUCTS = gql`
  query {
    products {
      productId
      name
      description
      createdAt
      categories {
        _id
        name
        category
        parent
      }
      ean
      image
      brand
      quantity
      status
      price
    }
  }
`;

const UPLOAD_PRODUCT_PHOTO = async (file: any) => {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTJiMzQwNjRkYTkzMzY5ODcyMDIzZCIsImlhdCI6MTY0OTU5NzQ3NSwiZXhwIjoxNjQ5NjAxMDc1fQ.TXuQr4GO9vvuq_amUu4cmwDMYdLGTL5wab16t-4feNI'
  );
  myHeaders.append(
    'Cookie',
    'auth_cookie=j%3A%7B%22accessToken%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTJiMzQwNjRkYTkzMzY5ODcyMDIzZCIsImlhdCI6MTY0OTU5NzQ3NSwiZXhwIjoxNjQ5NjAxMDc1fQ.TXuQr4GO9vvuq_amUu4cmwDMYdLGTL5wab16t-4feNI%22%2C%22refreshToken%22%3A%220TDsIJ8J05WsA3H0%22%7D'
  );

  const formdata = new FormData();
  formdata.append(
    'operations',
    '{"query":"mutation updateProductPhoto($file:Upload! ) {\\n  uploadProductPhoto(file: $file)\\n}"}'
  );
  formdata.append('map', '{"0": ["variables.file"]}');
  formdata.append('0', file, 'file');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata
  };

  fetch('\nhttp://localhost:5000/graphql', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

const GET_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      productId
      name
      brand
      description
      createdAt
      price
      priceWithTax
      priceWithoutTax
      tax
      categories {
        _id
        name
        category
        parent
      }
      image
      quantity
      status
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation editProducts($editProductsInput: ProductsInList) {
    name
  }
`;

export const getAllProducts =
  (sort?: string) =>
  async (dispatch: any, _: any, { client }: any) => {
    return client
      .query('products', GET_PRODUCTS)
      .then((data: any) => dispatch(setAllProducts(data)))
      .catch((e: string) => console.log(e));
  };

export const getProduct =
  (id: String) =>
  async (dispatch: any, _: any, { client }: any) => {
    return client.query('product', GET_PRODUCT, { id }).then((data: any) => data);
  };

export const editProduct =
  (product: any) =>
  async (dispatch: any, _: any, { client }: any) => {
    return client.mutate('product', EDIT_PRODUCT, { product }).then((data: any) => data);
  };

export const uploadProductPhoto = (photo: any) => async (dispatch: any) => {
  dispatch(uploadPhoto('dada'));
  return UPLOAD_PRODUCT_PHOTO(photo);
};
