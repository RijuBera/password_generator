const slider=document.querySelector(".slider")
let len=document.querySelector("[data-lennum]")

let passworddisplay=document.querySelector("[data-passdis]")
let coptbtn =document.querySelector("[data-copy]")
let copymessage=document.querySelector("[data-copymsg]")
let uppercase=document.querySelector("#uppercase")
let lowercase=document.querySelector("#lowercase")
let numbercase=document.querySelector("#number")
let symbolcase=document.querySelector("#symbol")
let indicator=document.querySelector("[data-ind]")
let genbtn=document.querySelector(".btn-gen")
let allchexkbox=document.querySelectorAll('input[type="checkbox"]')
const symbol="!@#$%^&*()_+/><{}[].,''?\|=";

let password="";
let passwordLenght=10;
let checkcnt=0;
// ste circle grey

setindicator("grey")
// slider set password len
function handleSlider(){
   slider.value=passwordLenght;
   len.innerText=passwordLenght;
   const min=slider.min
   const max=slider.max
   slider.style.backgroundSize=((passwordLenght-min)*100/(max-min))+"% 100%"
}
handleSlider();
function setindicator(color){
        indicator.style.backgroundColor=color;
        passworddisplay.style.color=color
}

function randomintgenerator(min,max){
return Math.floor( Math.random()*(max-min))+min;
}

function generaterandomnum(){
    return randomintgenerator(0,9)
}

function genlowercase(){
  return  String.fromCharCode( randomintgenerator(97,123));
}
function genuppercase(){
  return  String.fromCharCode( randomintgenerator(65,91));
}


function gensymbol(){
    const ranv=randomintgenerator(0,symbol.length)
    return symbol[ranv];
}

function calStrength(){
    
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;

    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numbercase.checked) hasnum=true;
    if(symbolcase.checked) hassym=true;

    if(hasupper && haslower &&(hasnum|| hassym) && passwordLenght>=0){
        setindicator("green")
    }
   else if((hasupper || haslower) &&(hasnum|| hassym) && passwordLenght>=0){
        setindicator("yellow")
    }
    else{
        setindicator("red")
    }
}



async function copycontent(){
    try{
   await navigator.clipboard.writeText(passworddisplay.value);
   copymessage.innerText="copied";
    }
    catch(e){
        copymessage.innerText="failed";
    }
    copymessage.classList.add("active");
 setTimeout(() => {
    copymessage.classList.remove("active");
 }, 1000);

}


function shufflepassword(arr){
    // fisher yates method 

    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random(0, i+1));
        // swap a[i] and a[j]
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let str = "";
    arr.forEach((element) => {str += element});
    return str;

}
function hadlecheckboxchange(){
    checkcnt=0;
    allchexkbox.forEach((checkbox)=>{
       if( checkbox.checked==true){
        checkcnt++;
       }
    })
    if(passwordLenght<checkcnt){
        passwordLenght=checkcnt;
        handleSlider();
    }
}

allchexkbox.forEach((checkbox) => {
    checkbox.addEventListener('click',hadlecheckboxchange)
});

slider.addEventListener('input',(e)=>{
         passwordLenght=e.target.value;
         handleSlider();
})

coptbtn.addEventListener('click',()=>{
    if(passworddisplay.value){
        copycontent();
    }
})


genbtn.addEventListener('click',()=>{
      if(checkcnt==0){
        return
      }
      if(passwordLenght<checkcnt){
          passwordLenght=checkcnt
      }

//    lets begin 
password="";
//  lets code for checked 

// if(uppercase.checked){
//     password+=genuppercase()
// }
// if(lowercase.checked){
//     password+=genlowercase()
// }
// if(numbercase.checked){
//     password+=generaterandomnum()
// }
// if(symbolcase.checked){
//     password+=gensymbol()
// }


let funarr=[];
if(uppercase.checked){
    funarr.push(genuppercase)
}
if(lowercase.checked){
    funarr.push( genlowercase)
}
if(numbercase.checked){
    funarr.push(generaterandomnum )   
}
if(symbolcase.checked){   
    funarr.push( gensymbol)
    }
    
//    compalsery add 

for(let i=0;i<funarr.length;i++){
    password+=funarr[i]();
}
for(let i=0;i<passwordLenght-funarr.length;i++){
    let ranidx=randomintgenerator(0,funarr.length);
    password+=funarr[ranidx]();
}

// suffel the password 
password=shufflepassword(Array.from(password))

passworddisplay.value=password;

calStrength();

})