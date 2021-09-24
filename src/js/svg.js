import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

export default class SvgPath {
	constructor($el) {

		this.draw = SVG()
			.addTo($el)
			.size('100%', '100%');

		this.createCircles();
		this.createPath();
	}

	createCircles() {
		this.M1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 20, cy: 600 };
		this.C1_1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 350, cy: 300 };
		this.C1_2 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 520, cy: 380 };
		this.C1_3 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 800, cy: 550 };
		this.C2_1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 500, cy: 550 };
		this.C2_2 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 640, cy: 230 };
		this.C2_3 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 1340, cy: 353 };

		this.circles = [this.M1, this.C1_1, this.C1_2, this.C1_3, this.C2_1, this.C2_2, this.C2_3];

		//listen
		this.circles.forEach(c => {
			c.svg.move(c.cx, c.cy);
			c.svg.draggable();
			c.svg.on('dragmove', () => {
				const { cx, cy } = c.svg.bbox();
				c.cx = cx;
				c.cy = cy;
				this.updatePath();
			});
		});
	}

	createPath() {
		this.path = this.draw.path(`
				M	${this.M1.cx} ${this.M1.cy} 
				C ${this.C1_1.cx} ${this.C1_1.cy}, ${this.C1_2.cx} ${this.C1_2.cy}, ${this.C1_3.cx} ${this.C1_3.cy}
				C ${this.C2_1.cx} ${this.C2_1.cy}, ${this.C2_2.cx} ${this.C2_2.cy}, ${this.C2_3.cx} ${this.C2_3.cy}
			`)
			.fill({ opacity: 0 })
			.stroke({ color: 'black', width: 0.2 })
			.text('')
			.build(true)
			.attr('startOffset', 0);
	}
	updatePath() {
		this.path.plot(`
			M	${this.M1.cx} ${this.M1.cy} 
			C ${this.C1_1.cx} ${this.C1_1.cy}, ${this.C1_2.cx} ${this.C1_2.cy}, ${this.C1_3.cx} ${this.C1_3.cy}
			C ${this.C2_1.cx} ${this.C2_1.cy}, ${this.C2_2.cx} ${this.C2_2.cy}, ${this.C2_3.cx} ${this.C2_3.cy}
		`);
	}

	addMessage(message = "", color = "blue") {
		color = '#' + this.randomColor();
		this.path.tspan(message + " ").fill(color).back();
	}

	scroll(ev) {
		let newVal = this.path.attr('startOffset') + ev.deltaY * 0.02;

		newVal = Math.min(20, newVal);
		this.path.attr('startOffset', newVal);
	}

	randomColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	}

}