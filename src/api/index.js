import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const uploadLocation = query => {
    return request({  //安卓测试 在顾客列表
        url: '/api/friend/upload_location',
        method: 'post',
        params: query
    });
};

export const doSendCode = query => {
    return request({  //获取验证码
        url: '/api/user/doSendCode',
        method: 'post',
        params: query
    });
};
export const codeLogin = query => {
    return request({  //验证码登录
        url: '/api/user/doLogin',
        method: 'post',
        params: query
    });
};
export const signOut = query => {
    return request({  //退出登录
        url: '/api/user/signOut',
        method: 'post',
        params: query
    });
};
export const shopProductCategoryt = query => {
    return request({  //获取产品分类
        url: '/api/merchant/get_shopProduccategory_byParent',
        method: 'post',
        params: query
    });
};
export const getShopProductList = query => {
    return request({  //获取产品列表
        url: '/api/merchant/get_shopProduct_list',
        method: 'post',
        params: query
    });
};
export const delShopProduct = query => {
    return request({  //删除产品
        url: '/api/merchant/del_shopProduct',
        method: 'post',
        params: query
    });
};

export const addShopProduct = query => {
    return request({  //新增产品
        url: '/api/merchant/add_shopProduct',
        method: 'post',
        params: query
    });
};

export const getShopProduct = query => {
    return request({  //获取产品详情
        url: '/api/merchant/get_shopProduct',
        method: 'post',
        params: query
    });
};
export const getShopWaresInfo = query => {
    return request({  //请求商品列表
        url: '/api/merchant/get_shopWares_info',
        method: 'post',
        params: query
    });
};

export const listShopGift = query => {
    return request({  //获取赠品列表
        url: '/api/merchant/list_shopGift',
        method: 'post',
        params: query
    });
};

export const delShopGift = query => {
    return request({  //删除赠品
        url: '/api/merchant/del_shopGift',
        method: 'post',
        params: query
    });
};

export const selShopGift = query => {
    return request({  //获取赠品详情
        url: '/api/merchant/sel_shopGift',
        method: 'post',
        params: query
    });
};
export const updShopGift = query => {
    return request({  //编辑赠品
        url: '/api/merchant/upd_shopGift',
        method: 'post',
        params: query
    });
};
export const addShopGift = query => {
    return request({  //添加赠品
        url: '/api/merchant/add_shopGift',
        method: 'post',
        params: query
    });
};
export const listShopExpenseItem = query => {
    return request({  //获取商品附加收费项目列表
        url: '/api/merchant/list_shopExpenseItem',
        method: 'post',
        params: query
    });
};
export const delShopExpenseItem = query => {
    return request({  //删除商品附加收费项目
        url: '/api/merchant/del_shopExpenseItem',
        method: 'post',
        params: query
    });
};

export const selShopExpenseItem = query => {
    return request({  //获取商品附加收费项目详情
        url: '/api/merchant/sel_shopExpenseItem',
        method: 'post',
        params: query
    });
};
export const addShopExpenseItem = query => {
    return request({  //增加商品附加收费项目
        url: '/api/merchant/add_shopExpenseItem',
        method: 'post',
        params: query
    });
};

export const updShopExpenseItem = query => {
    return request({  //编辑商品附加收费项目
        url: '/api/merchant/upd_shopExpenseItem',
        method: 'post',
        params: query
    });
};
export const listShopWarehousing = query => {
    return request({  //获取入库记录列表
        url: '/api/merchant/list_shopWarehousing',
        method: 'post',
        params: query
    });
};

export const addShopWarehousing = query => {
    return request({  //增加入库记录
        url: '/api/merchant/add_shopWarehousing',
        method: 'post',
        params: query
    });
};
export const listShopActivity = query => {
    return request({  //活动列表
        url: '/api/merchant/list_shopActivity',
        method: 'post',
        params: query
    });
};
export const addShopWaresInfo = query => {
    return request({  //新增商品
        url: '/api/merchant/add_shopWares_info',
        method: 'post',
        params: query
    });
};
export const getShopWares = query => {
    return request({  //获取商品详情
        url: '/api/merchant/get_shopWares',
        method: 'post',
        params: query
    });
};
export const updShopWaresInfo = query => {
    return request({  //修改商品
        url: '/api/merchant/upd_shopWares_info',
        method: 'post',
        params: query
    });
};
export const ceaseSale = query => {
    return request({  //下架商品
        url: '/api/merchant/ceaseSale',
        method: 'post',
        params: query
    });
};
export const sale = query => {
    return request({  //上架商品
        url: '/api/merchant/sale',
        method: 'post',
        params: query
    });
};

export const delShopWares = query => {
    return request({  //删除商品
        url: '/api/merchant/delShopWares',
        method: 'post',
        params: query
    });
};

