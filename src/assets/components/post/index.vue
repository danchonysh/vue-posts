<template>
  	<div 
	  	class="post" 
	  	:style="{
		 	backgroundImage: `url(${'http://localhost:3000/' + post.image})`
		}">
		<p class="post__text">{{post.caption}}</p>
		<div class="post__footer">
			<span class="post__delete" @click="deletePost(post._id)">&times;</span>
			<p class="post__time">{{formatted}}</p>
		</div>
	</div>
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