function renderFooter(parent) {
    let footerDiv = document.createElement("div");
    footerDiv.id = "footerDiv";
    footerDiv.innerHTML = "<div class='border'></div>";

    parent.appendChild(footerDiv);

    let footerHeadline = document.createElement("h2");
    footerHeadline.id = "footerHeadline";
    footerHeadline.innerHTML = "VEM SKA DU <span class='FHL'>VÄLJA?</span>";

    let footerInfo = document.createElement("div");
    footerInfo.id = "footerInfo";

    let footerText = document.createElement("p");
    footerText.id = "footerText";
    footerText.innerHTML = `Med informationen visuliserad är vår förhoppning att du som stad har fått insikt i vilka bolag du ska välja för just era Ravesfester. 
    De olika bolagen har olika styrkor och svagheter, där vissa bolag kommer matcha era behov mer än andra. 
    Om du är en stad som lägger värde i stor erfarenhet bland produktionsbolagen, 
    så skulle <span class="FHLTrance">Trance AB</span> och <span class="FHLXtas">Xtas Produktioner</span> vara en bra match för er! 
    Är ni däremot mer intresserad av stora dunkande fester i samband med lite större vinster,
    är <span class="FHLTrance">Trance AB</span> och <span class="FHLNever">Neverending AB</span> de bästa bolagen på det just nu. 
    <br/><br/> Du som stad får gärna kontakta <span class="FHLRaves">RAVESthatFIT</span> för vidare samtal och eventuell kontraktskrivning med en av våra bolag. Varmt och lysande välkommen.`;

    let footerContactCon = document.createElement("div");
    footerContactCon.id = "footerContactCon";

    let footerContactText = document.createElement("p");
    footerContactText.id = "footerContactText";
    footerContactText.innerHTML = "Så, vi lägger förhandlingarna på hyllan, <br/> NU SKA DET FESTAS!";

    let footerContactInfo = document.createElement("p");
    footerContactInfo.id = "footerContactInfo";
    footerContactInfo.innerHTML = "00 345 562 536 495 <br/> ravesthatfit@gmail.com";

    footerDiv.appendChild(footerHeadline);
    footerDiv.appendChild(footerInfo);
    footerInfo.appendChild(footerText);
    footerInfo.appendChild(footerContactCon);
    footerContactCon.appendChild(footerContactText);
    footerContactCon.appendChild(footerContactInfo);

    footerDiv.innerHTML += "<div class='border'></div> <p class='footerLogo'>RAVESthatFIT</p>";
}