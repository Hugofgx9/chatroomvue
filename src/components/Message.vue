<template>
	<div class="message">
		<span class="content">{{ message.value }}</span>
		<span class="username">{{ message.user.name}}</span>
	</div>
</template>

<script>
export default {
	name: 'Message',
	props: ['message'],
	
};
</script>

<style lang="scss" scoped>
.message {
	.content {
		background-color: lightblue;
		display: inline-block;
		font-size: 13px;
		border-radius: 5px;
		padding: 1px 3px;
		margin: 3px 0;
		word-break: break-word;
	}

	.username {
		font-size: 10px;
	}
}
</style>
