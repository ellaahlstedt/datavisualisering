function renderTransition(parent, type) {
    //div
    const transitionCon = document.createElement("div");
    transitionCon.id = "transitionCon";
    parent.appendChild(transitionCon);

    //header
    const header = document.createElement("h2");
    header.id = "transitionHeader";

    switch (type) {
        case "city":
            header.textContent = "vem är du som stad?";
            transitionCon.appendChild(header);
            break;
        case "producer":
            header.innerHTML = "De olika <span class='transitionProducers'>produktionsbolagen</span>";
            transitionCon.appendChild(header);
            break;
    }

    // img
    const transitionImg = document.createElement("img");
    transitionImg.setAttribute("src", "./media/images/transition.png");
    transitionImg.id = "transitionImg";
    transitionCon.appendChild(transitionImg);
}