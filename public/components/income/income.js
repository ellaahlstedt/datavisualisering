function renderIncome(parent) {
    //div
    const incomeCon = document.createElement("div");
    incomeCon.classList.add("incomeCon");
    parent.appendChild(incomeCon);

    //h2
    const header = document.createElement("h2");
    header.innerHTML = "BOLAG SOM FYLLER DANSGOLV... OCH <span class='highlight'>FICKOR</span>";
    header.classList.add("incomeHeader");
    incomeCon.appendChild(header);

    //div
    const svgCon = document.createElement("div");
    svgCon.classList.add("incomeSvgCon");
    incomeCon.appendChild(svgCon);

    //text
    const text = document.createElement("p");
    text.classList.add("incomeText");
    text.innerHTML = `
        Visst är engagemang och festligheter en viktig del av de olika Ravefesterna. 
        Men lika viktigt kan logistiken vara, hur mycket tjänar du som stad genom att jobba med de olika produktionsbolagen? 
        <br/><br/>
        Via diagrammet kan du se vilka bolag som drar in mest, och vilka som drar in lite mindre. 
        Som stad kanske du är ute efter att ha de roligaste, största Ravesen, eller så njuter du kanske av något mer lagom.
        <br/><br/> 
        Ingen skam oavsett vilket, allt är giltigt för fest!
    `;
    svgCon.appendChild(text);

    //svg
    renderIncomeSvg(svgCon);
}




// newData = [{name: "", totalEarnings: }]
function renderIncomeSvg(parent) {
    let newData = [];
    for (let producer of Producers) {
        let totalIncomePerProducer = 0;
        for (let gig of Gigs) {
            if (gig.producerID == producer.id) {
                totalIncomePerProducer += gig.cityEarnings;
            }
        }
        newData.push({ "name": producer.name, "totalIncomePerProducer": totalIncomePerProducer })
    }

    // Svg
    const wSvg = 850;
    const hSvg = 500;

    const svg = d3.select(parent)
        .append("svg")
        .attr("viewBox", `0 0 ${wSvg} ${hSvg}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const root = d3.hierarchy({ children: newData })
        .sum(d => d.totalIncomePerProducer);

    d3.treemap()
        .size([wSvg, hSvg])
        .padding(12)(root);

    const nodes = svg.selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    // Rects
    nodes.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => getFillColor(d.data.name))
        .attr("stroke", d => getStrokeColor(d.data.name))
        .attr("stroke-width", 4);


    // Texts
    nodes.append("text")
        .attr("x", d => (d.x1 - d.x0) / 2)
        .attr("y", d => (d.y1 - d.y0) / 2 - 22)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.data.name)
        .attr("font-size", "14px")
        .attr("font-family", "SUSE-Bold")
        .attr("text-transform", "uppercase")
        .attr("fill", d => getStrokeColor(d.data.name));

    let totalIncome = 0;
    for (let data of newData) {
        totalIncome += data.totalIncomePerProducer;
    }

    nodes.append("text")
        .attr("x", d => (d.x1 - d.x0) / 2)
        .attr("y", d => (d.y1 - d.y0) / 2 + 6)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "28px")
        .attr("fill", "white")
        .text(d => {
            const percent = ((d.data.totalIncomePerProducer / totalIncome) * 100).toFixed(1);
            return `${percent}%`;
        });

    nodes.append("text")
        .attr("x", d => (d.x1 - d.x0) / 2)
        .attr("y", d => (d.y1 - d.y0) / 2 + 30)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .text(d => d.data.totalIncomePerProducer.toLocaleString());
}