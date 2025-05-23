import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
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
import { AppState, ActionType } from "./types";

type StoreContextType = {
  state: AppState;
  dispatch: Dispatch<ActionType>;
};

export const Store = createContext<StoreContextType>({} as StoreContextType);

const initialState: AppState = {
  ProductList: { loading: true },
  CategoryList: { loading: true },
  SelectedProduct: { selected: {} },
  queueList: { loading: true },
  orderList: { loading: true },
  order: {
    orderType: "Eat In",
    payMethod: "Cash",
    orderItems: [],
  },
  orderCreate: { loading: true },
};

function reducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case SELECTED_PRODUCT:
      return {
        ...state,
        SelectedProduct: { selected: action.payload },
      };
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        ProductList: { loading: true },
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        ProductList: { loading: false, products: action.payload },
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        ProductList: { loading: false, error: action.payload },
      };
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        CategoryList: { loading: true },
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        CategoryList: { loading: false, categories: action.payload },
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        CategoryList: { loading: false, error: action.payload },
      };
    case ORDER_ADD_ITEM:
      const item = action.payload;
      const existItem = state.order.orderItems.find((x) => x._id === item._id);
      const orderItems = existItem
        ? state.order.orderItems.map((x) =>
            x._id === existItem._id ? item : x
          )
        : [...state.order.orderItems, item];

      return {
        ...state,
        order: { ...state.order, orderItems },
      };
    case REMOVE_FROM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          orderItems: state.order.orderItems.filter(
            (x) => x._id !== action.payload
          ),
        },
      };
    case ORDER_CLEAR:
      return {
        ...state,
        order: {
          ...state.order,
          orderItems: [],
        },
      };
    case ORDER_SET_TYPE:
      return {
        ...state,
        order: { ...state.order, orderType: action.payload },
      };
    case PAY_SET_METHOD:
      return {
        ...state,
        order: { ...state.order, payMethod: action.payload },
      };
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        orderCreate: { loading: true },
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderCreate: { loading: false, success: true, order: action.payload },
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        orderCreate: { loading: false, error: action.payload },
      };
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        orderList: { loading: true },
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: { loading: false, orders: action.payload },
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        orderList: { loading: false, error: action.payload },
      };
    case ORDER_QUEUE_LIST_REQUEST:
      return {
        ...state,
        queueList: { loading: true },
      };
    case ORDER_QUEUE_LIST_SUCCESS:
      return {
        ...state,
        queueList: { loading: false, queue: action.payload },
      };
    case ORDER_QUEUE_LIST_FAIL:
      return {
        ...state,
        queueList: { loading: false, error: action.payload },
      };
    default:
      return state;
  }
}

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
