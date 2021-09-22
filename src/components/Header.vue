<template>
	<header class="header">
		<h1>#SPLINE_TCHAT</h1>
		<UserMenu class="UserMenu"/>
	</header>
</template>

<script>
import UserMenu from "./UserMenu.vue";

export default {
	name: 'Header',
	components: {
		UserMenu
	},

	mounted() {
		
	}

};
</script>

<style lang="scss" scoped>
.header {
	width: 100vw;	
	height: 108px;
	background-color: $black;
	display: grid;
	grid-template-columns: auto 38%;

	h1 {
		height: 108px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $elevation2
	}
}
</style>
