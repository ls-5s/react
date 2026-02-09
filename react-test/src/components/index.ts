/**
 * 组件统一导出
 * 
 * 组件按功能分类组织在子文件夹中：
 * - ui/ - UI 基础组件
 * - route/ - 路由相关组件
 * 
 * 所有组件都支持两种导入方式：
 * 1. 命名导入：import { Loading, ProtectedRoute } from '@/components'
 * 2. 默认导入：import Loading from '@/components/ui/Loading'
 */

// 导出 UI 组件
export * from './ui';

// 导出路由组件
export * from './route';
