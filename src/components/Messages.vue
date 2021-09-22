<template>
	<div class="messages">
		<h2>Messages</h2>
		<div class="scroll-wrapper">
			<ul ref="scroll">
				<li v-for="message in messages" :key="message.id">
					<Message :message="message" />
					<!-- {{ message.value }} - {{ message.user.name }} -->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Message from '@/components/Message';
import { mapState } from 'vuex';

export default {
	name: 'Messages',
	components: {
		Message,
	},

	computed: mapState([
		'messages'
	]),

	watch: {
		messages: {
			handler() {
				setTimeout(() => this.$refs.scroll.scrollIntoView({ behavior: "smooth", block: "end" }));
			},
			deep: true
		},
	}
};
</script>

<style lang="scss" scoped>
.messages {
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
			max-width: 40vw;
		}

	}
}
</style>
