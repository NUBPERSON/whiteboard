//import { Socket } from "socket.io";

let board = document.querySelector("canvas");
let body = document.querySelector("body");
let line = document.querySelector(".fa-grip-lines-vertical");
let rect = document.querySelector(".fa-square-full");
let pen = document.querySelector(".fa-pencil-alt");
let era = document.querySelector(".eraser")
// let colortask=document.querySelector(".check");
let redc = document.querySelector(".red");
let bluec = document.querySelector(".blue");
let greenc = document.querySelector(".green");
let value = "black";
let size = document.querySelectorAll(".size");
let stbuttton = document.querySelector(".stbut");
let downloade = document.querySelector(".Downloade");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
// colortask.style.backgroundColor=value;

let pcolor = "black";
let tracker = [];
let cnt = 0;

board.height = window.innerHeight;
board.width = window.innerWidth;
let recs = 0, lins = 0, penc = 0, eras = 0;

let tool = board.getContext('2d');
let boarddim = board.getBoundingClientRect(); //start end of the canvas board
undo.addEventListener("click", function (e) {
    if (cnt > 0)
        cnt--;
    let obj = {
        value: cnt,
        tracker

    }
    lins = 0;
    penc = 0;
    eras = 0;
    recs = 0;

    undoredocanvas(obj);

});
redo.addEventListener("click", function (e) {
    if (cnt < tracker.length - 1)
        cnt++;
    let obj = {
        value: cnt,
        tracker

    }
    lins = 0;
    penc = 0;
    eras = 0;
    recs = 0;
    undoredocanvas(obj);
});
function undoredocanvas(obj) {
   // console.log(cnt);
   //hihi
    cnt = obj.value;
    tracker = obj.tracker;
    let img = new Image();
    let url = tracker[cnt];
    img.src = url;
    img.onload = function (e) {
        tool.drawImage(img, 0, 0, board.width, board.height);
    }
}
// tool.fillStyle="green";
//tool.fillRect(0,0,200,200);
//tool.strokeStyle="red";
//tool.strokeRect(100,100,40,40);
pen.addEventListener("click", function () {
    if (penc == 1) {
        size[2].style.display = "flex";
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
            // console.log(i);
        }

    }

    tool.strokeStyle = pcolor;
    //tool.lineWidth=1;
    lins = 0;
    recs = 0;
    penc = 1;
    eras = 0
});
line.addEventListener("click", function () {
    if (lins == 1) {
        size[1].style.display = "flex";
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
            //console.log(i);
        }

    }
    tool.strokeStyle = pcolor;
    //tool.lineWidth=1;
    lins = 1;
    recs = 0;
    penc = 0;
    eras = 0;
});
rect.addEventListener("click", function () {
    if (recs == 1) {
        size[0].style.display = "flex";
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
            // console.log(i);
        }

    }
    tool.strokeStyle = pcolor;
    // tool.lineWidth=1;

    recs = 1;
    lins = 0;
    penc = 0;
    eras = 0;
});
era.addEventListener("click", function () {
    if (eras == 1) {
        size[3].style.display = "flex";
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
            // console.log(i);
        }

    }
    tool.strokeStyle = "white";
    // tool.lineWidth=10;
    recs = 0;
    lins = 0;
    penc = 0;
    eras = 1;
});
redc.addEventListener("click", function () {
    value = "red";
    pcolor = value;
    tool.strokeStyle = value;
    // colortask.style.backgroundColor=value;
});
greenc.addEventListener("click", function () {
    value = "green";
    pcolor = value;
    tool.strokeStyle = value;
});
bluec.addEventListener("click", function () {
    value = "blue";
    pcolor = value;
    tool.strokeStyle = value;
});

