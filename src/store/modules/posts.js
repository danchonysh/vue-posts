import request from '../../assets/libs/request'
const axios = require('axios')
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
			// const item = await request(`${url}posts`, 'POST', data, {
			// 	'Content-Type': 'multipart/form-data'
			// })
			// ctx.commit('addPost', item)
			console.log(data)
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			axios.post(`${url}posts`, data, config)
				.then(res => ctx.commit('addPost', res))
				.catch(err => console.log(err))
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
			state.posts = state.posts.filter(el => el._id !== id)
		},
	},
	getters: {
		allPosts: state => state.posts
	}
}