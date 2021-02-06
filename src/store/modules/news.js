import request from '../../assets/libs/request'
const { url } = require('../urls')

export default {
	state: {
		news: []
	},
	actions: {
		getNews: async (ctx) => {
			const result = await request(`${url}news`)
			ctx.commit('getNews', result)
		},
		addNews: async (ctx, data) => {
			const item = await request(`${url}news`, 'POST', data)
			ctx.commit('addNews', item)
		},
		deleteNews: async (ctx, id) => {
			await request(`${url}news/${id}`, 'DELETE')
			ctx.commit('deleteNews', id)
		}
	},
	mutations: {
		getNews: (state, data) => state.news = data,
		addNews: (state, news) => {
			state.news.unshift(news)
		},
		deleteNews: (state, id) => {
			state.news = state.news.filter(el => el._id !== id)
		},
	},
	getters: {
		allNews: state => state.news
	}
}