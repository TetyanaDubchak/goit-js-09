import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

const formWrapper = document.querySelector('.form');

const onSubmitHandle = (e) => {
  e.preventDefault();

  let delayValue =Number(e.target.delay.value) ;
  let stepValue = Number(e.target.step.value);
  let amountValue = Number(e.target.amount.value);
 
  let currentDelay = delayValue;

  for (let index = 1; index <= amountValue; index ++) {

      createPromise(index, currentDelay)
        .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
        .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        });
      
      currentDelay = delayValue + (index * stepValue);
  }

  e.target.delay.value = '';
  e.target.step.value = '';
  e.target.amount.value = '';
};

formWrapper.addEventListener('submit', onSubmitHandle)