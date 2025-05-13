function renderTotalGigs(parent) {

    renderTotalGigsSvg();

}

function renderTotalGigsSvg() {
    const totalGigs = [];
    for (let producer of Producers) {
        let producerGigs = Gigs.filter(gig => gig.producerID == producer.id);
        totalGigs.push({ "name": producer.name, "totalGigs": producerGigs.length })
    }
    const producerNames = totalGigs.map(gig => gig.name);
    console.log(totalGigs);

    let maxGigs = 0;
    for (let gig of totalGigs) {
        if (gig.totalGigs > maxGigs) {
            maxGigs = gig.totalGigs;
        }
    }

    const wSvg = 850;
    const hSvg = 600;
    const hViz = 0.8 * hSvg;
    const wViz = 0.8 * wSvg;
    const wPad = (wSvg - wViz) / 2;
    const hPad = (hSvg - hViz) / 2;

    const svg = d3.select(parent)
        .append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg);

    // Scales
    const xScale = d3.scaleBand(producerNames, [wPad, wSvg - wPad])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    const yScale = d3.scaleLinear([0, maxGigs], [hPad + hViz, hPad]);

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
        .attr("stroke-width", 2);
}
