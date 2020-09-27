import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		imgUrl:'http://192.168.0.222:8080/img/', //图片地址
		count:0
	},
	getters:{
		//Getter不会修改state内的原数据，而会进行加工形成新数据
		//state中的数据发生变化之后，Getter中的数据也会跟着变化
		//相当于计算属性
		showNum(state){
			return '当前最新的数量是【'+ state.count +'】'
		}
		
	},
	//只有mutations中定义的函数，才有资格修改state数据的权利
	mutations:{  //用于变更store中的数据
		//不要在mutations中执行异步操作
		add(state){
			state.count++
		},
		jian(state){
			state.count--
		},
		addN(state,step){ //传递参数
			//变更状态
			state.count += step
		},
		sub(state){
			state.count--
		},
		subN(state,step){
			//变更状态
			state.count -= step
		}
	},
	actions:{  
		//用于处理异步操作，无法直接修改state数据，需要通过mutations函数来修改
		addAsync(context){
			setTimeout(()=>{
				//通过context.commit() 触发某个mutation方法
				//如需携带参数，需要在mutations中新增一个带参的函数然后调用
				context.commit('add')
			},1000)
		},
		subNAsync(context,step){
			setTimeout(()=>{
				//通过context.commit() 触发某个mutation方法
				//如需携带参数，需要在mutations中新增一个带参的函数然后调用
				context.commit('subN',step)
			},1000)
		}
	}
})