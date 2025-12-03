document.addEventListener("DOMContentLoaded", () => {
  const datetimeDate = document.querySelector(".datetime__date");
  const datetimeWeek = document.querySelector(".datetime__weekday");
  const weather = document.querySelector(".weather");
  const appButtons = [
    { title: "FOX", className: "app__btn app__btn--active" },
    { title: "abc", className: "app__btn" },
    { title: "National Geographic", className: "app__btn" },
    { title: "CNN", className: "app__btn" },
    { title: "Nickelodeon", className: "app__btn" },
  ];

  function getFormattedDate(date) {
    const monthList = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    const daysOfWeek = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      0: "Sunday",
    };

    const day = date.getDate().toString().padStart(2, "0");
    const month = monthList[`${date.getMonth()}`];
    const week = daysOfWeek[`${date.getDate()}`];

    return {
      day,
      month,
      week,
    };
  }

  const currentDate = getFormattedDate(new Date());

  function updateDateContent({ day, month, week }) {
    datetimeDate.textContent = `${day} ${month}`;
    datetimeWeek.textContent = week;
  }

  updateDateContent(currentDate);

  function applyScrollClassName(block, className) {
    block.classList.toggle(className, block.offsetWidth != block.scrollWidth);
  }

  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        applyScrollClassName(weather, "weather--with-mask");
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(weather, { childList: true });

  function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}`;

    document.querySelector(".time").textContent = timeString;
  }

  setInterval(updateTime, 1000);

  updateTime();

  function createBtn(obj) {
    const { title, className } = obj;
    const btn = `<button type="button" class="${className}">${title}</button>`;
    document.querySelector(".app__nav").insertAdjacentHTML("beforeend", btn);
  }

  appButtons.forEach(createBtn);
});
