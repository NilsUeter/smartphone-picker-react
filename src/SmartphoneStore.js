import { observable, computed, action } from "mobx";

import FilterStore from "./FilterStore.js";

class SmartphoneStore {
  @observable obj = [];

  constructor(props) {
    this.init();
  }

  init = () => {
    this.loadJSON(this.init2);
  };

  @action
  init2 = responseText => {
    // Parse JSON string into object
    this.obj = JSON.parse(responseText);
    this.calculateAllScores();
    this.findLowestPriceForAllSmartphones();
  };

  loadJSON = callback => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "./data/smartphoneData.json", true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && xobj.status === 200) {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  };

  findLowestPriceForAllSmartphones = () => {
    for (var i = 0; i < this.obj.length; i++) {
      this.obj[i].smallestPrice = this.findLowestPriceForOneSmartphones(
        this.obj[i]
      );
    }
  };

  findLowestPriceForOneSmartphones = smartphone => {
    var lowest = 0;
    for (var i = 1; i < smartphone.types[FilterStore.country].length; i++) {
      if (
        smartphone.types[FilterStore.country][i].price <
          smartphone.types[FilterStore.country][lowest].price &&
        smartphone.types[FilterStore.country][i].price !== 0
      ) {
        lowest = i;
      } else if (smartphone.types[FilterStore.country][lowest].price === 0) {
        lowest = i;
      }
    }
    return lowest;
  };

  calculateAllScores() {
    for (var i = 0; i < this.obj.length; i++) {
      this.obj[i].totalscore = this.calculateScore(this.obj[i]);
    }
  }

  calculateScore(smartphone) {
    return (
      smartphone.design +
      smartphone.processor +
      smartphone.updates +
      smartphone.camera +
      smartphone.battery
    );
  }

  @computed
  get listOfFilteredObjects() {
    var listOfFilteredObjects = [];
    if (this.obj == null) {
      return listOfFilteredObjects;
    }
    for (var i = 0; i < this.obj.length; i++) {
      if (
        this.obj[i].types[FilterStore.country][this.obj[i].smallestPrice]
          .price == null ||
        this.obj[i].types[FilterStore.country][this.obj[i].smallestPrice]
          .price === 0
      ) {
        continue;
      }

      //release-date
      if (
        FilterStore.release_minimum > this.obj[i].released ||
        FilterStore.release_maximum < this.obj[i].released
      ) {
        continue;
      }

      //price
      if (
        FilterStore.price_minimum_1 >
          this.obj[i].types[FilterStore.country][this.obj[i].smallestPrice]
            .price ||
        FilterStore.price_maximum_1 <
          this.obj[i].types[FilterStore.country][this.obj[i].smallestPrice]
            .price
      ) {
        continue;
      }

      //display
      if (
        FilterStore.size_minimum_1 > this.obj[i].display ||
        FilterStore.size_maximum_1 < this.obj[i].display
      ) {
        continue;
      }

      //length
      if (
        FilterStore.size_minimum_2 > this.obj[i].length ||
        FilterStore.size_maximum_2 < this.obj[i].length
      ) {
        continue;
      }

      //width
      if (
        FilterStore.size_minimum_3 > this.obj[i].width ||
        FilterStore.size_maximum_3 < this.obj[i].width
      ) {
        continue;
      }

      //design
      if (this.obj[i].design < FilterStore.design) {
        continue;
      }

      //processor
      if (this.obj[i].processor < FilterStore.processor) {
        continue;
      }

      //software updates
      if (this.obj[i].updates < FilterStore.updates) {
        continue;
      }

      //camera
      if (this.obj[i].camera < FilterStore.camera) {
        continue;
      }

      //battery
      if (this.obj[i].battery < FilterStore.battery) {
        continue;
      }

      //storage
      if (FilterStore.storage !== "") {
        if (this.obj[i].storage < FilterStore.storage) {
          continue;
        }
      }
      //storage
      if (FilterStore.waterproof !== "") {
        if (this.obj[i].waterproof < FilterStore.waterproof) {
          continue;
        }
      }

      //headphonejack
      if (FilterStore.headphoneJack && this.obj[i].headphonejack === 0) {
        continue;
      }

      //simCardInput
      if (FilterStore.simCards && this.obj[i].simcards === 1) {
        continue;
      }

      //sdSLot
      if (FilterStore.sdSlot && this.obj[i].sdslot === 0) {
        continue;
      }

      //notch
      if (FilterStore.notch && this.obj[i].notch === 1) {
        continue;
      }

      listOfFilteredObjects.push(this.obj[i]);
    }
    return listOfFilteredObjects;
  }

  @computed
  get listOfFilteredAndScoredObjects() {
    var listOfFilteredAndScoredObjects = this.listOfFilteredObjects.slice(0);
    switch (FilterStore.filterType) {
      case "price":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionLowest(a, b, "price");
        });

      case "totalscore":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "totalscore");
        });

      case "length":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "length");
        });

      case "display":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "display");
        });

      default:
        return [];
    }
  }

  compareFunctionNormal(a, b, type) {
    return FilterStore.isDescending ? b[type] - a[type] : a[type] - b[type];
  }
  compareFunctionLowest(a, b, type) {
    return FilterStore.isDescending
      ? b.types[FilterStore.country][b.smallestPrice][type] -
          a.types[FilterStore.country][a.smallestPrice][type]
      : a.types[FilterStore.country][a.smallestPrice][type] -
          b.types[FilterStore.country][b.smallestPrice][type];
  }

  getAttributeFromSmartphone = (smartphone, type) => {
    switch (type) {
      case "price":
        return (
          smartphone.types[FilterStore.country][smartphone.smallestPrice][
            type
          ] + "€"
        );
      case "length":
      case "width":
        return smartphone[type] + "mm";
      case "display":
        return smartphone[type] + '"';
      case "totalscore":
        return smartphone[type] + " Points";
      default:
        return smartphone[type];
    }
  };
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
