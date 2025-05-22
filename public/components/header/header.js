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

    let raveLineCon = document.createElement("div");
    raveLineCon.id = "raveLine";
    raveLineCon.innerHTML = `
    <img id="rave" src="./media/images/ravesthatfit.png" alt="headline">
    <img id="line" src="./media/images/tagline.png" alt="tagline">
    <p>Din stad har en vibe - låt rätt produktion förhöja den.<br>
    Upptäck vilket bolag som passar bäst för just er atmosfär.</p>
    `;
    headerDiv.appendChild(raveLineCon);

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


