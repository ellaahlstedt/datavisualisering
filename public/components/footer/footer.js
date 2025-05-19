function renderFooter(parent) {
    let footerDiv = document.createElement("div");
    footerDiv.id = "footerDiv";

    parent.appendChild(footerDiv);

    let footerHeadline = document.createElement("h2");
    footerHeadline.id = "footerHeadline";
    footerHeadline.innerHTML = "VEM SKA DU <span class='FHL'>VÄLJA?</span>";

    let footerInfo = document.createElement("div");
    footerInfo.id = "footerInfo";
    footerInfo.innerHTML = `<p>Med informationen visuliserad är vår förhoppning att du som stad har fått insikt i vilka bolag du ska välja för just era Ravesfester. De olika bolagen har olika styrkor och svagheter, där vissa bolag kommer matcha era behov mer än andra. Om du är en stad som lägger värde i stor erfarenhet bland produktionsbolagen, så skulle <span class="FHL">Trance AB</span> och <span class="FHL2">Xtas produktioner</span> vara en bra match för er! Är ni däremot mer intresserad av stora dunkande fester i samband med lite större vinster, är <span class="FHL">Trance AB</span> och <span class="FHL2">Neverending AB</span> de bästa bolagen på  det just nu.</p>`;



    footerDiv.appendChild(footerHeadline);
    footerDiv.appendChild(footerInfo);

}