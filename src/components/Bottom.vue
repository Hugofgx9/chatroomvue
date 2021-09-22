<template>
	<div class="bottom">
		<SendMessage/>
	</div>
</template>

<script>
import SendMessage from './SendMessage.vue';

export default {
	name: 'Bottom',
	components: { SendMessage},

};
</script>

<style lang="scss" scoped>
.bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0 20px 20px 20px;
	height: 64px;

}
</style>
