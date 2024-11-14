import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerWrapper = document.querySelector('.timer');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            startBtn.setAttribute('disabled', 'null');
            Notify.failure('Please choose a date in the future');
        } else {
            startBtn.removeAttribute('disabled');
        }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
   return value.toString().padStart(2, 0);
};

startBtn.setAttribute('disabled', 'null');

const chooseDate = flatpickr(timePicker, options);

const onStartHandle = () => {
    let differents = (chooseDate.selectedDates[0].getTime() - chooseDate.now.getTime());
    const timerId = setInterval(() => {
        differents = differents - 1000;
        const timerTime = convertMs(differents);
        const days = addLeadingZero(timerTime.days);
        const hours = addLeadingZero(timerTime.hours);
        const minutes = addLeadingZero(timerTime.minutes);
        const seconds = addLeadingZero(timerTime.seconds);

        daysValue.textContent = days;
        hoursValue.textContent = hours;
        minutesValue.textContent = minutes;
        secondsValue.textContent = seconds;
    },1000)
   
}

startBtn.addEventListener('click', onStartHandle);

