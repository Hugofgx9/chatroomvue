import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

export default class SvgPath {
	constructor($el) {

		this.draw = SVG()
			.addTo($el)
			.size('100%', '100%');

		this.createPath();
		this.createCircles();
	}

	createCircles() {
		this.M1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C1_1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C1_2 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C1_3 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C2_1 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C2_2 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };
		this.C2_3 = { svg: this.draw.circle(60).fill('#dde3e1'), cx: 0, cy: 0 };

		this.circles = [this.M1, this.C1_1, this.C1_2, this.C1_3, this.C2_1, this.C2_2, this.C2_3];

		//listen
		this.circles.forEach(c => {
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
		this.path = this.draw.path('M10 10 C 100 50, 100 50, 200 10 C 170 100, 200 90, 300 100')
			.fill({opacity: 0})
			.stroke({color:'black', width:3});
	}
	updatePath() {
		this.path.plot(`
			M	${this.M1.cx} ${this.M1.cy} 
			C ${this.C1_1.cx} ${this.C1_1.cy}, ${this.C1_2.cx} ${this.C1_2.cy}, ${this.C1_3.cx} ${this.C1_3.cy}
			C ${this.C2_1.cx} ${this.C2_1.cy}, ${this.C2_2.cx} ${this.C2_2.cy}, ${this.C2_3.cx} ${this.C2_3.cy}
		`);
	}

	// bindEvents() { }
}