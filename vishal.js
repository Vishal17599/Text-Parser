var str = [];
var n;
var obj;
let stack = [];
function input() {
    str = $('#input').val().split("\n");
    n = str.length;
    obj = new Array(n);
    for (var i = 0; i < obj.length; i++) {
        obj[i] = new Array(4);
    }

    // console.log(n);

    let p = 3;
    // console.log(str[1]);
    for (var i = 0; i < n; i++) {
        let size = str[i].split("-").length - 1;
        // console.log(size);
        if (size == 0) {
            p++;
        }
        // console.log(size);
        let len = str[i].length;
        let s = str[i].search(',');
        str[i] = p.toString() + str[i].substring(s + 1, len)
        obj[size / 2].push(str[i]);
    }

    // for (i = 0; i < n; i++)
    //     console.log(obj[i]);
    stack.push(0);
    stack.push(4);
    var rootques = String(str[0].substring(1, str[0].length));

    document.getElementById("main").style.display = "block";

    document.getElementById("ques").innerHTML = rootques;
    var ul = document.getElementById("log");
    var candidate = rootques;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(candidate));
    ul.appendChild(li);
}


var level = 1;
var para = 4;


function notSure() {
    var j = -1, f = 0, t = 0;
    // para++;
    for (let i = 4; i < obj[level].length; i++) {
        if (obj[level][i][0] == para.toString() && f == 0) {
            f = i;
        }
        else if (obj[level][i][0] == para.toString() && f != 0) {
            j = i;
            break;
        }
    }
    if (obj[level][f][obj[level][f].length - 1] == "?") {
        stack.push(level);
        stack.push(f);
        document.getElementById("ques").innerHTML = obj[level][f].substring(1, obj[level][f].length);
        level++;
        t = 1;
    }
    else {
        //Add it to Log(This is the statement without question mark)
    }
    if (obj[level][j][obj[level][j].length - 1] == "?" && t == 0) {
        stack.push(level);
        stack.push(j);
        document.getElementById("ques").innerHTML = obj[level][j].substring(1, obj[level][j].length);
        level++;
    }
    else {
        //Add it to Log(This is the statement without question mark)
    }
}






function undo() {
    if (stack.length > 2) {
        let b = stack.pop();
        let a = stack.pop();
        b = stack.pop();
        a = stack.pop();
        console.log(a);
        console.log(b);
        console.log(obj[a][b].substring(1, obj[a][b].length));
        document.getElementById("res").style.display = "none";
        document.getElementById("ques").style.display = "block";
        document.getElementById("ans1").style.display = "inline-block";
        document.getElementById("ans2").style.display = "inline-block";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("ques").innerHTML = obj[a][b].substring(1, obj[a][b].length);
        stack.push(a);
        stack.push(b);
        level = a + 1;

        var list = document.getElementById("log");
        list.removeChild(list.lastChild);
        list.removeChild(list.lastChild);

    }
}

function next() {
    level = 0;
    if (obj[level][para] == undefined)
        alert("End of Paragraph");
    // console.log(obj[level][para]);
    else {
        stack.push(level);
        stack.push(para);


        var ul = document.getElementById("log");
        var candidate = obj[level][para].substring(1, obj[level][para].length);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(candidate));
        ul.appendChild(li);

        document.getElementById("res").style.display = "none";
        document.getElementById("ques").style.display = "block";
        document.getElementById("ques").innerHTML = obj[level][para].substring(1, obj[level][para].length);
        document.getElementById("ans1").style.display = "inline-block";
        document.getElementById("ans2").style.display = "inline-block";
        document.getElementById("ans3").style.display = "none";
        level++;
    }
    // para++;
    // console.log(para);
}


function vishalyes() {
    var ul = document.getElementById("log");
    var candidate = "Yes";
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(candidate));
    ul.appendChild(li);

    // document.getElementById("ans3").style.display = "none";
    // console.log(obj[level][para]);
    // if (para != 4)
    //     para++;
    var j = -1;
    // console.log(para);
    for (let i = 4; i < obj[level].length; i++) {
        if (obj[level][i][0] == para.toString()) {
            j = i;
            break;
        }
    }
    // console.log(obj[level][j]);
    stack.push(level);
    stack.push(j);
    if (j == -1) {
        alert("End of Paragraph");
    }
    else {
        if (obj[level][j][obj[level][j].length - 1] == "?") {
            // console.log(obj[level][j]);
            document.getElementById("ques").innerHTML = obj[level][j].substring(1, obj[level][j].length);
            var candidate = obj[level][j].substring(1, obj[level][j].length);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(candidate));
            ul.appendChild(li);
            level++;
        }
        else {
            document.getElementById("ques").style.display = "none";
            document.getElementById("ans1").style.display = "none";
            document.getElementById("ans2").style.display = "none";
            document.getElementById("ans3").style.display = "inline-block";
            document.getElementById("res").style.display = "block";
            // console.log(obj[level][j]);
            document.getElementById("res").innerHTML = obj[level][j].substring(1, obj[level][j].length);
            var candidate = obj[level][j].substring(1, obj[level][j].length);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(candidate));
            ul.appendChild(li);
            para++;
        }
    }
}
function vishalNo() {

    var ul = document.getElementById("log");

    var candidate = "No";
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(candidate));
    ul.appendChild(li);

    // if (para != 4)
    //     para--;
    var j = -1, f = 0;
    // para++;
    for (let i = 4; i < obj[level].length; i++) {
        if (obj[level][i][0] == para.toString() && f == 0) {
            f = 1;
        }
        else if (obj[level][i][0] == para.toString() && f == 1) {
            j = i;
            break;
        }
    }
    stack.push(level);
    stack.push(j);
    // console.log(j);
    // console.log(obj[level][j]);
    if (j == -1)
        alert("End of Paragraph");

    else {
        if (obj[level][j][obj[level][j].length - 1] == "?") {
            // console.log(obj[level][j]);
            document.getElementById("ques").innerHTML = obj[level][j].substring(1, obj[level][j].length);
            var candidate = obj[level][j].substring(1, obj[level][j].length);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(candidate));
            ul.appendChild(li);
            level++;
        }
        else {
            document.getElementById("ques").style.display = "none";
            document.getElementById("ans1").style.display = "none";
            document.getElementById("ans2").style.display = "none";
            document.getElementById("ans3").style.display = "inline-block";
            document.getElementById("res").style.display = "block";
            document.getElementById("res").innerHTML = obj[level][j].substring(1, obj[level][j].length);

            var candidate = obj[level][j].substring(1, obj[level][j].length);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(candidate));
            ul.appendChild(li);
            para++;
        }
    }

}