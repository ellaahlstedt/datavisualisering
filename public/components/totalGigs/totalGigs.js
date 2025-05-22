function renderTotalGigs(parent) {
    // Div
    const totalGigsCon = document.createElement("div");
    totalGigsCon.classList.add("totalGigsCon");
    parent.appendChild(totalGigsCon);

    // Header
    const totalGigsHeader = document.createElement("h2");
    totalGigsHeader.innerHTML = "Vilka har levererat <span class='totalGigsHighlight'>mest</span> gigs?";
    totalGigsHeader.classList.add("totalGigsHeader");
    totalGigsCon.appendChild(totalGigsHeader);

    // Scale text
    const gigText = document.createElement("p");
    gigText.innerHTML = "Totalt antal gigs";
    gigText.classList.add("gigText");
    totalGigsCon.appendChild(gigText);

    // Div
    const totalGigsSvgCon = document.createElement("div");
    totalGigsSvgCon.classList.add("totalGigsSvgCon");
    totalGigsCon.appendChild(totalGigsSvgCon);

    // Svg
    renderTotalGigsSvg(totalGigsSvgCon);

    // Text
    const totalGigsText = document.createElement("p");
    totalGigsText.innerHTML = `
        Den här grafen visar hur många event varje produktionsbolag har genomfört totalt. 
        <br/><br/>
        Ett direkt mått på erfarenhet, ju högre stapel, desto mer vana av att skapa, driva och leverera.
        <br/> <br/>
        Använd insikten för att identifiera de mest erfarna aktörerna att samarbeta med.
        <br/>
       <i> Observera: Skalan börjar vid 650 genomförda event för att lyfta fram skillnader i toppen.</i>
    `;
    totalGigsText.classList.add("totalGigsText");
    totalGigsSvgCon.appendChild(totalGigsText);
}

function renderTotalGigsSvg(parent) {
    const totalGigs = [];
    for (let producer of Producers) {
        let producerGigs = Gigs.filter(gig => gig.producerID == producer.id);
        totalGigs.push({ "name": producer.name, "totalGigs": producerGigs.length })
    }
    const producerNames = totalGigs.map(gig => gig.name);

    let maxGigs = 0;
    for (let gig of totalGigs) {
        if (gig.totalGigs > maxGigs) {
            maxGigs = gig.totalGigs;
        }
    }

    // Svg
    const wSvg = 850;
    const hSvg = 500;
    const hViz = 0.9 * hSvg;
    const wPad = 30;
    const hPad = 4;

    const svg = d3.select(parent)
        .append("svg")
        .attr("viewBox", `0 0 ${wSvg} ${hSvg}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    // Scales
    const xScale = d3.scaleBand(producerNames, [wPad, wSvg - wPad])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    const yScale = d3.scaleLinear([650, maxGigs], [hPad + hViz, hPad]);

    // Axis
    const xAxis = svg.append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate(0, ${hPad + hViz})`);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(yScale))
        .attr("transform", `translate(${wPad}, 0)`);

    // Bars
    const bars = svg.selectAll("rect")
        .data(totalGigs)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.totalGigs))
        .attr("width", xScale.bandwidth())
        .attr("height", d => hPad + hViz - yScale(d.totalGigs))
        .attr("fill", d => getFillColor(d.name))
        .attr("stroke", d => getStrokeColor(d.name))
        .attr("stroke-width", 4);
}
