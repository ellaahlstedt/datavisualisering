function renderProducers(parent) {
    const imagesNames = ["gigskaparna.png",
        "festenAB.png",
        "tranceAB.png",
        "nattmingelAB.png",
        "neverendingAB.png",
        "noMindAB.png",
        "banzaiAB.png",
        "xtasProd.png",
        "finliretAB.png"];

    //div
    const producersCon = document.createElement("div");
    producersCon.id = "producersCon";
    parent.appendChild(producersCon);

    //transition
    renderTransition(producersCon, "producer")

    //producers
    const innerProducersCon = document.createElement("div");
    innerProducersCon.id = "innerProducersCon";
    producersCon.appendChild(innerProducersCon);

    for (let imageName of imagesNames) {
        const img = document.createElement("img");
        img.setAttribute("src", `./media/images/${imageName}`);
        img.classList.add("innerProducersConImg");
        innerProducersCon.appendChild(img);
    }

}