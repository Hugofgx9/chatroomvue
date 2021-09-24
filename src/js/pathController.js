import gsap from "gsap";

export default class pathController {
	constructor(textPath) {
		this.$textPath = textPath;
		this.startOffset = 40;

		this.$textPath.setAttribute('startOffset', 0);

		this.$textPath.attributes.startOffset.value = this.startOffset;


		setInterval(() => {
			this.receiveMessage('', 'Lorem ');
		}, 1000);
	}

	addTspan($parent, text = "okokok", color = 'red') {
		const $tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
		$tspan.setAttribute('fill', color);
		$tspan.appendChild(document.createTextNode(` ${text}`));
		$parent.prepend($tspan);
		return $tspan;
	}

	randomColor() {
		const colors = ['blue', 'red', 'orange', 'purple', 'green'];
		return colors[Math.floor(Math.random() * colors.length)];
		// return `#${Math.random().toString(16).substr(2,6)}`;
	}

	receiveMessage(user, message) {

		const prevLength = this.$textPath.getComputedTextLength();
		// this.$textPath.innerHTML = ' ' + message + this.$textPath.innerHTML;
		this.addTspan(this.$textPath, message, this.randomColor());
		const nextLength = this.$textPath.getComputedTextLength();

		const diplacement = this.startOffset - (nextLength - prevLength);
		this.$textPath.attributes.startOffset.value = diplacement;


		this.anim = gsap.to(this.$textPath.attributes.startOffset, {
			value: this.startOffset,
			duration: 0.8,
			ease: 'power2',
			onComplete: () => {
				// console.log( this.$textPath.attributes.startOffset );
			}
		});

	}
	// sendMessage() { }
	// getMessageUser() { }
	// getUser() { }
}