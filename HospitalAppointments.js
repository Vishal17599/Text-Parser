
var Diagram = MindFusion.Diagramming.Diagram;
var DiagramLink = MindFusion.Diagramming.DiagramLink;
var ControlNode = MindFusion.Diagramming.ControlNode;

var Rect = MindFusion.Drawing.Rect;
var Point = MindFusion.Drawing.Point;

var Animation = MindFusion.Animations.Animation;
var AnimationType = MindFusion.Animations.AnimationType;
var EasingType = MindFusion.Animations.EasingType;
var AnimationEvents = MindFusion.Animations.Events;
var str = [];
var n;
var obj;
let stack = [];
var arr = [];
var zero = [];
var vec;
var bx = 120, by = 50;
var diagram = null;
function input() {
	// document.getElementById("undo").style.display = "inline-block";
	str = $('#input').val().split("\n");
	n = str.length;
	vec = new Array(n);
	obj = new Array(n);
	for (var i = 0; i < obj.length; i++) {
		obj[i] = new Array(4);
		arr[i] = new Array(0);
	}

	// console.log(n);

	let p = 3;
	// console.log(str[1]);
	for (var i = 0; i < n; i++) {
		let size = 0;
		for (var j = 0; j < str[i].length; j++) {
			if (str[i][j] != '-') break;
			else size++;
		}
		// console.log(size);
		vec[size / 2] = i;
		if (size == 0) {
			p++;
			// arr[0].push(i);
			zero.push(i);
		}
		else {
			arr[vec[(size / 2) - 1]].push(i);
		}
		// console.log(size);
		let len = str[i].length;
		// let s = str[i].search(',');
		str[i] = str[i].substring(size);
		obj[size / 2].push(str[i]);
	}
	diagram = Diagram.create(document.getElementById("diagram"));
	diagram.setVirtualScroll(true);


	// create an Overview component that wraps the "overview" canvas
	// var overview = MindFusion.Diagramming.Overview.create(document.getElementById("overview"));
	// overview.setDiagram(diagram);

	// create an ZoomControl component that wraps the "zoomer" canvas
	var zoomer = MindFusion.Controls.ZoomControl.create(document.getElementById("zoomer"));
	zoomer.setTarget(diagram);

	var defaultTemplate = `
		<p>Choose a state:<p>
		<div><select data-interactive="true" data-event-change="selectClick" name="states" id="states">
		<option value="none" selected></option>
		<option value="Ohio">India</option>
		<option value="South Dakota">South Dakota</option>
		<option value="Washington">Washington</option>
		<option value="Texas">Texas</option>
		</select>
		</div>`;

	diagram.setDefaultControlTemplate(defaultTemplate);

	var id = 0;
	var node = new MindFusion.Diagramming.ControlNode(diagram);
	len = str[id].search(',');
	s = str[0].substring(len + 1, str[0].length);
	var val = `<p>` + s + `<p>` + `<div><select data-interactive="true" data-event-change="selectClick" name= "${id}" id= "${id}"><option value="none" selected></option>`;

	if (arr[id].length > 0) {
		for (var i = 0; i < arr[id].length; i++) {

			len1 = str[arr[id][i]].search(',');
			s1 = str[arr[id][i]].substring(3, len1);
			val += `<option value=` + arr[id][i] + `>` + s1 + `</option>`;
		}
	}
	val += `<option value="NotSure">NotSure</option>`;
	val += `</select></div>`;
	node.setTemplate(val);
	node.setBounds(new Rect(40, 10, bx, by));
	node.setId(id);
	diagram.addItem(node);
	diagram.resizeToFitItems(10);
	// option(0);
}


function selectClick(e, sender) {
	var selectControl = sender.getContent().getElementsByTagName("select")[0];
	deleteNode(sender.id);
	console.log(sender.id);
	// console.log(selectControl.value);
	if (selectControl.value != "none" && selectControl.value != "NotSure") {
		nextoption(selectControl.value, sender);
	}

	else if (selectControl.value == "NotSure") {
		notSure(sender.id, sender);
	}

}

