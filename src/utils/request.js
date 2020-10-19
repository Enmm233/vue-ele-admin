import axios from 'axios';
import {
	Message
} from 'element-ui'

const service = axios.create({
	// process.env.NODE_ENV === 'development', //来判断是否开发环境
	// easy-mock服务挂了，暂时不使用了
	// baseURL: 'http://192.168.0.116:8080',
	 baseURL: 'http://192.168.0.222:8080',
	 // baseURL: ' http://127.0.0.1:8080/zhc_war',
	 // baseURL: 'http://101.37.204.197/zhc_war',
	 timeout: 5000
});

service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject();
	}
);

service.interceptors.response.use(
	response => {
		if(localStorage.getItem('account_id') != ''){
			if (response.status === 200) {
				if (response.data.code != 1) {
					if(response.data.code != 2){
						Message({
							message: response.data.hint,
							type: 'error',
							duration: 5 * 1000
						})
					}
				}
				return response.data;
			} else {
				Promise.reject();
			}
		}else{
			Message.success('请登录');
			this.$router.push('/login');
		}
	},
	error => {
		if(localStorage.getItem('account_id') == ''){
			Message.success('请登录');
			this.$router.push('/login');
		}
		Message.error('服务器异常请重试');
		// this.$message.success('请登录');
		// this.$router.push('/login');
		return Promise.reject();
	}
);

export default service;
