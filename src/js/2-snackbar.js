import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formInfo = document.querySelector('.form');
formInfo.firstElementChild.classList.add('js-delay');
const delayInput = document.querySelector('form label input');
delayInput.classList.add('js-delay-input');