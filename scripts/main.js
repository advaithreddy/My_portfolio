// Timer 
var countDownDate = new Date("Sep 30, 2023 00:00:00").getTime();
var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 *60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

},1000);

// Signup api
function copyToClipboard(button) {
    const codeText = button.parentElement;
    const range = document.createRange();
    range.selectNode(codeText);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function showCopyButton(element) {
    element.querySelector('.copy-button').style.display = 'inline-block';
}

function hideCopyButton(element) {
    element.querySelector('.copy-button').style.display = 'none';
}

