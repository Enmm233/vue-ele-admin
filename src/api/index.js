import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
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
export const shopProductCategoryt = query => {
    return request({  //获取产品分类
        url: '/api/shop/shop_product_category',
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

