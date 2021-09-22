import { looseIndexOf } from "@vue/shared";
import Two from "two.js";

export default class mySvg {
	constructor($el) {
		this.$el = $el;

		this.drawPath();
		this.createControlsPoints();

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

				circle.onUpdate = function () {
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

				circle.onUpdate = function () {
					vertex.controls.left.x = this.translation.x;
					vertex.controls.left.y = this.translation.y;

					line._collection[1].x = this.translation.x;
					line._collection[1].y = this.translation.y;
				};

			}

			circle_p.onUpdate = function () {
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
		$el.addEventListener('mousedown', () => el.is_mousedown = true);
		$el.addEventListener('mouseup', () => el.is_mousedown = false);

		//create global window event

		window.addEventListener('mousemove', (ev) => {
			ev.preventDefault();
			if (el.is_mousedown == true) {
				const x = ev.clientX - offset.x;
				const y = ev.clientY - offset.y;
				el.translation.set(x, y);
				el.onUpdate();
			}
		});
	}

	createControlsPoints2() {
		const radius = 0.5;
		const editColor = "blue";

		this.path.vertices.forEach(anchor => {

			const p = this.two.makeCircle(0, 0, radius / 4);
			const l = this.two.makeCircle(0, 0, radius / 4);
			const r = this.two.makeCircle(0, 0, radius / 4);

			p.translation.copy(anchor);
			l.translation.copy(anchor.controls.left).addSelf(anchor);
			r.translation.copy(anchor.controls.right).addSelf(anchor);
			p.noStroke().fill = l.noStroke().fill = r.noStroke().fill = editColor;

			const ll = new Two.Path([
				new Two.Anchor().copy(p.translation),
				new Two.Anchor().copy(l.translation)
			]);
			const rl = new Two.Path([
				new Two.Anchor().copy(p.translation),
				new Two.Anchor().copy(r.translation)
			]);
			rl.noFill().stroke = ll.noFill().stroke = editColor;
			rl.linewidth = ll.linewidth = 0.05;

			const group = this.two.makeGroup(rl, ll, p, l, r);
			// group.translation.addSelf(this.group.translation);
			this.group.add(group);

			p.translation.bind(Two.Events.change, function () {
				anchor.copy(this);
				l.translation.copy(anchor.controls.left).addSelf(this);
				r.translation.copy(anchor.controls.right).addSelf(this);
				ll.vertices[0].copy(this);
				rl.vertices[0].copy(this);
				ll.vertices[1].copy(l.translation);
				rl.vertices[1].copy(r.translation);
			});
			l.translation.bind(Two.Events.change, function () {
				anchor.controls.left.copy(this).subSelf(anchor);
				ll.vertices[1].copy(this);
			});
			r.translation.bind(Two.Events.change, function () {
				anchor.controls.right.copy(this).subSelf(anchor);
				rl.vertices[1].copy(this);
			});

			// Update the renderer in order to generate the actual elements.
			this.two.update();
		});
	}
}