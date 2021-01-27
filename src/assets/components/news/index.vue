<template>
  	<section class="article">
		<h3 class="article__title">{{news.title}}</h3>
		<p class="article__content">{{news.content}}</p>
		<span 
			class="article__delete" 
			@click="$emit('delete-news', news.id)">
			&times;
		</span>
	</section>
</template>

<script>
import './news.scss'

export default {
	props: {
		news: {
			Type: Object,
			required: true
		}
	}
}
</script>