let two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(this.$refs.paper);

let g = new Two.Group();


let vertices = [
	new Two.Anchor(0, 1, null, null, 1, 1, 'M'),
	new Two.Anchor(1, 0, 0, 0, null, null, 'C')		
];

vertices[0].relative = false;
vertices[1].relative = false;

let p = new Two.Path(
	vertices,
	false, /* closed */
	false, /* curved */
	true,  /* manual */
);
p.stroke = "black";
p.linewidth = 0.05;
g.add(p);

console.log( two.renderer.domElement );




/* show anchors and control points */
// for (let i = 0; i < p.vertices.length; i++) {
// 	let vertex = p.vertices[i];

// 	let circle = new Two.Circle(vertex.x, vertex.y, 0.1);
// 	circle.fill = "blue";
// 	circle.linewidth = 0;
// 	g.add(circle);
// 	circle.listen()

// 	if (i === 0) {
// 		let liner = two.makeLine(vertex.x, vertex.y, vertex.controls.right.x, vertex.controls.right.y);
// 		liner.stroke = "red";
// 		liner.linewidth = 0.05;
// 		g.add(liner);

// 		let circler = new Two.Circle(vertex.controls.right.x, vertex.controls.right.y, 0.1);
// 		circler.fill = "red";
// 		circler.linewidth = 0;
// 		g.add(circler);
// 	} else {
// 		let linel = two.makeLine(vertex.x, vertex.y, vertex.controls.left.x, vertex.controls.left.y);
// 		linel.stroke = "green";
// 		linel.linewidth = 0.05;
// 		g.add(linel);

// 		let circlel = new Two.Circle(vertex.controls.left.x, vertex.controls.left.y, 0.1);
// 		circlel.fill = "green";
// 		circlel.linewidth = 0;
// 		g.add(circlel);
// 	}

// }
/* show anchors and control points */

g.translation.set(two.width / 2, two.height / 2);
g.scale = 100;
two.add(g);
two.update();







// --------------------------------------




addBackdrop(50);

const radius = 40, editColor = 'rgb(79, 128, 255)';
// const type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
const two = new Two({
	// type: Two.Types[type],
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

const letter = two.interpret(document.querySelector('.assets svg'));
letter.linewidth = radius;
letter.cap = letter.join = 'round';
letter.noFill().stroke = '#333';

const resize = () => {
	const cx = two.width / 2;
	const cy = two.height / 2;
	const rect = letter.getBoundingClientRect();
	letter.translation.set(cx - rect.width / 2, cy - rect.height / 2);
};

two.bind('resize', resize);
resize();

letter.children.forEach((polygon) => {
	polygon.vertices.forEach((anchor) => {

		const p = two.makeCircle(0, 0, radius / 4);
		const l = two.makeCircle(0, 0, radius / 4);
		const r = two.makeCircle(0, 0, radius / 4);

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

		const g = two.makeGroup(rl, ll, p, l, r);
		g.translation.addSelf(polygon.translation);
		letter.add(g);

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
		two.update();

		// Add Interactivity
		addInteractivity(p);
		addInteractivity(l);
		addInteractivity(r);

	});

});

function addInteractivity(shape) {

	const offset = Two.Vector.add(shape.parent.parent.translation, shape.parent.translation);

	const drag = function (e) {
		e.preventDefault();
		const x = e.clientX - offset.x;
		const y = e.clientY - offset.y;
		shape.translation.set(x, y);
	};
	const touchDrag = function (e) {
		e.preventDefault();
		const touch = e.originalEvent.changedTouches[0];
		drag({
			preventDefault: function () { },
			clientX: touch.pageX,
			clientY: touch.pageY
		});
		return false;
	};
	const dragEnd = function (e) {
		e.preventDefault();
		two.renderer.domElement
			.unbind('mousemove', drag)
			.unbind('mouseup', dragEnd);
	};
	const touchEnd = function (e) {
		e.preventDefault();
		$(window)
			.unbind('touchmove', touchDrag)
			.unbind('touchend', touchEnd);
		return false;
	};

	$(shape._renderer.elem)
		.css({
			cursor: 'pointer'
		})
		.bind('mousedown', function (e) {
			e.preventDefault();
			two.renderer.domElement
				.bind('mousemove', drag)
				.bind('mouseup', dragEnd);
		})
		.bind('touchstart', function (e) {
			e.preventDefault();
			$(window)
				.bind('touchmove', touchDrag)
				.bind('touchend', touchEnd);
			return false;
		});

}

function addBackdrop(d) {

	const dimensions = d || 50;
	const two = new Two({
		type: Two.Types.canvas,
		width: dimensions,
		height: dimensions
	});

	const r = dimensions / 10;
	const center = dimensions / 2;

	const a = two.makeLine(center - r, center, center + r, center);
	const b = two.makeLine(center, center - r, center, center + r);

	a.stroke = b.stroke = '#aaa';
	a.linewidth = b.linewidth = 0.25;

	two.update();

	const style = document.body.style;
	style.backgroundImage = 'url(' + two.renderer.domElement.toDataURL() + ')';
	style.backgroundRepeat = 'repeat';
	style.backgroundSize = dimensions + 'px ' + dimensions + 'px';
}
