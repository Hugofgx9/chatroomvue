<template>
	<div class="users">
		<h2>users</h2>
		<div class="scroll-wrapper">
			<ul>
				<li v-for="user in users" :key="user.id">{{ user.name }}</li>
			</ul>
		</div>
		<SetUserName />
	</div>
</template>

<script>
import SetUserName from "./SetUserName.vue";
import { mapState } from 'vuex';

export default {
	name: 'Users',
	components: { SetUserName },

	methods: {
		setUser(userName) {
			this.$socket.emit('setUsername', userName);
		}
	},
	computed: mapState(['users'])
};
</script>

<style lang="scss" scoped>
.users {
	.scroll-wrapper {
		height: 60vh;
		overflow-y: scroll;

		/* Hide scrollbar for Chrome, Safari and Opera */
		&::-webkit-scrollbar {
			display: none;
		}
		/* Hide scrollbar for IE, Edge and Firefox */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		li {
			font-size: 12px;
		}
	}
}
</style>