let ixpos, iypos, fxpos, fypos;
let pressed = 0;
board.addEventListener("mousedown", function (e) {
   // console.log("hi"+tool.strokeStyle);
    ixpos = e.clientX - boarddim.left;
    iypos = e.clientY - boarddim.top;
    if (lins || penc || eras) {
       
         let data={
            ixpos: ixpos,
            iypos: iypos,
            color:tool.strokeStyle,
            width:tool.lineWidth
         }
          console.log(data.color ,value);
          socket.emit("beginpath",data);

        // tool.beginPath();
        // tool.moveTo(ixpos, iypos);
    }
    if (penc || eras)
        pressed = 1;
    // console.log(xpos+" "+ypos);

});
board.addEventListener("mousemove", function (e) {
    fxpos = e.clientX - boarddim.left;
    fypos = e.clientY - boarddim.top;
    if ((penc || eras) && pressed) {
        //tool.beginPath();
       let data={
           fxpos: fxpos,
           fypos: fypos,
           color:tool.strokeStyle,
           width:tool.lineWidth
        }
        //console.log(data.color);
      socket.emit("movepath",data);
        // tool.lineTo(fxpos, fypos);
        // tool.stroke();
        // tool.beginPath();
        // tool.moveTo(fxpos, fypos);
    }
});
board.addEventListener("mouseup", function (e) {
    fxpos = e.clientX - boarddim.left;
    fypos = e.clientY - boarddim.top;
    if (lins || penc || eras) {
        let data={
            fxpos: fxpos,
            fypos: fypos,
            color:tool.strokeStyle,
            width:tool.lineWidth
         }
       socket.emit("uppath",data);
        // tool.lineTo(fxpos, fypos);
        // tool.stroke(); //costly so done at last shows the line

    }
    if (recs) {
        let data={
            ixpos: ixpos,
            iypos: iypos,
            fxpos: fxpos,
            fypos: fypos,
            color:tool.strokeStyle,
            width:tool.lineWidth
         }
        socket.emit("rect",data);
        
      //  tool.strokeRect(ixpos, iypos, fxpos - ixpos, fypos - iypos);
        
    }
    if (penc || eras)
        pressed = 0;
    if (lins || penc || eras || recs) {
        let url = board.toDataURL();
        tracker.push(url);
        cnt = tracker.length - 1;
    }


});

size[0].addEventListener("click", function (e) {
    //click kis pe hua hai
    // console.log(e.target);
    //event listner kis pe lga hai
    //console.log(e.currentTarget);
    //console.log("hi");
    let color = tool.strokeStyle;
   // console.log(color);
    let classarr = ["size1", "size2", "size3", "size4"];
    let allclasesses = e.target.classList;
    let firstclass = allclasesses[0];
    // console.log(firstclass);
    let res = classarr.includes(firstclass);
    if (res) {
        if (firstclass == "size1") {
            tool.lineWidth = 1;
        }
        if (firstclass == "size2") {
            tool.lineWidth = 5;
            //console.log("5");
        }
        if (firstclass == "size3") {
            tool.lineWidth = 10;
        }
        if (firstclass == "size4") {
            tool.lineWidth = 15;
        }
    }
    //console.log(color);
    tool.strokeStyle = color;

});

size[1].addEventListener("click", function (e) {
    //click kis pe hua hai
    // console.log(e.target);
    //event listner kis pe lga hai
    //console.log(e.currentTarget);
    //console.log("hi");
    let classarr = ["size1", "size2", "size3", "size4"];
    let allclasesses = e.target.classList;
    let firstclass = allclasesses[0];
    // console.log(firstclass);
    let res = classarr.includes(firstclass);
    if (res) {
        if (firstclass == "size1") {
            tool.lineWidth = 1;
        }
        if (firstclass == "size2") {
            tool.lineWidth = 5;
            //  console.log("5");
        }
        if (firstclass == "size3") {
            tool.lineWidth = 10;
        }
        if (firstclass == "size4") {
            tool.lineWidth = 15;
        }
    }


});