export const listShopWaresComment = query => {
    return request({  //商品评论列表
        url: '/api/shop/list_shop_wares_comment',
        method: 'post',
        params: query
    });
};

export const getStoreByUserId = query => {
    return request({  //获取商铺信息
        url: '/api/merchant/getStoreByUserId',
        method: 'post',
        params: query
    });
};
export const getShopStoreCategory = query => {
    return request({  //店铺分类
        url: '/api/merchant/getShopStoreCategory',
        method: 'post',
        params: query
    });
};
export const updStore = query => {
    return request({  //编辑商铺信息
        url: '/api/merchant/updStore',
        method: 'post',
        params: query
    });
};
export const insertShopWaresCommenreply = query => {
    return request({  //新增商品评论回复
        url: '/api/merchant/insertShopWaresCommenreply',
        method: 'post',
        params: query
    });
};

export const listWaresOrder = query => {
    return request({  //商品订单列表
        url: '/api/merchant/listWaresOrder',
        method: 'post',
        params: query
    });
};

export const waresOrderDetails = query => {
    return request({  //订单详情
        url: '/api/merchant/waresOrderDetails',
        method: 'post',
        params: query
    });
};

export const deliverGoods = query => {
    return request({  //订单发货
        url: '/api/merchant/deliverGoods',
        method: 'post',
        params: query
    });
};

export const updShopProduct = query => {
    return request({  //修改产品信息
        url: '/api/merchant/upd_shopProduct',
        method: 'post',
        params: query
    });
};

export const listShopService = query => {
    return request({  //服务信息列表
        url: '/api/merchant/list_shopService',
        method: 'post',
        params: query
    });
};

export const selShopService = query => {
    return request({  //服务信息详情
        url: '/api/merchant/sel_shopService',
        method: 'post',
        params: query
    });
};
export const delShopService = query => {
    return request({  //删除服务信息
        url: '/api/merchant/del_shopService',
        method: 'post',
        params: query
    });
};

export const addShopService = query => {
    return request({  //新增服务信息
        url: '/api/merchant/add_shopService',
        method: 'post',
        params: query
    });
};

export const getMerchandiseCategories = query => {
    return request({  //服务分类
        url: 'api/index/get_merchandise_categories',
        method: 'post',
        params: query
    });
};

export const updShopService = query => {
    return request({  //修改服务信息
        url: '/api/merchant/upd_shopService',
        method: 'post',
        params: query
    });
};

export const listShopReturnedPurchaseRefund = query => {
    return request({  //退款退货申请列表
        url: 'api/merchant/list_shopReturnedPurchaseRefund',
        method: 'post',
        params: query
    });
};

export const addShopReturnedPurchaseDetailed = query => {
    return request({  //增加退款列表
        url: 'api/merchant/add_shopReturnedPurchaseDetailed',
        method: 'post',
        params: query
    });
};
export const updShopReturnedPurchaseRefund = query => {
    return request({  //修改退款退货申请
        url: 'api/merchant/upd_shopReturnedPurchaseRefund',
        method: 'post',
        params: query
    });
};

export const listShopReturnedPurchaseDetailed = query => {
    return request({  //退款列表
        url: 'api/merchant/list_shopReturnedPurchaseDetailed',
        method: 'post',
        params: query
    });
};
export const listUserList = query => {
    return request({  //顾客列表
        url: '/api/merchant/list_userList',
        method: 'post',
        params: query
    });
};

export const listWaresCommentByWaresId = query => {
    return request({  //商品评论列表
        url: '/api/merchant/listWaresCommentByWaresId',
        method: 'post',
        params: query
    });
};
export const listStoreComment = query => {
    return request({  //店铺评论
        url: '/api/merchant/listStoreComment',
        method: 'post',
        params: query
    });
};
export const selShopWarehousingByProductId = query => {
    return request({  //根据产品编号获取产品入库记录详情
        url: '/api/merchant/sel_shopWarehousingByProductId',
        method: 'post',
        params: query
    });
};

export const addShopHousing = query => {
    return request({  //增加商品入库记录
        url: '/api/merchant/add_shopHousing',
        method: 'post',
        params: query
    });
};

export const getWaresQrCode = query => {
    return request({  //生成商品二维码(跳转)
        url: '/api/merchant/get_wares_qr_code',
        method: 'get',
        params: query
    });
};


export const addShopStoreCommentReply = query => {
    return request({  //增加商铺评论回复
        url: '/api/merchant/add_shopStoreCommentReply',
        method: 'post',
        params: query
    });
};

export const delImg = query => {
    return request({  //删除图片
        url: '/api/delImg',
        method: 'post',
        params: query
    });
};



