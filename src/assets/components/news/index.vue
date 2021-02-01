<template>
  	<section class="article">
		<h3 class="article__title">{{news.title}}</h3>
		<pre class="article__content">{{news.content}}</pre>
		<p class="article__time">{{formatted}}</p>
		<span 
			class="article__delete" 
			@click="deleteNews(news.id)">
			&times;
		</span>
	</section>
</template>

<script>
import './news.scss'

import formatting from '../../libs/timeFormatting'
import { mapActions } from 'vuex'

export default {
	props: {
		news: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			formatted: formatting(this.news.date)
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.news.date)
		}, 60000)
	},
	methods: mapActions(['deleteNews'])
}
</script>