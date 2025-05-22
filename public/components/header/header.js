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

    <div id="bolagen">
        <p>Bolagen</p>
    </div>

    <div id="slutsats">
        <p>Slutsats</p>
    </div>
    `;

    headerDiv.appendChild(nav);

}

window.addEventListener('DOMContentLoaded', () => {
    const scrollPlaces = {
        stad: 'wrapAttendance',
        bolagen: 'producersCon',
        slutsats: 'footerDiv'
    };

    Object.entries(scrollPlaces).forEach(([clickedOn, scrollTo]) => {
        const click = document.getElementById(clickedOn);
        const scroll = document.getElementById(scrollTo);

        if (click && scroll) {
            click.addEventListener('click', () => {
                scroll.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
});


