function getStrokeColor(name) {
    switch (name) {
        case "Gigskaparna": return "#FFC700";
        case "Festen AB": return "#FF7A00";
        case "Trance AB": return "#00FFC8";
        case "Nattmingel AB": return "#FF66C4";
        case "Neverending AB": return "#00F0FF";
        case "No Mind AB": return "#A6FF00";
        case "Banzai AB": return "#FF003C";
        case "Xtas Produktioner": return "#DA00FF";
        case "Finliret AB": return "#FFD6E8";
    }
}

function getFillColor(name) {
    switch (name) {
        case "Gigskaparna": return "rgba(255, 199, 0, 0.5)";
        case "Festen AB": return "rgba(255, 122, 0, 0.5)";
        case "Trance AB": return "rgba(0, 255, 200, 0.5)";
        case "Nattmingel AB": return "rgba(255, 102, 196, 0.5)";
        case "Neverending AB": return "rgba(0, 240, 255, 0.5)";
        case "No Mind AB": return "rgba(166, 255, 0, 0.5)";
        case "Banzai AB": return "rgba(255, 0, 60, 0.5)";
        case "Xtas Produktioner": return "rgba(218, 0, 255, 0.5)";
        case "Finliret AB": return "rgba(255, 214, 232, 0.5)";
    }
}

function getFullColors(name) {
    switch (name) {
        case "Gigskaparna": return "rgba(255, 199, 0)";
        case "Festen AB": return "rgba(255, 122, 0)";
        case "Trance AB": return "rgba(0, 255, 200)";
        case "Nattmingel AB": return "rgba(255, 102, 196)";
        case "Neverending AB": return "rgba(0, 240, 255)";
        case "No Mind AB": return "rgba(166, 255, 0)";
        case "Banzai AB": return "rgba(255, 0, 60)";
        case "Xtas Produktioner": return "rgba(218, 0, 255)";
        case "Finliret AB": return "rgba(255, 214, 232)";
    }
}

const parent = document.querySelector("#wrapper");

renderHeader(parent);

attendanceScale(parent);

renderIncome(parent);

renderTotalGigs(parent);

experienceOverTimeGraf(parent);

renderFooter(parent);


