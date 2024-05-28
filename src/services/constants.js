export const API_URL = "http://localhost:8080";
// export const API_URL = "http://lms-be-free.ap-southeast-2.elasticbeanstalk.com";

export const LOGIN_API = {
  SIGN_UP: "",
  SIGN_IN: "/api/auth/signin",
  GET_USER_PROFILE: "/api/user/profile",
};

export const BOOK_API = {
  LIST_BOOK: "/api/book",
  GET_DETAIL: "/api/book/get-one",
  LIST_SEARCH_BOOK: "/api/search/filter-search",
  INIT_DATA_SEARCH: "/api/search/menu",
  ADD_FAVORITES_BOOK: "/api/book/add-favorite",
  REMOVE_FAVORITES_BOOK: "/api/book/remove-favorite",
  GET_LIST_BOOK_EMP: "/api/book/books",
  EMPL_UPDATE_BOOK: "/api/book/update",
  EMPL_INSERT_BOOK: "/api/book/insert",
};

export const SEARCH_API = {
  FILL_SEARCH: "/api/search/fill-search",
  TITLE_sEARCH: "/api/search",
  EMPL_SERARCH: "/api/admin/search",
}

export const USER_DETAIL_API = {
  USER_DETAIL: "/api/user/profile",
};

export const USER_API = {
  USER: "/api/user/list",
  CHANGE_PASSWORD: "/api/auth/change-password",
};
export const PUBLISHER_API = {
  PUBLISHER: "/api/publisher",
};
export const DEPARTMENT_API = {
  DEPARTMENT: "/api/department",
};

export const INVOICE_API = {
  LIST_INVOICE: "/api/order/list",
  CREATE_INVOICE: "/api/order/"
};
export const USER_FAVORITE_API = {
  USER_FAVORITE: "/api/book/favorite",
};

export const ORDER_API = {
  ADD_TO_CARD: "/api/cart/add",
  GET_CART: "/api/cart/",
  GET_ORDER_DETAIL: "/api/order",
  DELETE_CART_ITEM: "/api/cart_item",
  API_ORDER: "/api/order/",
  ACCEPT_REJECT_ORDER: "/api/order",
  UPDATE_CART_ITEM: "/api/cart_item",
  APPLY_COUPON: "/api/voucher/insert",
  GET_BOOKS_BORROW: "/api/order/list-book-borrow",
  EXTEND_BOOK: "/api/order/extend-book",
};

export const AUTH_API = {
  EDIT_PROFILE: "/api/user/edit-profile",
};

export const AUTHOR_API = {
  AUTHOR_DETAIL: "/api/author/detail",
  AUTHOR: "/api/author",
};
