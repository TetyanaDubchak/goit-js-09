function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const formWrapper = document.querySelector('.form');

const onSubmitHandle = (e) => {
  e.preventDefault;
  console.dir(e.target);
};

formWrapper.addEventListener('submit', onSubmitHandle)