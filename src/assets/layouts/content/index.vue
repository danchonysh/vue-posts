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
					@click="toggleModal(display ? 'post' : 'news')">
					Add
				</button>
			</div>
			<article 
				:class="{
					'tab__item' : true,
					'change' : changing
				}">
				<div class="posts" v-show="display">
					<template v-if="allPosts.length">
						<Post
							v-for="post in allPosts"
							:key="post.id"
							:post="post"
						/>
					</template>
					<div v-else class="no-content">There is no posts right now...</div>	
				</div>
				<div class="news" v-show="!display">
					<template v-if="allNews.length">
						<News 
							v-for="news in allNews"
							:key="news.id"
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
import { mapGetters, mapActions } from 'vuex'

import './content.scss'
import Tab from '../../components/tab'
import Post from '../../components/post'
import News from '../../components/news'


export default {
	components: { Tab, Post, News },
	computed: mapGetters(['allNews', 'allPosts', 'tabs', 'display', 'changing']),
	methods: {
		...mapActions(['changeDisplay', 'changeTab', 'isChanging', 'showModal', 'changeModal']),
		tabClick(idx) {
			if (this.display !== idx) {
				this.changeTab(idx)
				this.isChanging(true)
				setTimeout(() => {
					this.changeDisplay(idx)
				}, 300)
				setTimeout(() => {
					this.isChanging(false)
				}, 1000)
			}
		},
		toggleModal(curr) {
			this.changeModal({ curr })
			this.showModal(true)
		}
	}
}
</script>