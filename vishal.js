var str = [];
var n;
var obj;
let stack = [];
var arr = [];
var zero = [];
var vec;
var ptr = 0;

function input() {
    document.getElementById("undo").style.display = "inline-block";
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
    option(0);
}

function notSure() {
    // Todo update the logs 
    console.log(document.getElementById("notSure").value);
    let line = document.getElementById("notSure").value;
    let line2 = 0;
    var div = document.getElementById("res");
    while (div.lastElementChild) {
        div.removeChild(div.lastElementChild);
    }
    var s = "";
    for (var i = 0; i < arr[line].length; i++) {
        if (arr[arr[line][i]].length == 0)
            s += "\n" + str[arr[line][i]] + "\n";
        else
            line2 = arr[line][i];
    }
    if (line2 != 0) {
        document.getElementById("notSure").value = line2;
        stack.push(line2);
        s += str[line2];
        document.getElementById("ques").innerHTML = s;
        for (var i = 0; i < arr[line2].length; i++) {
            len1 = str[arr[line2][i]].search(',');
            s1 = str[arr[line2][i]].substring(3, len1);

            let candidate = s1;
            let btn = document.createElement("BUTTON");
            let t = document.createTextNode(candidate);

            btn.setAttribute("id", arr[line2][i]);
            btn.setAttribute("class", "btn btn-info");
            btn.setAttribute("style", "margin:4px");
            btn.onclick = function () {
                option(btn.id);
            }
            btn.appendChild(t);
            div.appendChild(btn);
        }
    }
    else {
        document.getElementById("ques").innerHTML = s;
    }
    // var ul = document.getElementById("log");
    // let candidate = "Not Sure";
    // let li = document.createElement("li");
    // li.appendChild(document.createTextNode(candidate));
    // ul.appendChild(li);


    // var j = -1, f = 0, t = 0;
    // for (let i = 4; i < obj[level].length; i++) {
    //     if (obj[level][i][0] == para.toString() && f == 0) {
    //         f = i;
    //     }
    //     else if (obj[level][i][0] == para.toString() && f != 0) {
    //         j = i;
    //         break;
    //     }
    // }
    // if (obj[level][f][obj[level][f].length - 1] == "?") {
    //     stack.push(level);
    //     stack.push(f);
    //     var j1 = -1, f1 = 0, len1;
    //     let s1, s2;
    //     for (let i = 4; i < obj[level + 1].length; i++) {
    //         if (obj[level][i][0] == para.toString() && f1 == 0) {
    //             f1 = i;
    //             len1 = obj[level + 1][f1].search(',');
    //             s1 = obj[level + 1][f1].substring(3, len1);
    //         }
    //         else if (obj[level + 1][i][0] == para.toString() && f1 != 0) {
    //             j1 = i;
    //             len1 = obj[level + 1][j1].search(',');
    //             s2 = obj[level + 1][j1].substring(3, len1);
    //             break;
    //         }
    //     }
    //     document.getElementById("ans1").innerHTML = s1;
    //     document.getElementById("ans2").innerHTML = s2;
    //     document.getElementById("ans1").value = s1;
    //     document.getElementById("ans2").value = s2;
    //     let start = obj[level][f].search(',');
    //     if (start == -1) start = 0;
    //     document.getElementById("ques").innerHTML = obj[level][f].substring(start + 1, obj[level][f].length);
    //     let candidate = obj[level][f].substring(start + 1, obj[level][f].length);
    //     let li = document.createElement("li");
    //     li.appendChild(document.createTextNode(candidate));
    //     ul.appendChild(li);

    //     level++;
    //     t = 1;
    // }

    // else if (obj[level][j][obj[level][j].length - 1] == "?" && t == 0) {
    //     stack.push(level);
    //     stack.push(j);
    //     var j1 = -1, f1 = 0, len1;
    //     let s1, s2;
    //     for (let i = 4; i < obj[level + 1].length; i++) {
    //         if (obj[level][i][0] == para.toString() && f1 == 0) {
    //             f1 = i;
    //             len1 = obj[level + 1][f1].search(',');
    //             s1 = obj[level + 1][f1].substring(3, len1);
    //         }
    //         else if (obj[level + 1][i][0] == para.toString() && f1 != 0) {
    //             j1 = i;
    //             len1 = obj[level + 1][j1].search(',');
    //             s2 = obj[level + 1][j1].substring(3, len1);
    //             break;
    //         }
    //     }
    //     document.getElementById("ans1").innerHTML = s1;
    //     document.getElementById("ans2").innerHTML = s2;
    //     document.getElementById("ans1").value = s1;
    //     document.getElementById("ans2").value = s2;
    //     let start = obj[level][j].search(',');
    //     if (start == -1) start = 0;
    //     document.getElementById("ques").innerHTML = obj[level][j].substring(start + 1, obj[level][j].length);
    //     let candidate = obj[level][j].substring(start + 1, obj[level][j].length);
    //     let li = document.createElement("li");
    //     li.appendChild(document.createTextNode(candidate));
    //     ul.appendChild(li);
    //     level++;
    // }
    // else {
    //     stack.push(level);
    //     stack.push(j);
    //     document.getElementById("ques").style.display = "none";
    //     document.getElementById("ans1").style.display = "none";
    //     document.getElementById("ans2").style.display = "none";
    //     document.getElementById("ans3").style.display = "inline-block";
    //     document.getElementById("res").style.display = "block";
    //     document.getElementById("res").innerHTML = obj[level][f].substring(1, obj[level][f].length) + " or " + obj[level][j].substring(1, obj[level][j].length);
    //     let candidate = obj[level][f].substring(1, obj[level][f].length) + " or " + obj[level][j].substring(1, obj[level][j].length);
    //     let li = document.createElement("li");
    //     li.appendChild(document.createTextNode(candidate));
    //     ul.appendChild(li);
    //     para++;
    // }

}


function undo() {
    document.getElementById("ans3").style.display = "none";
    if (stack.length > 1) {
        let a = stack.pop();
        console.log(a);
        let b = stack.pop();
        console.log(b);
        var list = document.getElementById("log");
        list.removeChild(list.lastChild);
        list.removeChild(list.lastChild);
        option(b);
    }
}

function next() {
    ptr++;
    document.getElementById("ans3").style.display = "none";
    if (ptr < zero.length)
        option(zero[ptr]);
    else
        alert("End of Paragraph");
}


function option(id) {
    stack.push(id);
    // document.getElementById("notSure").value = id;
    var div = document.getElementById("res");
    var ul = document.getElementById("log");
    var candidate = str[id];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(candidate));
    ul.appendChild(li);
    while (div.lastElementChild) {
        div.removeChild(div.lastElementChild);
    }
    len = str[id].search(',');
    s = str[id].substring(len + 1, str[id].length);
    document.getElementById("ques").innerHTML = s;
    if (arr[id].length > 0) {
        for (var i = 0; i < arr[id].length; i++) {
            len1 = str[arr[id][i]].search(',');
            s1 = str[arr[id][i]].substring(3, len1);

            let candidate = s1;
            let btn = document.createElement("BUTTON");
            let t = document.createTextNode(candidate);

            btn.setAttribute("id", arr[id][i]);
            btn.setAttribute("class", "btn btn-info");
            btn.setAttribute("style", "margin:4px");
            btn.onclick = function () {
                option(btn.id);
            }
            btn.appendChild(t);
            div.appendChild(btn);
        }
    }
    else {
        document.getElementById("ans3").style.display = "inline-block";
    }
}
