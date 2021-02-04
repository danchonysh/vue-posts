import request from '../../assets/libs/request'
const { url } = require('../urls')

export default {
	state: {
		posts: []
	},
	actions: {
		getPosts: async (ctx) => {
			const result = await request(`${url}posts`)
			ctx.commit('getPosts', result)
		},
		addPost: async (ctx, data) => {
			await request(`${url}posts`, 'POST', data)
			ctx.commit('addPost', data)
		},
		deletePost: async (ctx, id) => {
			await request(`${url}posts/${id}`, 'DELETE')
			ctx.commit('deletePost', id)
		}
	},
	mutations: {
		getPosts: (state, data) => state.posts = data,
		addPost: (state, posts) => {
			state.posts.unshift(posts)
		},
		deletePost: (state, id) => {
			state.posts = state.posts.filter(el => el.id !== id)
		},
	},
	getters: {
		allPosts: state => state.posts
	}
}