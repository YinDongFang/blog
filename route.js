/**
 * Author: connor.fan@accentrix.com
 * Date: 2019/12/6 17:06
 */
import RouteEnums from '@/enum/types/routeEnums';
import { PERMISSION_PAGE } from '@/enum/types/permissionEnums';
import VisitRoutes from '@/router/modules/guard/visitRoutes';
import settingRoutes from '@/router/modules/guard/settingRoute';

const GuardRoute = [
  VisitRoutes,
  // 巡检记录
  {
    path: 'record',
    name: RouteEnums.PATROL_MANAGEMENT_LOGGING,
    component: () => import(/* webpackChunkName: "guard" */'@/views/modules/back-office/patrol-mgnt/patrol-mgnt-log.vue'),
    meta: {
      title: ('route.guard.record'),
      isHeader: true,
      record: true,
      permission: PERMISSION_PAGE.PATROL_LOG,
    },
  },
  // 巡检计划管理（班次安排，调班)
  {
    path: 'manager',
    name: RouteEnums.PATROL_MANAGEMENT_PATH,
    component: () => import(/* webpackChunkName: "guard" */'@/views/modules/back-office/patrol-mgnt/patrol-mgnt-path.vue'),
    meta: {
      title: ('route.guard.manager'),
      isHeader: true,
      record: true,
      permission: PERMISSION_PAGE.PATROL_PATH,
    },
  },
  // 设置
  settingRoutes,
];

export default GuardRoute;
