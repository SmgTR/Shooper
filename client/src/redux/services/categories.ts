/* eslint-disable @typescript-eslint/indent */
import { gql } from '@apollo/client';
import { getAllCategories, getCategoryById } from 'redux/slices/categories-slice';

const GET_CATEGORIES = gql`
  query {
    getCategories {
      _id
      name
      category
      children {
        _id
        name
        category
        children {
          _id
          name
          category
          children {
            _id
            name
            category
          }
        }
      }
    }
  }
`;

const GET_CATEGORY = gql`
  query getCategory($id: String!) {
    getCategory(id: $id) {
      name
      _id
      category
    }
  }
`;

export const getCategories =
  () =>
  async (dispatch: any, _: any, { client }: any) => {
    return client
      .query('getCategories', GET_CATEGORIES)
      .then((data: any) => {
        dispatch(getAllCategories(data));
      })
      .catch((e: string) => console.log(e));
  };

export const getCategory =
  (id: String) =>
  async (dispatch: any, _: any, { client }: any) => {
    return client
      .query('getCategory', GET_CATEGORY, { id })
      .then((data: any) => {
        dispatch(getCategoryById(data));
      })
      .catch((e: string) => console.log(e));
  };
