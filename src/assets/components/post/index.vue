<template>
  	<figure class="post">
		<img class="post__photo" :src="post.image">
		<caption class="post__text">{{post.caption}}</caption>
		<p class="post__time">{{formatted}}</p>
		<span class="post__delete" @click="deletePost(post._id)">&times;</span>
	</figure>
</template>

<script>
import './post.scss'

import formatting from '../../libs/timeFormatting'
import { mapActions } from 'vuex'

export default {
	props: {
		post: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			formatted: formatting(this.post.date)
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.post.date)
		}, 60000)
	},
	methods: mapActions(['deletePost'])
}
</script>