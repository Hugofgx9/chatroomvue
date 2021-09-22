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
		<SendMessage />
	</div>
</template>

<script>
import Message from '@/components/Message';
import SendMessage from './SendMessage.vue';

export default {
	name: 'Messages',
	components: {
		Message,
		SendMessage
	},
	props: ['socket'],
	data() {
		return {
			messages: []
		};
	},
	mounted() {
		this.socket.on('message', message => this.getMessage(message));
		this.socket.on('messages', messages => messages.forEach(msg => this.getMessage(msg)));
		this.socket.emit('getMessages');
	},

	methods: {
		getMessage(message) {
			if (!this.messages.some(a => a.id === message.id)) {
				this.messages.push(message);
			}
		},
		sendMessage(message) {
			this.socket.emit('message', message);
		}
	},

	watch: {
		messages: {
			handler() {
				//todo last change
				setTimeout(() => {
					this.$refs.scroll.scrollIntoView({ behavior: "smooth", block: "end" });
				}, 0);
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
	}
}
</style>
