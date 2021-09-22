<template>
	<div class="userMenu" @click="isOpen = !isOpen">
		<p  v-show="!isOpen" > [{{users.length}} personnes connectées] </p>
		<div v-show="isOpen" class="more">
			<h3>Mon Profil</h3>
			<h3> {{users.length}} Spliners connectés </h3>
			<ul>
				<li v-for="user in users" :key="user.id">
					{{user.name}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: 'UserMenu',
	data(){
		return{
			isOpen: false
		}
	},

	mounted() {
	},

	computed: mapState([
		'users'
	]),

};
</script>

<style lang="scss" scoped>
.userMenu {
	background-color: $elevation1;
	@include border-full;

	.more{
		width: 100%;
		height: auto;
	}
}
</style>
