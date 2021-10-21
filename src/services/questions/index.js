export default function endQuestion() {
  document.querySelectorAll('.wrong').forEach((button) => {
    button.style.border = '3px solid rgb(255, 0, 0)';
  });
  document.querySelector('.correct').style.border = '3px solid rgb(6, 240, 15)';
  document.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
  });
}
