// console.log(Cities.length);
// console.log(Managers.length);
// console.log(Producers.length);
// console.log(DJs.length);
// console.log(Gigs.length);


// dataset1Dj = {name: "", gigs: [mån: , nGigs:]}



// Lektion uppgift
// Gör om så att de är för alla djs
const wSvg = 1000;
const hSvg = 800;
const hViz = .8 * hSvg;
const wViz = .8 * wSvg;
const wPad = (wSvg - wViz) / 2;
const hPad = (hSvg - hViz) / 2;

const svg = d3.select("body")
    .append("svg")
    .attr("height", hSvg)
    .attr("width", wSvg);

const djID = 9374;

const dataset = {
    name: DJs.find(dj => dj.id == djID).name,
    gigs: []
}

for (let month = 0; month < 120; month++) {
    let djGigs = Gigs.filter(gig => gig.djID == djID)
        .filter(currentGig => {
            let _date = new Date(currentGig.date);
            let _year = _date.getFullYear();
            let _month = _date.getMonth();
            let gigMonth = (_year - 2015) * 12 + _month;
            return gigMonth == month;
        });
    dataset.gigs.push({ month: month, nGigs: djGigs.length });
}

let months = dataset.gigs.map(x => x.month);
let maxNGigs = 0;
for (let point of dataset.gigs) {
    maxNGigs = Math.max(maxNGigs, point.nGigs)
}

let xScale = d3.scaleBand(months, [wPad, wPad + wViz]);

let yScale = d3.scaleLinear([0, maxNGigs], [hPad + hViz, hPad]);

let xAxis = svg.append("g")
    .call(d3.axisBottom(xScale))
    .attr("transform", `translate(0, ${hPad + hViz})`);

let yAxis = svg.append("g")
    .call(d3.axisLeft(yScale))
    .attr("transform", `translate(${wPad}, 0)`);

const dMaker = d3.line()
    .x(d => xScale(d.month))
    .y(d => yScale(d.nGigs));

const line = svg.append("g")
    .selectAll("path")
    .data([dataset.gigs])
    .enter()
    .append("path")
    .attr("stroke", "red")
    .attr("fill", "transparent")
    .attr("d", d => dMaker(d)); // d är första elementer i array, alltså dataset.gigs


