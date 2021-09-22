<template>
	<form class="setUserName" @submit="checkUser">
		<input v-model="userName" type="text" />
		<input type="submit" value="Envoyer" />
	</form>
</template>

<script>
export default {
	name: 'setUserName',
	data() {
		return {
			userName: ''
		};
	},
	mounted() {
	},

	methods: {
		checkUser(e) {
			e.preventDefault();
			if (this.userName || !this.userName.length === 0) this.setUser();
		},

		setUser() {
			this.$parent.setUser(this.userName);
			this.userName = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.setUserName {
}
</style>