size[2].addEventListener("click", function (e) {
    //click kis pe hua hai
    // console.log(e.target);
    //event listner kis pe lga hai
    //console.log(e.currentTarget);
    //console.log("hi");
    let classarr = ["size1", "size2", "size3", "size4"];
    let allclasesses = e.target.classList;
    let firstclass = allclasesses[0];
    // console.log(firstclass);
    let res = classarr.includes(firstclass);
    if (res) {
        if (firstclass == "size1") {
            tool.lineWidth = 1;
        }
        if (firstclass == "size2") {
            tool.lineWidth = 5;
            //  console.log("5");
        }
        if (firstclass == "size3") {
            tool.lineWidth = 10;
        }
        if (firstclass == "size4") {
            tool.lineWidth = 15;
        }
    }


});

size[3].addEventListener("click", function (e) {
    //click kis pe hua hai
    // console.log(e.target);
    //event listner kis pe lga hai
    //console.log(e.currentTarget);
    //console.log("hi");
    let classarr = ["size1", "size2", "size3", "size4"];
    let allclasesses = e.target.classList;
    let firstclass = allclasesses[0];
    // console.log(firstclass);
    let res = classarr.includes(firstclass);
    if (res) {
        if (firstclass == "size1") {
            tool.lineWidth = 5;
        }
        if (firstclass == "size2") {
            tool.lineWidth = 15;
          //  console.log("5");
        }
        if (firstclass == "size3") {
            tool.lineWidth = 20;
        }
        if (firstclass == "size4") {
            tool.lineWidth = 30;
        }
    }


});
stbuttton.addEventListener("click", function (e) {
    let qwe = document.createElement("div");
    qwe.setAttribute("class", "sticky");
    qwe.innerHTML = ` <div class="header">
      <div class="right"></div>
      <div class="wrong"></div>
  </div>
  <div >
      <textarea cols="30" rows="10" class="textarea"></textarea>
  </div>`;
    let sticker = document.querySelector('.sticker');
    sticker.appendChild(qwe);
    let minim = qwe.querySelector(".right");
    let close = qwe.querySelector(".wrong");
    let clicked = 0;
    let txtarea = qwe.querySelector("textarea");

    qwe.onmousedown = function (event) {

        let shiftX = event.clientX - qwe.getBoundingClientRect().left;
        let shiftY = event.clientY - qwe.getBoundingClientRect().top;

        qwe.style.position = 'absolute';
        qwe.style.zIndex = 1000;
        //document.body.append(qwe);

        moveAt(event.pageX, event.pageY);

        // moves the qwe at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            qwe.style.left = pageX - shiftX + 'px';
            qwe.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the qwe on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the qwe, remove unneeded handlers
        qwe.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            qwe.onmouseup = null;
        };

    };

    qwe.ondragstart = function () {
        return false;
    };
    minim.addEventListener("click", function (e) {
        if (clicked) {
            txtarea.style.display = "block";

        }
        else {
            txtarea.style.display = "none";
        }
        clicked = (clicked + 1) % 2;
    })
    close.addEventListener("click", function (e) {
        qwe.remove();
    })

});

downloade.addEventListener("click", function (e) {

    let url = board.toDataURL();
    //console.log(url);
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});

socket.on("beginpath",(data)=>{
    tool.strokeStyle=data.color;
    tool.lineWidth=data.width;
    tool.beginPath();
    tool.moveTo(data.ixpos, data.iypos);
    
});
socket.on("movepath",(data)=>{
    tool.strokeStyle=data.color;
    tool.lineWidth=data.width;
     //console.log(data.color);
       // tool.beginPath();
         tool.lineTo(data.fxpos, data.fypos);
         tool.stroke();
         tool.beginPath();
         tool.moveTo(data.fxpos, data.fypos);
         
    
});
socket.on("uppath",(data)=>{
    tool.strokeStyle=data.color;
    tool.lineWidth=data.width;
           tool.lineTo(data.fxpos, data.fypos);
           tool.stroke(); //costly so done at last shows the line

});
socket.on("rect",(data)=>{
    tool.strokeStyle=data.color;
    tool.lineWidth=data.width;
    tool.strokeRect(data.ixpos, data.iypos, data.fxpos - data.ixpos, data.fypos - data.iypos);
});