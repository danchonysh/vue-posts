import toLocal from '../../assets/libs/toLocal'

export default {
	state: {
		pageState: JSON.parse(localStorage.getItem('page-state')) ??
		{
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
		},
		changing: false,
		oneActive: false
	},
	actions: {
		setActive: ({ commit }, value) => commit('setActive', value),
		changeDisplay: ({ commit }, config) => commit('changeDisplay', config),
		changeTab: ({ commit }, idx) => commit('changeTab', idx),
		isChanging: ({ commit }, value) => commit('isChanging', value)
	},
	mutations: {
		setActive: (state, value) => state.oneActive = value,
		changeDisplay: (state, config) => {
			state.pageState.display = config
			toLocal(state.pageState, 'page-state')
		},
		changeTab: (state, idx) => {
			state.pageState.tabs.forEach(el => el.active = false)
			state.pageState.tabs[idx].active = true
			toLocal(state.pageState, 'page-state')
		},
		isChanging: (state, value) => state.changing = value
	},
	getters: {
		oneActive: state => state.oneActive,
		display: state => state.pageState.display,
		tabs: state => state.pageState.tabs,
		changing: state => state.changing
	}		
}
