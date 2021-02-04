export default {
	state: {
		display: 0,
		tabs: [
			{
				title: 'News',
				active: true
			},
			{
				title: 'Posts',
				active: false
			}
		],
		changing: false
	},
	actions: {
		changeDisplay: (ctx, config) => ctx.commit('changeDisplay', config),
		changeTab: (ctx, idx) => ctx.commit('changeTab', idx),
		isChanging: (ctx, value) => ctx.commit('isChanging', value)
	},
	mutations: {
		changeDisplay: (state, config) => state.display = config,
		changeTab: (state, idx) => {
			state.tabs.forEach(el => el.active = false)
			state.tabs[idx].active = true
		},
		isChanging: (state, value) => state.changing = value
	},
	getters: {
		display: state => state.display,
		tabs: state => state.tabs,
		changing: state => state.changing
	}		
}
