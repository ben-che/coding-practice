// 
let successRotator = false;
document.getElementById('spin-success').onclick = (event) => {
    let div = event.target;
    let deg = successRotator ? 360 : -360;

    div.style.webkitTransform = 'rotate('+deg+'deg)'; 
    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
    div.style.msTransform     = 'rotate('+deg+'deg)'; 
    div.style.oTransform      = 'rotate('+deg+'deg)'; 
    div.style.transform       = 'rotate('+deg+'deg)'; 

    successRotator = !successRotator;
    console.log(successRotator);

}