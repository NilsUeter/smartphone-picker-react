{
  const nameAndBrand = document
    .querySelector(".specs-phone-name-title")
    .textContent.split(" ");
  let name = nameAndBrand.slice(1).join(" ");
  let brand = nameAndBrand[0];
  let imgName = (brand + name).toLowerCase();
  const monthNames = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12"
  };
  const batterySize = parseInt(
    document.querySelectorAll("[data-spec='batsize-hl']")[0].textContent
  );

  let waterproof = 0;
  const otherbody = document.querySelectorAll("[data-spec='bodyother']")[0];
  if (otherbody && otherbody.textContent.indexOf("IP") !== -1) {
    waterproof = parseInt(
      document
        .querySelectorAll("[data-spec='bodyother']")[0]
        .textContent.split("")[3]
    );
  }

  let release, displaySize, height, width, sdSlot, headphoneJack;
  for (const element of document.querySelectorAll(".ttl")) {
    let content = element.nextElementSibling.textContent;
    switch (element.textContent) {
      case "Dimensions":
        height = Math.round(content.split("x")[0]);
        width = Math.round(content.split("x")[1]);
        break;
      case "Size":
        displaySize = parseFloat(content.split(" ")[0]);
        break;
      case "Status":
        const date = content.split("Available. Released ")[1];
        release = date.split(", ")[0] + "-" + monthNames[date.split(", ")[1]];
        break;
      case "Card slot":
        sdSlot = content.toLowerCase().indexOf("sd") === -1 ? 0 : 1;
        break;
      case "3.5mm jack ":
        headphoneJack = content === "No" ? 0 : 1;
        break;

      default:
        break;
    }
  }
  console.log(`INSERT INTO \`SMARTPHONE\` (\`NAME\`,\`BRAND\`,\`RELEASED\`,\`IMAGE_LINK\`,\`DESIGN\`,\`DISPLAY\`,\`LENGTH\`,\`WIDTH\`,\`CPU\`,\`UPDATES\`,\`CAMERA\`,\`BATTERY\`,\`BATTERYSIZE\`,\`SD_SLOT\`,\`SIM_CARDS\`,\`NOTCH\`,\`WATERPROOF\`,\`HEADPHONE_JACK\`)
  VALUES ('${name}','${brand}','${release}','${imgName}',DESIGN,${displaySize},${height},${width},CPU,UPDATES,CAMERA,BATTERY,${batterySize},${sdSlot},SIMCARDS,NOTCH,${waterproof},${headphoneJack});`);
}
