<template>
	<div class="paper" ref="paper"></div>
</template>

<script>
import mySvg from '@/js/paper';

export default {
	name: 'Paper',

	mounted() {
		new mySvg(this.$refs.paper);
	}

};
</script>

<style lang="scss" scoped>
</style>
