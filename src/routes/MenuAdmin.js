export const DEFINE_ROUTES1 = {
  ADMIN_INFORMATION: "/admin/information",
  ADMIN_EMPLOYEE: "/admin/employee/list",
  ADMIN_RANKING: "/admin/ranking/list",
  ADMIN_REVENUE: "/admin/revenue/list",
  MAIN: "/",
};

export const MenuAdmin = [
  {
    title: "Thông tin",
    path: DEFINE_ROUTES1.ADMIN_INFORMATION,
    activePath: "/admin/information",
  },
  {
    title: "Doanh thu",
    path: DEFINE_ROUTES1.ADMIN_REVENUE,
    activePath: "/admin/revenue/",
  },
  {
    title: "Xếp hạng sách",
    path: DEFINE_ROUTES1.ADMIN_RANKING,
    activePath: "/admin/ranking/",
  },
  {
    title: "Nhân Viên",
    path: DEFINE_ROUTES1.ADMIN_EMPLOYEE,
    activePath: "/admin/employee/",
  },
];
