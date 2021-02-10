const { url } = require('../urls')

export default {
	state: {
		news: null
	},
	actions: {
		getNews: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news`,
					success: res => {
						commit('getNews', res.data)
						resolve()
					},
					failure: err => {
						reject(err)
					} 
				}, { root: true })
			})
		},
		addNews: async ({ dispatch, commit }, data) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news`,
					method: 'POST',
					data,
					success: res => {
						commit('addNews', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		deleteNews: async ({ dispatch, commit }, id) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news/${id}`,
					method: 'DELETE',
					success: res => {
						commit('deleteNews', id)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		editNews: async ({ dispatch, commit }, data) => {
			const { id, body } = data
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news/${id}`,
					method: 'PUT',
					data: body,
					success: res => {
						commit('editNews', { body, id })
						resolve()
					},
					failure: err => reject(err) 
				})
			}, { root: true })
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
		editNews: (state, { body, id }) => {
			const editted = state.news.filter(el => el._id === id)[0]
			editted.title = body.title
			editted.article = body.article
			editted.date = new Date(Date.now()).toLocaleString()
		}
	},
	getters: {
		allNews: state => state.news
	}
}