let timer = (interval, selectorSeconds, selectorMinutes, selectorHours, selectorDays, localStorageVar) => {
    let t = interval;

    function reset() {
        localStorage.setItem(localStorageVar, +new Date() + t);
    }

    if (!localStorage.getItem(localStorageVar)) {
        reset();
    }

    setInterval(function () {
        let remaining = localStorage.getItem(localStorageVar) - new Date,
            seconds = (Math.floor(remaining / 1000) % 60),
            minutes = (Math.floor(remaining / 1000 / 60) % 60),
            hours = (Math.floor(remaining / 1000 / 60 / 60) % 24),
            days = (Math.floor(remaining / 1000 / 60 / 60 / 24));


        if (remaining >= 0) {
            document.querySelector(selectorDays).textContent = days;
            document.querySelector(selectorHours).textContent = addZero(hours);
            document.querySelector(selectorMinutes).textContent = addZero(minutes);
            document.querySelector(selectorSeconds).textContent = addZero(seconds);
        } else {
            reset();
        }
        if (document.querySelector(selectorDays).textContent == '0') {
            document.querySelector(selectorDays).parentElement.parentElement.style.display = 'none';
        }
    }, 100);

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
};