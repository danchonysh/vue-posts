import toLocal from '../../assets/libs/to-local'

export default {
	state: {
		posts: JSON.parse(localStorage.getItem('posts')) || []
	},
	actions: {
		addPost: (ctx, data) => ctx.commit('addPost', data),
		deletePost: (ctx, id) => ctx.commit('deletePost', id)
	},
	mutations: {
		addPost: (state, post) => {
			state.posts.unshift(post)
			toLocal(state.posts, 'posts')
		},
		deletePost: (state, id) => {
			state.posts = state.posts.filter(el => el.id !== id)
			toLocal(state.posts, 'posts')
		}
	},
	getters: {
		allPosts: state => state.posts
	}
}