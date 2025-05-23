// Define types for our application state and actions
export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  category: string;
  [key: string]: any;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  [key: string]: any;
}

export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
}

export interface Order {
  orderType: string;
  payMethod: string;
  orderItems: OrderItem[];
  totalPrice?: number;
  taxPrice?: number;
  orderNumber?: number;
  status?: string;
  [key: string]: any;
}

export interface AppState {
  ProductList: {
    loading: boolean;
    error?: string;
    products?: Product[];
  };
  CategoryList: {
    loading: boolean;
    error?: string;
    categories?: Category[];
  };
  SelectedProduct: {
    selected: Product | Record<string, never>;
  };
  queueList: {
    loading: boolean;
    error?: string;
    queue?: Order[];
  };
  orderList: {
    loading: boolean;
    error?: string;
    orders?: Order[];
  };
  order: Order;
  orderCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    order?: Order;
  };
}

export type ActionType =
  | { type: 'ORDER_SET_TYPE'; payload: string }
  | { type: 'PAY_SET_METHOD'; payload: string }
  | { type: 'CATEGORY_LIST_REQUEST' }
  | { type: 'CATEGORY_LIST_SUCCESS'; payload: Category[] }
  | { type: 'CATEGORY_LIST_FAIL'; payload: string }
  | { type: 'PRODUCT_LIST_REQUEST' }
  | { type: 'PRODUCT_LIST_SUCCESS'; payload: Product[] }
  | { type: 'PRODUCT_LIST_FAIL'; payload: string }
  | { type: 'SELECTED_PRODUCT'; payload: Product }
  | { type: 'ORDER_ADD_ITEM'; payload: OrderItem }
  | { type: 'REMOVE_FROM_ORDER'; payload: string }
  | { type: 'ORDER_CLEAR' }
  | { type: 'ORDER_CREATE_REQUEST' }
  | { type: 'ORDER_CREATE_SUCCESS'; payload: Order }
  | { type: 'ORDER_CREATE_FAIL'; payload: string }
  | { type: 'ORDER_LIST_REQUEST' }
  | { type: 'ORDER_LIST_SUCCESS'; payload: Order[] }
  | { type: 'ORDER_LIST_FAIL'; payload: string }
  | { type: 'ORDER_QUEUE_LIST_REQUEST' }
  | { type: 'ORDER_QUEUE_LIST_SUCCESS'; payload: Order[] }
  | { type: 'ORDER_QUEUE_LIST_FAIL'; payload: string };
