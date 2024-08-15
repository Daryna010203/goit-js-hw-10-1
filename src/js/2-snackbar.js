import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formInfoSnackbar = document.querySelector('.form');
formInfoSnackbar.firstElementChild.classList.add('js-delay');
const delayInput = document.querySelector('form label input');
delayInput.classList.add('js-delay-input');


function onFormSubmit (event) {
    event.preventDefault();
  
        const delay = formInfoSnackbar.elements.delay.value;
        const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        
            event.preventDefault();
            
            if (formInfoSnackbar.elements.state.value === "fulfilled"){
                resolve(delay)                
            } else {
                reject(delay)
            }
            
        }, delay) 
        
    });
    
    promise.then(result => {
        iziToast.success({
            title: "Ok",
            message: `Fulfilled promise in ${delay} ms`,
            position: "topRight"});            ;
    }).catch(error => iziToast.error({
        title: "Error",
        message: `Rejected promise in ${delay} ms`,
        position: "topRight"}));
    }
   
formInfoSnackbar.addEventListener('submit', onFormSubmit)