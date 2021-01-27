<template>
  	<figure class="post">
		<img class="post__photo" :src="post.img">
		<caption class="post__text">{{post.caption}}</caption>
		<span class="post__delete">&times;</span>
	</figure>
</template>

<script>
import './post.scss'

export default {
	props: {
		post: {
			Type: Object,
			required: true
		}
	}
}
</script>