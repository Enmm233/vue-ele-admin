<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
				{
				    icon: 'el-icon-lx-calendar',
				    index: '1',
				    title: '商品管理',
				    subs: [
				        {
				            index: '1-1',
				            title: '产品管理',
				            subs: [
				               {
				                   index: 'product_list',
				                   title: '产品列表'
				               },
				               {
				                   index: 'inventory_change',
				                   title: '库存变更记录'
				               }
				            ]
				        },
				        {
				            index: '1-2',
				            title: '服务管理',
				            subs: [
				               {
				                   index: 'services',
				                   title: '服务列表'
				               }
				            ]
				        },
				        {
				            index: '1-3',
				            title: '商品管理',
				            subs: [
				               {
				                   index: 'goods_list',
				                   title: '商品列表'
				               },
				               {
				                   index: 'add_goods',
				                   title: '添加商品'
				               }
				            ]
				        },
				        {
				            index: '1-4',
				            title: '赠品管理',
				            subs: [
				               {
				                   index: 'gift_list',
				                   title: '赠品列表'
				               }
				            ]
				        },
				        {
				            index: '1-5',
				            title: '附加收费管理',
				            subs: [
				               {
				                   index: 'charge_list',
				                   title: '收费项目列表'
				               }
				            ]
				        },
				        {
				            index: '1-6',
				            title: '评论管理',
				            subs: [
				               {
				                   index: 'comment_list',
				                   title: '评论列表'
				               }
				            ]
				        }
				    ]
				},
				{
				    icon: 'el-icon-shopping-bag-1',
				    index: '2',
				    title: '店铺管理',
				    subs: [
				        {
				            index: 'store_info',
				            title: '店铺基础信息',
				        },
						{
							index: 'evaluate_manage',
							title: '店铺评价信息',
						}
				    ]
				},
				{
				    icon: 'el-icon-tickets',
				    index: '3',
				    title: '订单管理',
				    subs: [
				        {
				            index: 'order_list',
				            title: '订单列表',
				        },
				    ]
				},
				{
				    icon: 'el-icon-document-delete',
				    index: '4',
				    title: '售后管理',
				    subs: [
				        {
				            index: 'salesReturn_list',
				            title: '申请退换货列表',
				        },
				        {
				            index: 'refund_list',
				            title: '退款记录列表',
				        },
				    ]
				},
				{
				    icon: 'el-icon-user',
				    index: '5',
				    title: '顾客管理',
				    subs: [
				        {
				            index: 'client_list',
				            title: '顾客列表',
				        }
				    ]
				},
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'dashboard',
                //     title: '系统首页'
                // },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '3',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '3-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
