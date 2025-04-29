
const a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Filter
// Retunera en filtrerad array (tom array om kravet inte uppnås)

// Arrow functions
// a1.filter(x => x == 9)
// a1.filter(x => x > 7)
// a1.filter(x => x < 3 || x > 7)

// Med funktion
let a1Filtered = a1.filter(f1);
function f1(e, i, a) {
    // return e == 9;
    // return e > 7;
    return e < 3 || e > 7;
}

let djEarningMin = 2145;
let djEarningMax = 4145;
let gigsWithThatEarning = Gigs.filter(gig => gig.djEarning > djEarningMin && gig.djEarning < djEarningMax);


// Find
// Retunerar ett element (eller undefined om kravet inte uppnåst)
a2 = [];
// a2.find();


// Map
// Retunerar en array med exakt lika många element som ursprungs arrayen
// Används för att tranformera en array till något annat

const a3 = [{ month: "Jan", n: 2 }, { month: "Feb", n: 5 }];

// a3.map(x => x.month);
a3.map(f3);

function f3(e, i, a) {
    return e.month;
}