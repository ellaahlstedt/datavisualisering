//För linjegrafen som visar hur aktiva ett företag har varit genom de olika åren.
//let parent = document.querySelector("#wrapper");


function experienceOverTimeGraf(parent) {

    const wrapInExperience = document.createElement("div");
    wrapInExperience.id = "wrapInExperience"

    const experienceHeadline = document.createElement("h2");
    experienceHeadline.innerHTML = `<h2>HUR <span class="expHL">LÄNGE</span> HAR DE VARIT PÅ SCENEN?</h2>`;
    experienceHeadline.classList.add("experienceHeadline");
    wrapInExperience.appendChild(experienceHeadline);

    const experienceText = document.createElement("p");
    experienceText.innerHTML = "Totalt antal gigs";
    experienceText.classList.add("expText");
    wrapInExperience.appendChild(experienceText);

    const divForExperiences = document.createElement("div");
    divForExperiences.id = "divForExperience";

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.id = "diagramForActivity";

    const buttonDiv = document.createElement("div");
    buttonDiv.id = "producerButtons";

    divForExperiences.appendChild(buttonDiv);
    divForExperiences.appendChild(svgElement);

    wrapInExperience.appendChild(divForExperiences);


    parent.appendChild(wrapInExperience);




    //BÖRJA MED SVG UPPSÄTTNINGEN

    const wsvg = 800;
    const hsvg = 500;

    const wviz = 0.87 * wsvg;
    const hviz = 0.90 * hsvg;

    const wpadding = (wsvg - wviz) / 2;
    const hpadding = (hsvg - hviz) / 2;

    const svg = d3.select(svgElement)
        .attr("width", wsvg)
        .attr("height", hsvg)
        .attr("viewBox", `0 0 ${wsvg} ${hsvg}`)
        .attr("preserveAspectRatio", "xMidYMid meet")

    const xScale = d3.scaleLinear([2015, 2024], [wpadding, wsvg - wpadding]);


    const xAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${hsvg - hpadding})`);

    const yAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${wpadding}, 0)`);




    //BUTTONS
    let activeButton = null;

    Producers.forEach(producer => {
        const button = document.createElement("button");
        button.textContent = producer.name;
        button.classList.add("prodButtons");

        const color = getFullColors(producer.name);

        button.style.border = `0.3vw solid ${color}`;
        button.style.background = "transparent";
        button.style.color = color;
        button.style.transition = "all 0.3s ease";
        button.style.cursor = "pointer";
        button.style.fontSize = "0.8vw";
        button.style.width = "10vw";

        button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = color.replace(")", ", 0.3)");
        });
        button.addEventListener("mouseleave", () => {
            if (button !== activeButton) {
                button.style.backgroundColor = "transparent";
            }
        });

        button.addEventListener("click", () => {
            if (activeButton) {
                const prevColor = getFullColors(activeButton.textContent);
                activeButton.style.backgroundColor = "transparent";
                activeButton.style.color = prevColor;
            }

            activeButton = button;
            button.style.backgroundColor = color;
            button.style.color = "black";

            updateProductions(producer.id, producer.name, color);
        });

        buttonDiv.appendChild(button);
    });




    function getAllMaxGigs() {

        const counts = {};

        Gigs.forEach(gig => {
            const year = new Date(gig.date).getFullYear();
            if (year >= 2015 && year <= 2024) {
                const key = `${gig.producerID}-${year}`;
                counts[key] = (counts[key] || 0) + 1;
            }
        });
        return d3.max(Object.values(counts));
    }





    function updateProductions(producerID, producerName, color) {
        const gigsPerYear = {};
        for (let year = 2015; year <= 2024; year++) {
            gigsPerYear[year] = 0;
        }

        Gigs.forEach(gig => {
            const year = new Date(gig.date).getFullYear();
            if (gig.producerID === producerID) {
                gigsPerYear[year]++;
            }
        });

        const dataToShow = Object.entries(gigsPerYear).map(([year, count]) => ({
            year: +year,
            gigs: count
        }));

        //BYT NAMN TILL ALLMAXGIGS
        const globalMaxGigs = getAllMaxGigs();

        const yScale = d3.scaleLinear([0, globalMaxGigs], [hsvg - hpadding, hpadding]);

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale);

        xAxisGroup.transition().duration(500).call(xAxis);
        yAxisGroup.transition().duration(500).call(yAxis);

        const circles = svg.selectAll("circle")
            .data(dataToShow, d => d.year);

        circles.enter()
            .append("circle")
            .merge(circles)
            .transition()
            .duration(500)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.gigs))
            .attr("r", 5)
            .attr("fill", color);


        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.gigs));

        const linePath = svg.selectAll(".line-path")
            .data([dataToShow]);

        linePath.enter()
            .append("path")
            .attr("class", "line-path")
            .merge(linePath)
            .transition()
            .duration(500)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 3);
    }

    updateProductions(Producers[0].id, Producers[0].name);

    let textDivForExperience = document.createElement("div");
    textDivForExperience.id = "textDivForExperience";
    textDivForExperience.innerHTML = `
        <p>Den här grafen visar hur länge varje produktionsbolag varit aktiva, baserat på antalet event per år.
Utforska deras resa genom åren och se vilka som har byggt upp erfarenhet och närvaro med tiden.
Att förstå ett bolags historik ger inte bara en bild av deras kapacitet, utan även insikt i deras engagemang och uthållighet i branschen.
Datan hjälper städer att se vilka aktörer som konsekvent varit närvarande - och vilka som kanske är nya men växande.
Grafen är därför inte bara en översikt, utan ett verktyg för att identifiera stabila samarbetspartners med potential att skapa långsiktiga resultat.</p>
    `;

    wrapInExperience.appendChild(textDivForExperience);
}

