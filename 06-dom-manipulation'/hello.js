const btns = document.querySelectorAll('.btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');


function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});
closeBtn.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);
window.addEventListener('keydown', event => {
  if (event.keyCode === 27)
  closeModal()
});
