function renderFooter(parent) {
    let footerDiv = document.createElement("div");
    footerDiv.id = "footerDiv";

    parent.appendChild(footerDiv);

    let nav = document.createElement("nav");
    nav.innerHTML = `
    
    `;

    footerDiv.appendChild(nav);

}