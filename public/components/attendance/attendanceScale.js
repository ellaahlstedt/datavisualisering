
function attendanceScale(parent) {


    const wrapInAttendanceElements = document.createElement("div");
    wrapInAttendanceElements.id = "wrapAttendance";

    renderTransition(wrapInAttendanceElements, "city")

    /*const cityHeadline = document.createElement("h2");
    cityHeadline.innerHTML = "VEM ÄR DU SOM STAD?";
    cityHeadline.classList.add("cityHeadline");
    wrapInAttendanceElements.appendChild(cityHeadline);*/

    const attendanceHeadline = document.createElement("h2");
    attendanceHeadline.innerHTML = "VEM DROG MEST <span class='attendanceHeadlineHL'>PUBLIK</span> GENOM ÅREN?";
    attendanceHeadline.classList.add("attendanceHeadline");
    wrapInAttendanceElements.appendChild(attendanceHeadline);

    const attendanceText = document.createElement("p");
    attendanceText.innerHTML = "Deltagande";
    attendanceText.classList.add("attendanceText");
    wrapInAttendanceElements.appendChild(attendanceText);

    const divForAttendance = document.createElement("div");
    divForAttendance.id = "divForAttendance";

    const svgAttendance = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgAttendance.id = "diagramForAttendance";

    const buttonAttDiv = document.createElement("div");
    buttonAttDiv.id = "producerButtonsAtt";


    divForAttendance.appendChild(svgAttendance);
    divForAttendance.appendChild(buttonAttDiv);

    wrapInAttendanceElements.appendChild(divForAttendance);

    parent.appendChild(wrapInAttendanceElements);



    // UPPSÄTTNING SVG

    const wsvg = 800;
    const hsvg = 500;

    const wviz = 0.87 * wsvg;
    const hviz = 0.90 * hsvg;

    const wpadding = (wsvg - wviz) / 2;
    const hpadding = (hsvg - hviz) / 2;

    const svg = d3.select(svgAttendance)
        .attr("width", wsvg)
        .attr("height", hsvg)
        .attr("viewBox", `0 0 ${wsvg} ${hsvg}`)
        .attr("preserveAspectRatio", "xMidYMid meet")

    const xScale = d3.scaleLinear([2015, 2024], [wpadding, wsvg - wpadding]);

    // SKA LÄGGAS I UPDATE
    //const yScale = d3.scaleLinear([hsvg - hpadding, hpadding]);

    const xAxisG = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${hsvg - hpadding})`);

    const yAxisG = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${wpadding}, 0)`);



    //BUTTONS
    let activeButton = null;

    Producers.forEach(producer => {
        const button = document.createElement("button");
        button.textContent = producer.name;
        button.classList.add("prodButtonsAtt");

        const color = getFullColors(producer.name);

        button.style.border = `0.3vw solid ${color}`;
        button.style.background = "transparent";
        button.style.color = color;
        button.style.transition = "all 0.3s ease";
        button.style.cursor = "pointer";
        button.style.fontSize = "0.8vw";
        button.style.width = "10vw";
        //button.style.height = "3vw";

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

            updateAttendance(producer.id, producer.name, color);
        });

        buttonAttDiv.appendChild(button);
    });


    function getMaxAttendance() {
        const attendanceForProducerEachYear = {};

        Gigs.forEach(gig => {
            const year = new Date(gig.date).getFullYear();
            if (year >= 2015 && year <= 2024) {
                const key = `${gig.producerID}-${year}`;
                attendanceForProducerEachYear[key] = (attendanceForProducerEachYear[key] || 0) + gig.attendance;
            }
        });

        return d3.max(Object.values(attendanceForProducerEachYear));
    }


    function updateAttendance(prodID, producerName, color) {
        const attendancePerYear = {};

        for (let year = 2015; year <= 2024; year++) {
            attendancePerYear[year] = 0;
        }

        Gigs.forEach(gig => {
            const year = new Date(gig.date).getFullYear();
            if (gig.producerID === prodID) {
                attendancePerYear[year] += gig.attendance;
            }
        });

        const dataToShowAttendance = Object.entries(attendancePerYear).map(([year, count]) => ({
            year: +year,
            attendance: count
        }));

        const maxAttendance = getMaxAttendance();

        const yScale = d3.scaleLinear([0, maxAttendance], [hsvg - hpadding, hpadding]);

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale);

        xAxisG.transition()
            .duration(500)
            .call(xAxis);

        yAxisG.transition()
            .duration(500)
            .call(yAxis);

        const circles = svg.selectAll("circle")
            .data(dataToShowAttendance, d => d.year);

        circles.enter()
            .append("circle")
            .merge(circles)
            .transition()
            .duration(500)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.attendance))
            .attr("r", 5)
            .attr("fill", color);


        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.attendance));

        const linePath = svg.selectAll(".line-path")
            .data([dataToShowAttendance]);

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

    updateAttendance(Producers[0].id, Producers[0].name);

    let textDivForAttendance = document.createElement("div");
    textDivForAttendance.id = "textDivForAttendance";
    textDivForAttendance.innerHTML = `
        <p>Här kan du ta del av olika produktionsbolags aktivitetsstatistik för att se hur deras evenemang har attraherad människor genom åren. Man kan identifiera om bolagen har lockat allt större publik, tappat fart, eller kanske haft några enstaka år med fullsatt dansgolv. Grafen visar tydligt både toppar, dalar och eventuella pauser i aktiviteten.
        Som stad kan du använda insikten för att identifiera vilka bolag som drar publik i linje med era mål, ambitioner och - låt oss vara ärliga - er partynivå.
</p>
    `;

    wrapInAttendanceElements.appendChild(textDivForAttendance);

}
