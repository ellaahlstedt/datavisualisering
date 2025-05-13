const colors = {
    gigskaparna: "#FFC700",
    festenAb: "#FF7A00",
    tranceAb: "#00FFC8",
    nattmingelAb: "#FF66C4",
    neverendingAb: "#00F0FF",
    noMindAb: "#A6FF00",
    banzaiAb: "#FF003C",
    xtasProduktionerAb: "#DA00FF",
    finliretAb: "#FFD6E8"
};

const colorsWithOpacity = {
    gigskaparna: "rgba(255, 199, 0, 0.5)",
    festenAb: "rgba(255, 122, 0, 0.5)",
    tranceAb: "rgba(0, 255, 200, 0.5)",
    nattmingelAb: "rgba(255, 102, 196, 0.5)",
    neverendingAb: "rgba(0, 240, 255, 0.5)",
    noMindAb: "rgba(166, 255, 0, 0.5)",
    banzaiAb: "rgba(255, 0, 60, 0.5)",
    xtasProduktionerAb: "rgba(218, 0, 255, 0.5)",
    finliretAb: "rgba(255, 214, 232, 0.5)"
};

const parent = document.querySelector("#wrapper");


renderTotalGigs(parent);