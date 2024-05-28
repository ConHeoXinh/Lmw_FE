export const DEFINE_ROUTES = {
  AUTHOR_DETAIL: "/author-detail",
  EMPLOYEE_BOOK: "/employee/book/list",
  EMPLOYEE_INFORMATION: "/employee/information/list",
  EMPLOYEE_CUSTOMER: "/employee/customer/list",
  EMPLOYEE_VOUCHER: "/employee/voucher/list",
  EMPLOYEE_BOOK_BORROWED: "/employee/book-borrow/list",
  EMPLOYEE_BOOK_ADD: "/employee/book/add",
  EMPLOYEE_BOOK_DETAIL: "/employee/book/detail",
  EMPLOYEE_INVOICE_LIST: "/employee/invoice/list",
  EMPLOYEE_INVOICE_DETAIL: "/employee/invoice/detail",
  EMPLOYEE_DEPARTMENT_LIST: "/employee/department/list",
  EMPLOYEE_PUBLISHER_LIST: "/employee/publisher/list",
  EMPLOYEE_AUTHOR_LIST: "/employee/author/list",
  EMPLOYEE_INVOICE_ADD: "/employee/invoices/add",
  EMPLOYEE_AUTHOR_ADD: "/employee/author/add",
  EMPLOYEE_AUTHOR_DETAIL: "/employee/author/detail",
  EMPLOYEE_DEPARTMENT_ADD: "/employee/department/add",
  EMPLOYEE_DEPARTMENT_DETAIL: "/employee/department/detail",
  EMPLOYEE_PUBLISHER_ADD: "/employee/publisher/add",
  EMPLOYEE_PUBLISHER_DETAIL: "/employee/publisher/detail",
  MAIN: "/",
};

export const MenuEmployee = [
  {
    title: "Thông tin",
    path: DEFINE_ROUTES.EMPLOYEE_INFORMATION,
    activePath: "/employee/information/",
  },
  {
    title: "Khách hàng",
    path: DEFINE_ROUTES.EMPLOYEE_CUSTOMER,
    activePath: "/employee/customer/",
  },
  {
    title: "Quản lý sách",
    path: DEFINE_ROUTES.EMPLOYEE_BOOK,
    activePath: "/employee/book/",
  },
  {
    title: "Sách đang mượn",
    path: DEFINE_ROUTES.EMPLOYEE_BOOK_BORROWED,
    activePath: "/employee/book-borrow/",
  },
  {
    title: "Đơn mượn",
    path: DEFINE_ROUTES.EMPLOYEE_INVOICE_LIST,
    activePath: "/employee/invoice/",
  },
  {
    title: "Tạo đơn mượn",
    path: DEFINE_ROUTES.EMPLOYEE_INVOICE_ADD,
    activePath: "/employee/invoices/add",
  },
  {
    title: "Danh mục",
    path: DEFINE_ROUTES.EMPLOYEE_DEPARTMENT_LIST,
    activePath: "/employee/department/",
  },
  {
    title: "Tác giả",
    path: DEFINE_ROUTES.EMPLOYEE_AUTHOR_LIST,
    activePath: "/employee/author/",
  },
  {
    title: "Nhà xuất bản",
    path: DEFINE_ROUTES.EMPLOYEE_PUBLISHER_LIST,
    activePath: "/employee/publisher/",
  },
  // {
  //   title: "Khuyến mại",
  //   path: "/employee/voucher/list",
  //   activePath: "/employee/voucher/",
  // },
];
