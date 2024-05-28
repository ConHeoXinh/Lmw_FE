import CreateBook from "../components/CreateBook";
import EmployeeBookBorrowedPage from "../components/EmployeeBookBorrowedPage";
import EmployeeBookPage from "../components/EmployeeBookPage";
import EmployeeInvoiceDetailPage from "../components/EmployeeInvoiceDetailPage";
import EmployeeInvoicePage from "../components/EmployeeInvoicePage";
import EmployeeInformationPage from "../components/EmployeeInformationPage";
import AdminEmployeePage from "../components/AdminEmployeePage";
import AdminRankingPage from "../components/AdminRankingPage";
import AdminRevenuePage from "../components/AdminRevenuePage";
import EmployeeCustomerPage from "../components/EmployeeCustomerPage";
import EmployeeVoucherPage from "../components/EmployeeVoucherPage";
import EmployeeDepartmentPage from "../components/EmployeeDepartmentPage";
import EmployeePublisherPage from "../components/EmployeePublisherPage";
import EmployeeAuthorPage from "../components/EmployeeAuthorPage";
import UserInfomation from "../components/UserInformationPage";
import Main from "../components/Main.jsx";
import { DEFINE_ROUTES } from "./MenuEmployee";
import { DEFINE_ROUTES1 } from "./MenuAdmin";
import AuthorDetail from "../components/AuthorDetail/index.jsx";
import EmployeeCreateAuthor from "../components/EmployeeCreateAuthor/index.js";
import EmployeeCreateDepartment from "../components/EmployeeCreateDepartment/index.js";
import EmployeeCreatePublisher from "../components/EmployeeCreatePublisher/index.js";
import EmployeeInvoiceAdd from "../components/EmployeeInvoiceAdd";

export const ConfigRoutes = [
  {
    path: DEFINE_ROUTES1.ADMIN_INFORMATION,
    page: <EmployeeInformationPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES1.ADMIN_EMPLOYEE,
    page: <AdminEmployeePage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES1.ADMIN_RANKING,
    page: <AdminRankingPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES1.ADMIN_REVENUE,
    page: <AdminRevenuePage />,
    protect: true,
  },

  {
    path: DEFINE_ROUTES.EMPLOYEE_BOOK,
    page: <EmployeeBookPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.MAIN,
    page: <Main />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_INFORMATION,
    page: <EmployeeInformationPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_CUSTOMER,
    page: <EmployeeCustomerPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_VOUCHER,
    page: <EmployeeVoucherPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_BOOK_BORROWED,
    page: <EmployeeBookBorrowedPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_DEPARTMENT_LIST,
    page: <EmployeeDepartmentPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_PUBLISHER_LIST,
    page: <EmployeePublisherPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_AUTHOR_LIST,
    page: <EmployeeAuthorPage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_BOOK_ADD,
    page: <CreateBook />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_BOOK_DETAIL,
    page: <CreateBook />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_INVOICE_LIST,
    page: <EmployeeInvoicePage />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_INVOICE_ADD,
    page: <EmployeeInvoiceAdd />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_INVOICE_DETAIL,
    page: <EmployeeInvoiceDetailPage />,
    protect: true,
  },
  {
    // path: DEFINE_ROUTES.USER_INFORMATION,
    path: "/profile",
    page: <UserInfomation />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.AUTHOR_DETAIL,
    page: <AuthorDetail />,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_AUTHOR_ADD,
    page: <EmployeeCreateAuthor />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_AUTHOR_DETAIL,
    page: <EmployeeCreateAuthor />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_DEPARTMENT_ADD,
    page: <EmployeeCreateDepartment />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_DEPARTMENT_DETAIL,
    page: <EmployeeCreateDepartment />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_PUBLISHER_ADD,
    page: <EmployeeCreatePublisher />,
    protect: true,
  },
  {
    path: DEFINE_ROUTES.EMPLOYEE_PUBLISHER_DETAIL,
    page: <EmployeeCreatePublisher />,
    protect: true,
  },
];
