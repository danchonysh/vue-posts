<template>
	<main>
		<div class="container content">
			<div class="btn-wrapper">
				<nav class="tab">					
					<ul class="tab__list">
						<Tab
							v-for="(tab, index) in tabs" 
							:key="tab.title"
							:tab="tab"
							@click.native="tabClick(index)"
						/>
					</ul>
				</nav>
				<button 
					class="add" 
					@click="$emit('toggle-modal', content)">
					Add
				</button>
			</div>
			<article 
				:class="{
					'tab__item' : true,
					'change' : change
				}">
				<div class="posts" v-if="content">
					<template v-if="data.postsArray.length">
						<Post
						v-for="post in data.postsArray"
						:key="post.title"
						:post="post"
						/>
					</template>
					<div v-else class="no-content">There is no posts right now...</div>	
				</div>
				<div class="news" v-else>
					<template v-if="data.newsArray.length">
						<News 
							v-for="news in data.newsArray"
							:key="news.title"
							:news="news"
						/>
					</template>
					<div v-else class="no-content">There is no news right now...</div>
				</div>
			</article>
		</div>
	</main>
</template>

<script>
import './content.scss'
import Tab from '../../components/tab'
import Post from '../../components/post'
import News from '../../components/news'


export default {
	components: {
		Tab,
		Post,
		News
	},
	props: {
		data: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
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
			content: 0,
			change: false
		}
	},
	computed: {
		change() {
			return this.change
		}
	},
	methods: {
		tabClick(idx) {
			this.tabs.forEach(el => el.active = false)
			this.tabs[idx].active = true
			this.change = true
			setTimeout(() => {
				this.change = false
			}, 500)
			setTimeout(() => {
				this.content = idx
			}, 300)
		}
	}
}
</script>