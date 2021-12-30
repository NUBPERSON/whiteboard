let board=document.querySelector("canvas");
let body=document.querySelector("body");
let line=document.querySelector(".fa-grip-lines-vertical");
let rect=document.querySelector(".fa-square-full");
let pen=document.querySelector(".fa-pencil-alt");
let era=document.querySelector(".eraser")
// let colortask=document.querySelector(".check");
let redc=document.querySelector(".red");
let bluec=document.querySelector(".blue");
let greenc=document.querySelector(".green");
let value="black";
 let size=document.querySelectorAll(".size");


// colortask.style.backgroundColor=value;
   
let pcolor="black";

board.height=window.innerHeight;
board.width=window.innerWidth;
let recs=0,lins=0,penc=0,eras=0;
let tool=board.getContext('2d');
let boarddim=board.getBoundingClientRect(); //start end of the canvas board
// tool.fillStyle="green";
//tool.fillRect(0,0,200,200);
//tool.strokeStyle="red";
//tool.strokeRect(100,100,40,40);
pen.addEventListener("click",function(){
      if(penc==1){
         size[2].style.display="flex";
      }
      else{
         for(let i=0;i<size.length;i++){
           size[i].style.display="none";
           // console.log(i);
            }

      }
     
      tool.strokeStyle=pcolor;
      //tool.lineWidth=1;
       lins=0;
       recs=0;
       penc=1;
       eras=0
});
line.addEventListener("click",function(){
 if(lins==1){
         size[1].style.display="flex";
      }
      else{
         for(let i=0;i<size.length;i++){
           size[i].style.display="none";
            //console.log(i);
            }

      }
      tool.strokeStyle=pcolor;
      //tool.lineWidth=1;
       lins=1;
       recs=0;
       penc=0;
       eras=0;
});
rect.addEventListener("click",function(){
     if(recs==1){
         size[0].style.display="flex";
      }
      else{
         for(let i=0;i<size.length;i++){
           size[i].style.display="none";
           // console.log(i);
            }

      }
      tool.strokeStyle=pcolor;
     // tool.lineWidth=1;

       recs=1;
       lins=0;
       penc=0;
       eras=0;
});
era.addEventListener("click",function(){
 if(eras==1){
         size[3].style.display="flex";
      }
      else{
         for(let i=0;i<size.length;i++){
           size[i].style.display="none";
           // console.log(i);
            }

      }
      tool.strokeStyle="white";
     // tool.lineWidth=10;
       recs=0;
       lins=0;
       penc=0;
       eras=1;
});
redc.addEventListener("click",function(){
      value="red";   
      pcolor=value;
      tool.strokeStyle=value;
     // colortask.style.backgroundColor=value;
    });
    greenc.addEventListener("click",function(){
      value="green";   
      pcolor=value;   
        tool.strokeStyle=value;
    });
    bluec.addEventListener("click",function(){
      value="blue";   
      pcolor=value;  
      tool.strokeStyle=value; 
    });

let ixpos,iypos,fxpos,fypos;
let pressed=0;
body.addEventListener("mousedown",function(e){
    // console.log("hihi");
        ixpos=e.clientX-boarddim.left;
        iypos=e.clientY-boarddim.top;
      if(lins || penc || eras){
        tool.beginPath();
       tool.moveTo(ixpos,iypos);
       }
       if(penc || eras)
         pressed=1;
      // console.log(xpos+" "+ypos);
      
});
body,addEventListener("mousemove",function(e){
        fxpos=e.clientX-boarddim.left;
        fypos=e.clientY-boarddim.top;
        if( (penc||eras) && pressed){
            //tool.beginPath();
          tool.lineTo(fxpos,fypos);
          tool.stroke();
          tool.beginPath();
          tool.moveTo(fxpos,fypos);
        }
});
body.addEventListener("mouseup",function(e){
        fxpos=e.clientX-boarddim.left;
        fypos=e.clientY-boarddim.top;
      if(lins || penc || eras){
       tool.lineTo(fxpos,fypos);
       tool.stroke(); //costly so done at last shows the line
       
       }
     if(recs){
        tool.strokeRect(ixpos,iypos,fxpos-ixpos,fypos-iypos);
     }  
     if(penc||eras)
       pressed=0;
       
});
size[0].addEventListener("click",function(e){
   //click kis pe hua hai
   // console.log(e.target);
    //event listner kis pe lga hai
    //console.log(e.currentTarget);
    //console.log("hi");
    let color=tool.strokeStyle;
     console.log(color);
    let classarr=["size1","size2","size3","size4"];
    let allclasesses=e.target.classList;
    let firstclass=allclasesses[0];
   // console.log(firstclass);
    let res=classarr.includes(firstclass);
    if(res){
         if(firstclass=="size1"){
           tool.lineWidth=1;
         }
         if(firstclass=="size2"){
            tool.lineWidth=5;
            //console.log("5");
        }
        if(firstclass=="size3"){
            tool.lineWidth=10;
        }
        if(firstclass=="size4"){
            tool.lineWidth=15;
        }
    }
    //console.log(color);
     tool.strokeStyle=color;

});

size[1].addEventListener("click",function(e){
    //click kis pe hua hai
    // console.log(e.target);
     //event listner kis pe lga hai
     //console.log(e.currentTarget);
     //console.log("hi");
     let classarr=["size1","size2","size3","size4"];
     let allclasesses=e.target.classList;
     let firstclass=allclasesses[0];
    // console.log(firstclass);
     let res=classarr.includes(firstclass);
     if(res){
          if(firstclass=="size1"){
            tool.lineWidth=1;
          }
          if(firstclass=="size2"){
             tool.lineWidth=5;
           //  console.log("5");
         }
         if(firstclass=="size3"){
             tool.lineWidth=10;
         }
         if(firstclass=="size4"){
             tool.lineWidth=15;
         }
     }
 
 
 });

 size[2].addEventListener("click",function(e){
    //click kis pe hua hai
    // console.log(e.target);
     //event listner kis pe lga hai
     //console.log(e.currentTarget);
     //console.log("hi");
     let classarr=["size1","size2","size3","size4"];
     let allclasesses=e.target.classList;
     let firstclass=allclasesses[0];
    // console.log(firstclass);
     let res=classarr.includes(firstclass);
     if(res){
          if(firstclass=="size1"){
            tool.lineWidth=1;
          }
          if(firstclass=="size2"){
             tool.lineWidth=5;
           //  console.log("5");
         }
         if(firstclass=="size3"){
             tool.lineWidth=10;
         }
         if(firstclass=="size4"){
             tool.lineWidth=15;
         }
     }
 
 
 });

 size[3].addEventListener("click",function(e){
    //click kis pe hua hai
    // console.log(e.target);
     //event listner kis pe lga hai
     //console.log(e.currentTarget);
     //console.log("hi");
     let classarr=["size1","size2","size3","size4"];
     let allclasesses=e.target.classList;
     let firstclass=allclasesses[0];
    // console.log(firstclass);
     let res=classarr.includes(firstclass);
     if(res){
          if(firstclass=="size1"){
            tool.lineWidth=5;
          }
          if(firstclass=="size2"){
             tool.lineWidth=15;
             console.log("5");
         }
         if(firstclass=="size3"){
             tool.lineWidth=20;
         }
         if(firstclass=="size4"){
             tool.lineWidth=30;
         }
     }
 
 
 });
 
