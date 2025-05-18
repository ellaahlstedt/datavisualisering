function renderHeader(parent) {
    let headerDiv = document.createElement("div");
    headerDiv.id = "headerDiv";

    parent.appendChild(headerDiv);

    let nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = `
    <div id="stad">
        <p>Du som stad</p>
    </div>

    <div id="solagen">
        <p>Bolagen</p>
    </div>

    <div id="slutsats">
        <p>Slutsats</p>
    </div>
    `;

    headerDiv.appendChild(nav);

}