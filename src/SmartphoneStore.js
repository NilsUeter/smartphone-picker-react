import { observable, computed, action } from "mobx";

import FilterStore from "./FilterStore.js";

class SmartphoneStore {
  @observable
  obj = [];

  constructor(props) {
    this.loadJSON();
  }

  @action
  init = responseText => {
    this.obj = responseText;
    this.findLowestPriceForAllSmartphones();
  };

  loadJSON = () => {
    fetch("./data/smartphoneData.json")
      .then(r => r.json())
      .then(data => this.init(data));
  };

  @action
  findLowestPriceForAllSmartphones = () => {
    for (let i = 0; i < this.obj.length; i++) {
      this.obj[i].smallestPrice = this.findLowestPriceForOneSmartphones(
        this.obj[i]
      );
    }
  };

  findLowestPriceForOneSmartphones = smartphone => {
    let lowest = 0;
    for (let i = 1; i < smartphone.types[FilterStore.country].length; i++) {
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

  calculateScore(smartphone) {
    return (
      (Math.round(
        smartphone.design +
          smartphone.processor +
          smartphone.updates +
          smartphone.camera +
          smartphone.battery -
          this.monthDiff(new Date(smartphone.released), new Date()) *
            FilterStore.decayFactor
      ) *
        10) /
      10
    );
  }

  monthDiff(dateFrom, dateTo) {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }

  @computed
  get listOfFilteredObjects() {
    let listOfFilteredObjects = [];
    let obj = JSON.parse(JSON.stringify(this.obj));
    if (obj == null) {
      return listOfFilteredObjects;
    }
    for (let i = 0; i < obj.length; i++) {
      if (
        obj[i].types[FilterStore.country][obj[i].smallestPrice].price == null ||
        obj[i].types[FilterStore.country][obj[i].smallestPrice].price === 0
      ) {
        continue;
      }

      //searchQuery
      if (FilterStore.searchQuery !== "") {
        const lowerCaseName = (obj[i].brand + " " + obj[i].name).toLowerCase();
        if (!lowerCaseName.includes(FilterStore.searchQuery.toLowerCase())) {
          continue;
        }
      }

      //release-date
      if (
        FilterStore.release_minimum > obj[i].released ||
        FilterStore.release_maximum < obj[i].released
      ) {
        continue;
      }

      //price
      if (
        FilterStore.price_minimum_1 >
          obj[i].types[FilterStore.country][obj[i].smallestPrice].price ||
        FilterStore.price_maximum_1 <
          obj[i].types[FilterStore.country][obj[i].smallestPrice].price
      ) {
        continue;
      }

      //display
      if (
        FilterStore.size_minimum_1 > obj[i].display ||
        FilterStore.size_maximum_1 < obj[i].display
      ) {
        continue;
      }

      //length
      if (
        FilterStore.size_minimum_2 > obj[i].length ||
        FilterStore.size_maximum_2 < obj[i].length
      ) {
        continue;
      }

      //width
      if (
        FilterStore.size_minimum_3 > obj[i].width ||
        FilterStore.size_maximum_3 < obj[i].width
      ) {
        continue;
      }

      //design
      if (obj[i].design < FilterStore.design) {
        continue;
      }

      //processor
      if (obj[i].processor < FilterStore.processor) {
        continue;
      }

      //software updates
      if (obj[i].updates < FilterStore.updates) {
        continue;
      }

      //camera
      if (obj[i].camera < FilterStore.camera) {
        continue;
      }

      //battery
      if (obj[i].battery < FilterStore.battery) {
        continue;
      }

      //storage
      if (FilterStore.storage !== "") {
        if (obj[i].storage < FilterStore.storage) {
          continue;
        }
      }
      //storage
      if (FilterStore.waterproof !== "") {
        if (obj[i].waterproof < FilterStore.waterproof) {
          continue;
        }
      }

      //headphonejack
      if (FilterStore.headphoneJack && obj[i].headphonejack === 0) {
        continue;
      }

      //simCardInput
      if (FilterStore.simCards && obj[i].simcards === 1) {
        continue;
      }

      //sdSLot
      if (FilterStore.sdSlot && obj[i].sdslot === 0) {
        continue;
      }

      //notch
      if (FilterStore.notch && obj[i].notch === 1) {
        continue;
      }

      //calculate score new
      obj[i].totalscore = this.calculateScore(obj[i]);

      listOfFilteredObjects.push(obj[i]);
    }
    return listOfFilteredObjects;
  }

  @computed
  get listOfFilteredAndScoredObjects() {
    let listOfFilteredAndScoredObjects = this.listOfFilteredObjects.slice(0);
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
      case "released":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareDates(a, b, "released");
        });

      default:
        console.log("Case not defined.");
        return [];
    }
  }

  compareDates(a, b, type) {
    return FilterStore.isDescending ? b[type] > a[type] : a[type] > b[type];
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
