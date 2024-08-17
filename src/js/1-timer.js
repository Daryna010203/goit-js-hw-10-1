import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputBtn = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const dayElm = document.querySelector("[data-days]");
const hourElm = document.querySelector("[data-hours]");
const minuteElm = document.querySelector("[data-minutes]");
const secondElm = document.querySelector('[data-seconds]')

startBtn.disabled = true;
let intervalId;
let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  position: 'auto center',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDatetime = selectedDates[0];
    const date = new Date();
    if (selectDatetime <= date) {
      startBtn.disabled = true;
      iziToast.error({
        title: "Invalid date",
        message: "Please choose a date in the future",
        position: 'center'
        });        
    } else {
      userSelectedDate = selectDatetime;
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onBtnClick () {
      inputBtn.setAttribute("disabled", true);
      startBtn.disabled = true;
  intervalId = setInterval(() => {
    const nowDate = new Date();
    const deltaTime = userSelectedDate - nowDate;    
    if (deltaTime <= 0) {
      
      clearInterval(intervalId);
      inputBtn.removeAttribute("disabled");       
      return
    }
    const time = convertMs(deltaTime);
    updateTimerUI(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
}


startBtn.addEventListener('click', onBtnClick);


  function updateTimerUI(days, hours, minutes, seconds) {
    dayElm.textContent = addLeadingZero(days);
    hourElm.textContent = addLeadingZero(hours);
    minuteElm.textContent = addLeadingZero(minutes);
    secondElm.textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}