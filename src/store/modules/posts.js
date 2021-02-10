const { url } = require('../urls')

export default {
	state: {
		posts: null,
		previews: [] 
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
				}, { root: true })
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
				}, { root: true })
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
				}, { root: true })
			})
		},
		setPreview: async ({ dispatch, commit }, { data, id }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts/${id}`,
					method: 'PATCH',
					data,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					success: res => {
						commit('setPreview', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		deletePreview: async ({ dispatch, commit }, data) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts`,
					method: 'DELETE',
					data: { preview: data.preview },
					success: res => {
						commit('deletePreview', data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		editPost: async ({ dispatch, commit }, data) => {
			const { id, body } = data
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts/${id}`,
					method: 'PUT',
					data: body,
					success: res => {
						commit('editPost', { body, id })
						resolve()
					},
					failure: err => reject(err) 
				})
			}, { root: true })
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
		setPreview: (state, data) => {
			const item = state.previews.find(el => el.id === data.id)
			if (item) {
				item.preview = data.preview
			} else {
				state.previews.push(data)
			}
			console.log(state.previews)
		},
		editPost: (state, { body, id }) => {
			const edited = state.posts.find(el => el._id === id)
			edited.image = body.image
			edited.caption = body.caption
			edited.date = new Date(Date.now()).toLocaleString()
		},
		deletePreview: (state, { id }) => {
			state.previews = state.previews.filter(el => el.id !== id)
		}
	},
	getters: {
		allPosts: state => state.posts,
		getPreviews: state => state.previews
	}
}