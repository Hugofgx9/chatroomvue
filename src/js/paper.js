import Two from "two.js";

export default class mySvg {
	constructor($el) {
		this.$el = $el;
		this.onMouseMove = [];

		this.drawPath();
		this.createControlsPoints();
		this.addText();

		window.addEventListener('mousemove', (ev) => {
			ev.preventDefault();
			this.onMouseMove.forEach(fn => fn(ev));
		});

	}

	drawPath() {
		this.two = new Two({
			fullscreen: true,
			autostart: true
		}).appendTo(this.$el);

		this.group = new Two.Group();

		let vertices = [
			new Two.Anchor(0, 100, null, null, 100, 100, 'M'),
			new Two.Anchor(100, 0, 30, 20, null, null, 'C'),
			new Two.Anchor(-10, -30, -50, 20, null, null, 'C')
		];

		this.path = new Two.Path(
			vertices,
			false, /* closed */
			false, /* curved */
			true,  /* manual */
		);
		this.path.stroke = "black";
		this.path.noFill();
		this.path.linewidth = 8;
		this.group.add(this.path);

		this.group.translation.set(this.two.width / 2, this.two.height / 2);
		// this.group.scale = 100;
		this.two.add(this.group);
		this.two.update();
	}

	createControlsPoints() {
		this.path.vertices.forEach((vertex, i) => {

			let circle_p = new Two.Circle(vertex.x, vertex.y, 10);
			circle_p.fill = "lightblue";
			circle_p.linewidth = 0;
			this.group.add(circle_p);

			let circle, line;
			if (i === 0) {
				line = this.two.makeLine(vertex.x, vertex.y, vertex.controls.right.x, vertex.controls.right.y);
				line.stroke = "lightblue";
				line.linewidth = 1.5;
				this.group.add(line);

				circle = new Two.Circle(vertex.controls.right.x, vertex.controls.right.y, 10);
				circle.fill = "lightblue";
				circle.linewidth = 0;
				this.group.add(circle);

				circle.update = function () {
					vertex.controls.right.x = this.translation.x;
					vertex.controls.right.y = this.translation.y;

					line._collection[1].x = this.translation.x;
					line._collection[1].y = this.translation.y;
				};

			}
			else {
				line = this.two.makeLine(vertex.x, vertex.y, vertex.controls.left.x, vertex.controls.left.y);
				line.stroke = "lightblue";
				line.linewidth = 1.5;
				this.group.add(line);

				circle = new Two.Circle(vertex.controls.left.x, vertex.controls.left.y, 10);
				circle.fill = "lightblue";
				circle.linewidth = 0;
				this.group.add(circle);

				circle.update = function () {
					vertex.controls.left.x = this.translation.x;
					vertex.controls.left.y = this.translation.y;

					line._collection[1].x = this.translation.x;
					line._collection[1].y = this.translation.y;
				};

			}

			circle_p.update = function () {
				vertex.x = this.translation.x;
				vertex.y = this.translation.y;

				line._collection[0].x = this.translation.x;
				line._collection[0].y = this.translation.y;
			};

			this.two.update();
			this.addEvents(circle);
			this.addEvents(circle_p);

		});
	}

	addEvents(el) {

		// el.bind('update', () => { console.log('event');});
		el.is_mousedown = false;
		this.group.getBoundingClientRect();

		const offset = Two.Vector.add(el.parent.parent.translation, el.parent.translation);


		const $el = el._renderer.elem;
		$el.addEventListener('mousedown', () => {
			console.log('down');
			el.is_mousedown = true
		});
		$el.addEventListener('mouseup', () => {
			console.log('up');
			el.is_mousedown = false
		});

		function mousemove(ev) {
			if (el.is_mousedown == true) {
				const x = ev.clientX - offset.x;
				const y = ev.clientY - offset.y;
				el.translation.set(x, y);
				el.update();
			}
		}
		this.onMouseMove.push(mousemove);
	}

	addText() {
		const $path = this.path._renderer.elem;

		const text = `
			hugodsfvlskjlkj lkfjdlksj lkjl skdjflkjfl skjdflfdkj lkjfs lkj
		`;

		// this.path.opacity = 0;
		this.path.linewidth = 0;
		this.text = new Two.Text('Hello', 0,0,0);
		this.group.add(this.text);
		this.two.update();
		this.text._renderer.elem.innerHTML = `<textPath xlink:href="#${$path.id}">${text}</textPath>`;

		this.text._renderer.elem.style.pointerEvents = "none"
		const $textPath = this.text._renderer.elem.querySelector('textPath');
		$textPath.innerHTML =  `<tspan>amet</tspan>` + $textPath.innerHTML;
		this.text._renderer.elem += '';
		

	}
}
	// 	<textPath xlink:href="#svg_1" startOffset="0">
	// 	Lorem ipsum dolor <tspan>amet</tspan> consectetur, adipisicing elit.
	// </textPath>