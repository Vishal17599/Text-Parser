
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
var bx = 50, by = 40;
var diagram = null;

// $(document).ready(function () {
// 	diagram = Diagram.create(document.getElementById("diagram"));
// 	diagram.setBounds(new Rect(0, 0, 500, 500));
// });

// console.log(str);

var input1 = document.querySelector('input');
var textarea = document.querySelector('textarea');
input1.addEventListener('change', () => {
	let files = input1.files;
	if (files.length == 0) return;

	const file = files[0];
	let reader = new FileReader();
	reader.onload = (e) => {
		const file = e.target.result;
		const lines = file.split(/\r\n|\n/);
		textarea.value = lines.join('\n');
	};
	reader.onerror = (e) => alert(e.target.error.name);

	reader.readAsText(file);
});
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

	console.log(arr);
	localStorage.setItem("str-array", JSON.stringify(str));
	localStorage.setItem("arr-array", JSON.stringify(arr));

	document.location.href = "tree.html";
}