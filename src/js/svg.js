import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

export default class SvgPath {
	constructor($el) {

		this.draw = SVG()
			.addTo($el)
			.size('100%', '100%');

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.color = '#4f80ff';
		this.tspans = [];

		this.createCircles();
		this.createLines();
		this.createPath();
		this.hideAnchors();
	}

	createCircles() {
		this.M1 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.01, cy: this.height * 0.7 };
		this.C1_1 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.3, cy: this.height * 0.5 };
		this.C1_2 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.6, cy: this.height * 0.45 };
		this.C1_3 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.7, cy: this.height * 0.55 };
		this.C2_1 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.52, cy: this.height * 0.56 };
		this.C2_2 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.45, cy: this.height * 0.3 };
		this.C2_3 = { svg: this.draw.circle(35).fill(this.color), cx: this.width * 0.99, cy: this.height * 0.5 };

		this.circles = [this.M1, this.C1_1, this.C1_2, this.C1_3, this.C2_1, this.C2_2, this.C2_3];

		//listen
		this.circles.forEach(c => {
			c.svg.node.style.cursor = "pointer";
			const { width, height } = c.svg.bbox();
			c.svg.move(c.cx - (width / 2), c.cy - (height / 2));
			c.svg.draggable();
			c.svg.on('dragmove', () => {
				const { cx, cy } = c.svg.bbox();
				c.cx = cx;
				c.cy = cy;
				this.updateLines();
				this.updatePath();
			});
		});
	}

	createLines() {
		this.line1 = { svg: this.draw.line(0, 0, 0, 0), circles: [this.M1, this.C1_1] };
		this.line2 = { svg: this.draw.line(0, 0, 0, 0), circles: [this.C1_3, this.C1_2] };
		this.line3 = { svg: this.draw.line(0, 0, 0, 0), circles: [this.C1_3, this.C2_1] };
		this.line4 = { svg: this.draw.line(0, 0, 0, 0), circles: [this.C2_3, this.C2_2] };

		this.lines = [this.line1, this.line2, this.line3, this.line4];
		this.lines.forEach(line => {
			line.svg.stroke({ color: this.color, width: 1 }).back();
		});

		this.updateLines();
	}
	createPath() {
		this.path = this.draw.path(`
		M	${this.M1.cx} ${this.M1.cy} 
		C ${this.C1_1.cx} ${this.C1_1.cy}, ${this.C1_2.cx} ${this.C1_2.cy}, ${this.C1_3.cx} ${this.C1_3.cy}
		C ${this.C2_1.cx} ${this.C2_1.cy}, ${this.C2_2.cx} ${this.C2_2.cy}, ${this.C2_3.cx} ${this.C2_3.cy}
		`)
			.fill({ opacity: 0 })
			// .stroke({ color: 'black', width: 0.2 })
			.text('')
			.font('size', 23)
			.font('family', 'Helvetica')
			.build(true)
			.attr('startOffset', 0);

		this.path.track().node.style.pointerEvents = "none";
	}

	updateLines() {
		this.lines.forEach(line => {
			line.svg.plot(line.circles[0].cx, line.circles[0].cy, line.circles[1].cx, line.circles[1].cy);
		});
	}
	updatePath() {
		this.path.plot(`
			M	${this.M1.cx} ${this.M1.cy} 
			C ${this.C1_1.cx} ${this.C1_1.cy}, ${this.C1_2.cx} ${this.C1_2.cy}, ${this.C1_3.cx} ${this.C1_3.cy}
			C ${this.C2_1.cx} ${this.C2_1.cy}, ${this.C2_2.cx} ${this.C2_2.cy}, ${this.C2_3.cx} ${this.C2_3.cy}
		`);
	}

	addMessage(message = "", color = null) {
		if (color === null) color = '#' + this.randomColor;
		let tspan = this.path.tspan(`${message}   `).fill(color).back();
		this.tspans.push(tspan);
	}

	scroll(ev) {
		let newVal = this.path.attr('startOffset') + ev.deltaY * 0.05;
		newVal = Math.min(20, newVal);
		this.path.attr('startOffset', newVal);
	}

	randomColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	}

	showAnchors() {
		this.lines.forEach(l => l.svg.show());
		this.circles.forEach(l => l.svg.show());
	}

	hideAnchors() {
		this.lines.forEach(l => l.svg.hide());
		this.circles.forEach(l => l.svg.hide());
	}

	setAnchorsVisibility(bool) {
		bool ? this.showAnchors() : this.hideAnchors()
	}

}