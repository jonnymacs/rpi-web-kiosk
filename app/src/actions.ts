import axios from "axios";
import { Dispatch } from "react";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  ORDER_ADD_ITEM,
  ORDER_CLEAR,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_QUEUE_LIST_FAIL,
  ORDER_QUEUE_LIST_REQUEST,
  ORDER_QUEUE_LIST_SUCCESS,
  ORDER_SET_TYPE,
  PAY_SET_METHOD,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REMOVE_FROM_ORDER,
  SELECTED_PRODUCT,
} from "./constants";
import { ActionType, Order, OrderItem, Product } from "./types";

export const setOrderType = (dispatch: Dispatch<ActionType>, orderType: string): void => {
  dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

export const setPayMethod = (dispatch: Dispatch<ActionType>, payMethod: string): void => {
  dispatch({
    type: PAY_SET_METHOD,
    payload: payMethod,
  });
};

export const setCategoryList = async (dispatch: Dispatch<ActionType>): Promise<void> => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      "https://self-order-kiosk-back.vercel.app/api/categories"
    );
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const setProductList = async (
  dispatch: Dispatch<ActionType>,
  categoryName: string = ""
): Promise<void> => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `https://self-order-kiosk-back.vercel.app/api/products?category=${categoryName}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const setSelectedProduct = (dispatch: Dispatch<ActionType>, product: Product): void => {
  dispatch({
    type: SELECTED_PRODUCT,
    payload: product,
  });
};

export const addToOrder = (dispatch: Dispatch<ActionType>, item: OrderItem): void => {
  dispatch({
    type: ORDER_ADD_ITEM,
    payload: item,
  });
};

export const removeFromOrder = (dispatch: Dispatch<ActionType>, productId: string): void => {
  dispatch({
    type: REMOVE_FROM_ORDER,
    payload: productId,
  });
};

export const clearOrder = (dispatch: Dispatch<ActionType>): void => {
  dispatch({
    type: ORDER_CLEAR,
  });
};

export const createOrder = async (dispatch: Dispatch<ActionType>, order: Order): Promise<void> => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
  });
  try {
    const { data } = await axios.post(
      "https://self-order-kiosk-back.vercel.app/api/orders",
      order
    );
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ORDER_CLEAR,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const setOrderList = async (dispatch: Dispatch<ActionType>): Promise<void> => {
  dispatch({ type: ORDER_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      "https://self-order-kiosk-back.vercel.app/api/orders"
    );
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Alias for backward compatibility
export const listOrders = setOrderList;

export const setQueueList = async (dispatch: Dispatch<ActionType>): Promise<void> => {
  dispatch({ type: ORDER_QUEUE_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      "https://self-order-kiosk-back.vercel.app/api/orders/queue"
    );
    dispatch({
      type: ORDER_QUEUE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_QUEUE_LIST_FAIL,
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Alias for backward compatibility
export const listQueue = setQueueList;
