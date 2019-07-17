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
  };

  loadJSON = () => {
    fetch("./data/smartphoneData.json")
      .then(r => r.json())
      .then(data => this.init(data));
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
      if (FilterStore.onlyShowFavedPhones) {
        if (
          FilterStore.selectedFavorites[obj[i].brand + " " + obj[i].name] ==
          null
        ) {
          continue;
        }
      } else {
        if (FilterStore.searchQuery !== "") {
          //searchQuery
          const lowerCaseName = (
            obj[i].brand +
            " " +
            obj[i].name
          ).toLowerCase();
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

        //brands
        if (
          FilterStore.selectedBrands.length > 0 &&
          FilterStore.selectedBrands.indexOf(obj[i].brand) === -1
        ) {
          continue;
        }

        //storage
        obj[i].types = obj[i].types.filter(
          type => type.storage >= FilterStore.storage
        );

        for (let t = 0; t < obj[i].types.length; t++) {
          for (let c = 0; c < obj[i].types[t].colors.length; c++) {
            //price
            if (
              obj[i].types[t].colors[c].price === 0 ||
              FilterStore.price_minimum_1 > obj[i].types[t].colors[c].price ||
              FilterStore.price_maximum_1 < obj[i].types[t].colors[c].price
            ) {
              if (obj[i].types[t].colors.length === 1) {
                obj[i].types.splice(t, 1);
                t--;
                break;
              } else {
                obj[i].types[t].colors.splice(c, 1);
                c--;
              }
            }
          }
        }

        if (obj[i].types.length < 1) {
          continue;
        }
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

  getUniqueBrands() {
    var unique = [];
    this.obj.forEach(element => {
      if (unique.indexOf(element.brand) === -1) {
        unique.push(element.brand);
      }
    });

    unique.sort();
    return unique;
  }

  compareDates(a, b, type) {
    return FilterStore.isDescending ? b[type] > a[type] : a[type] > b[type];
  }

  compareFunctionNormal(a, b, type) {
    return FilterStore.isDescending ? b[type] - a[type] : a[type] - b[type];
  }

  compareFunctionLowest(a, b, type) {
    return FilterStore.isDescending
      ? b.types[0].colors[0][type] - a.types[0].colors[0][type]
      : a.types[0].colors[0][type] - b.types[0].colors[0][type];
  }

  getAttributeFromSmartphone = (smartphone, type) => {
    switch (type) {
      case "price":
        return smartphone.types[0].colors[0][type] + "€";
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
