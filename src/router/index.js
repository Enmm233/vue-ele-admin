import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/product_list'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/store_info',
                    component: () => import('../components/page/store_manage/store_info.vue'),
                    meta: { title: '店铺信息' }
                },
                {
                    path: '/evaluate_manage',
                    component: () => import('../components/page/store_manage/evaluate_manage.vue'),
                    meta: { title: '店铺评价信息' }
                },
                {
                    path: '/product_list',
                    component: () => import('../components/page/goods_manage/product_list.vue'),
                    meta: { title: '产品列表' }
                },
                {
                    path: '/services',
                    component: () => import('../components/page/goods_manage/services.vue'),
                    meta: { title: '服务列表' }
                },
                {
                    path: '/add_product',
                    component: () => import('../components/page/goods_manage/add_product.vue'),
                    meta: { title: '添加产品' }
                },
				{
				    path: '/goods_list',
				    component: () => import('../components/page/goods_manage/goods_list.vue'),
				    meta: { title: '商品列表' }
				},
				{
				    path: '/add_goods',
				    component: () => import('../components/page/goods_manage/add_goods.vue'),
				    meta: { title: '添加商品' }
				},
				{
				    path: '/inventory_change',
				    component: () => import('../components/page/goods_manage/inventory_change.vue'),
				    meta: { title: '库存变更记录' }
				},
				{
				    path: '/gift_list',
				    component: () => import('../components/page/goods_manage/gift_list.vue'),
				    meta: { title: '赠品列表' }
				},
				{
				    path: '/charge_list',
				    component: () => import('../components/page/goods_manage/charge_list.vue'),
				    meta: { title: '收费项目列表' }
				},
				{
				    path: '/comment_list',
				    component: () => import('../components/page/goods_manage/comment_list.vue'),
				    meta: { title: '评论管理' }
				},
				{
				    path: '/order_list',
				    component: () => import('../components/page/order_manage/order_list.vue'),
				    meta: { title: '订单列表' }
				},
				{
				    path: '/salesReturn_list',
				    component: () => import('../components/page/afterSale_manage/salesReturn_list.vue'),
				    meta: { title: '申请退换货列表' }
				},
				{
				    path: '/refund_list',
				    component: () => import('../components/page/afterSale_manage/refund_list.vue'),
				    meta: { title: '退款记录列表' }
				},
				{
				    path: '/client_list',
				    component: () => import('../components/page/client_manage/client_list.vue'),
				    meta: { title: '顾客列表' }
				},
                {
                    path: '/icon',
                    component: () => import('../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import('../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import('../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import('../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import('../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import('../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import('../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import('../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import('../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import('../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import('../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import('../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import('../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
