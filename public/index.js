const wrapper = document.querySelector("#wrapper");

renderHeader(wrapper);

const main = document.createElement("main");
wrapper.appendChild(main);

attendanceScale(main);

renderIncome(main);

renderProducers(main)

renderTotalGigs(main);

experienceOverTimeGraf(main);

renderFooter(wrapper);