function notSure(id, originNode) {
	var node = new MindFusion.Diagramming.ControlNode(diagram);
	var layout = new MindFusion.Graphs.TreeLayout();
	layout.root = node;
	layout.direction = MindFusion.Graphs.LayoutDirection.TopToBottom;
	layout.keepRootPosition = true;
	layout.levelDistance = 10;
	linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;
	if (arr[id].length > 0) {
		// console.log(arr[id].length);
		for (var i = 0; i < arr[id].length; i++) {
			node = new MindFusion.Diagramming.ControlNode(diagram);
			var ids = arr[id][i];
			// console.log(ids);
			len = str[ids].search(',');
			s = str[ids].substring(len + 1, str[ids].length);
			var val = `<p>` + str[ids] + `<p>`;
			if (arr[ids].length > 0) {
				val += `<div><select data-interactive="true" data-event-change="selectClick" name= "${ids}" id= "${ids}"><option value="none" selected></option>`;
				for (var j = 0; j < arr[ids].length; j++) {

					len1 = str[arr[ids][j]].search(',');
					s1 = str[arr[ids][j]].substring(3, len1);
					val += `<option value=` + arr[ids][j] + `>` + s1 + `</option>`;
				}
				val += `<option value="NotSure">NotSure</option>`;
				val += `</select></div>`;
			}
			node.setTemplate(val);
			node.setBounds(new Rect(originNode.getBounds().x, originNode.getBounds().y + 60, bx, by));
			// node.setLocked(true);
			// node.setVisible(false);
			node.setStroke('#003466');
			node.setId(ids);
			diagram.addItem(node);
			var link = new DiagramLink(diagram, originNode, node);
			link.setHeadShape('Triangle');
			link.setHeadBrush('#003466');
			link.setStroke('#003466');
			link.setLocked(true);
			diagram.addItem(link);
			// createAnimatedLink(originNode, node);
		}
		diagram.arrange(layout);
		diagram.resizeToFitItems(10);
	}
}

function nextoption(id, originNode) {
	var node = new MindFusion.Diagramming.ControlNode(diagram);
	len = str[id].search(',');
	s = str[id].substring(len + 1, str[id].length);
	var val = `<p>` + s + `<p>`;
	if (arr[id].length > 0) {
		val += `<div><select data-interactive="true" data-event-change="selectClick" name= "${id}" id= "${id}"><option value="none" selected></option>`;
		for (var i = 0; i < arr[id].length; i++) {

			len1 = str[arr[id][i]].search(',');
			s1 = str[arr[id][i]].substring(3, len1);
			val += `<option value=` + arr[id][i] + `>` + s1 + `</option>`;
		}
		val += `<option value="NotSure">NotSure</option>`;
		val += `</select></div>`;
	}
	node.setTemplate(val);
	// ay += 50;
	node.setBounds(new Rect(originNode.getBounds().x, originNode.getBounds().y + 60, bx, by));
	node.setLocked(true);
	node.setVisible(false);
	node.setId(id);
	diagram.addItem(node);

	createAnimatedLink(originNode, node);
	diagram.resizeToFitItems(10);
}

function createAnimatedLink(originNode, node) {
	var link = new DiagramLink(diagram, originNode, node);
	link.setHeadShape('Triangle');
	link.setHeadBrush('#003466');
	link.setStroke('#003466');
	link.setLocked(true);
	diagram.addItem(link);

	// console.log(originNode.id);
	// console.log(node.id);
	var ep = link.getEndPoint();
	link.setEndPoint(link.getStartPoint());
	var animation = new Animation(link, { fromValue: link.getStartPoint(), toValue: ep, animationType: AnimationType.Bounce, easingType: EasingType.EaseOut, duration: 1000 }, onUpdateLink);

	animation.addEventListener(AnimationEvents.animationComplete, function (sender, args) {

		node.setVisible(true);


	});

	animation.start();
}

function deleteNode(id) {

	var nodes = diagram.nodes.filter(function (p) {
		return p.id === id;
	});

	if (nodes.length > 0) {
		deleteRecursively(nodes[0].getOutgoingLinks());
	}
}

function deleteRecursively(links) {
	for (var i = links.length - 1; i >= 0; i--) {
		var node = links[i].getDestination();
		var nlinks = node.getOutgoingLinks();
		deleteRecursively(nlinks);
		diagram.removeItem(node);


	}
}

// a custom update callback for link animations
function onUpdateLink(animation, animationProgress) {
	var link = animation.item;
	var pointA = animation.getFromValue(),
		pointB = animation.getToValue();

	link.setEndPoint(
		new Point(
			pointA.x + (pointB.x - pointA.x) * animationProgress,
			pointA.y + (pointB.y - pointA.y) * animationProgress));
	link.invalidate();
}
