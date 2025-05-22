function renderHeader(parent) {
    let headerDiv = document.createElement("div");
    headerDiv.id = "headerDiv";

    parent.appendChild(headerDiv);


    let nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = `
    
    <div id="ravesText">
        <p>RAVESthatFIT</p>
    </div>

    <div id="navDivs">

        <div id="stad">
            <p>Du som stad</p>
        </div>

        <div id="bolagen">
            <p>Bolagen</p>
        </div>

        <div id="slutsats">
            <p>Slutsats</p>
        </div>

    </div>
    
    `;

    let navBorder = document.createElement("div");
    navBorder.classList.add("border");

    headerDiv.appendChild(nav);

    let raveLineCon = document.createElement("div");
    raveLineCon.id = "raveLine";
    raveLineCon.innerHTML = `
    <h1 id="rave">RAVESthatFIT</h1>
    <h3 id="line">HITTA RÄTT PRODUKTIONSBOLAG FÖR DIG</h3>
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


