const debuggerRouter = [
  {
    path: "/debugger",
    name: "Debugger",
    component: () => import("@/views/debugger/show"),
  },
  {
    path: "/debugger/btn",
    name: "btn",
    component: () => import("@/views/debugger/btn/index"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/showTable/:id",
    name: "showTableDetail",
    component: () => import("@/views/table/showTableDetail"),
    meta: { hidden: true },
  },
];

export default debuggerRouter;
