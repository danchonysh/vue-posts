import toLocal from '../../assets/libs/to-local'

export default {
	state: {
		news: JSON.parse(localStorage.getItem('news')) || []
	},
	actions: {
		addNews: (ctx, data) => ctx.commit('addNews', data),
		deleteNews: (ctx, id) => ctx.commit('deleteNews', id)
	},
	mutations: {
		addNews: (state, news) => {
			state.news.unshift(news)
			toLocal(state.news, 'news')
		},
		deleteNews: (state, id) => {
			state.news = state.news.filter(el => el.id !== id)
			toLocal(state.news, 'news')
		},
	},
	getters: {
		allNews: state => state.news
	}
}