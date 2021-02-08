const { url } = require('../urls')

export default {
	state: {
		posts: null
	},
	actions: {
		getPosts: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts`,
					success: res => {
						commit('getPosts', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, 
				{
					root: true
				})
			})
		},
		addPost: async ({ dispatch, commit }, data) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts`,
					method: 'POST',
					data,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					success: res => {
						commit('addPost', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, 
				{
					root: true
				})
			})
		},
		deletePost: async ({ dispatch, commit }, id) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts/${id}`,
					method: 'DELETE',
					success: res => {
						commit('deletePost', id)
						resolve()
					},
					failure: err => reject(err)
				}, 
				{
					root: true
				})
			})
		}
	},
	mutations: {
		getPosts: (state, data) => state.posts = data,
		addPost: (state, posts) => {
			state.posts.unshift(posts)
		},
		deletePost: (state, id) => {
			state.posts = state.posts.filter(el => el._id !== id)
		},
	},
	getters: {
		allPosts: state => state.posts
	}
}