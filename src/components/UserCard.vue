<template>
	<div class="userLine">
		<Round class="round" color="lightblue" />
		<div class="userInfo">
			<span>{{ user.name }}</span>
			<span>Connecté(e) depuis 15h00</span>
		</div>
	</div>
</template>

<script>
import Round from "./Round.vue";

export default {
	props: ['user'],
	components: { Round },

};
</script>

<style lang="scss" scoped>
.userLine {
	padding: 15px 31px 15px 0;
	display: grid;
	grid-template-columns: auto auto;

	.userInfo {
		display: grid;
	}
}
.round {
	width: 50%;
	align-self: center;
	justify-self: center;
}
</style>
