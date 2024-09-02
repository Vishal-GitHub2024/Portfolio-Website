

function number(num) {
  document.getElementById('input').value += num;
}
function operator(optr) {
  document.getElementById('input').value += optr;
}
function clearDisplay() {
  document.getElementById('input').value = '';
}

function delNumber() {
  document.getElementById('input').value = document.getElementById('input').value.slice(0, -1);
}
function calculate() {
  document.getElementById('input').value = eval(document.getElementById('input').value);
}