import { observable, computed, action } from "mobx";

import FilterStore from "./FilterStore.js";

class SmartphoneStore {
  @observable
  obj = [];

  @observable
  hasLoaded = false;

  constructor(props) {
    this.loadJSON();
  }

  @action
  init = responseText => {
    this.obj = responseText;
    // Set variable to show it finished loading
    this.hasLoaded = true;
  };

  loadJSON = () => {
    fetch("https://api.smartphone-picker.com/v1/Smartphone.php")
      .then(r => r.json())
      .then(data => this.init(data));
  };

  calculateScore(smartphone) {
    return (
      Math.round(
        (smartphone.design +
          smartphone.cpu +
          smartphone.updates +
          smartphone.camera +
          smartphone.battery -
          this.monthDiff(new Date(smartphone.released), new Date()) *
            FilterStore.decayFactor) *
          10
      ) / 10
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
        if (obj[i].cpu < FilterStore.cpu) {
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
        if (FilterStore.headphoneJack && obj[i].headphoneJack === 0) {
          continue;
        }

        //simCardInput
        if (FilterStore.simCards && obj[i].simCards === 1) {
          continue;
        }

        //sdSLot
        if (FilterStore.sdSlot && obj[i].sdSlot === 0) {
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
        obj[i].models = obj[i].models.filter(
          model => model.storage >= FilterStore.storage
        );

        for (let t = 0; t < obj[i].models.length; t++) {
          for (let c = 0; c < obj[i].models[t].types.length; c++) {
            //price
            if (
              FilterStore.price_minimum_1 > obj[i].models[t].types[c].price ||
              FilterStore.price_maximum_1 < obj[i].models[t].types[c].price
            ) {
              if (obj[i].models[t].types.length === 1) {
                obj[i].models.splice(t, 1);
                t--;
                break;
              } else {
                obj[i].models[t].types.splice(c, 1);
                c--;
              }
            }
          }
        }

        if (obj[i].models.length < 1) {
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

  compareDates(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] > a[attribute]
      : a[attribute] > b[attribute];
  }

  compareFunctionNormal(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] - a[attribute]
      : a[attribute] - b[attribute];
  }

  compareFunctionLowest(a, b, attribute) {
    return FilterStore.isDescending
      ? b.models[0].types[0][attribute] - a.models[0].types[0][attribute]
      : a.models[0].types[0][attribute] - b.models[0].types[0][attribute];
  }

  getAttributeFromSmartphone = (smartphone, attribute) => {
    switch (attribute) {
      case "price":
        return smartphone.models[0].types[0][attribute] + "€";
      case "length":
      case "width":
        return smartphone[attribute] + "mm";
      case "display":
        return smartphone[attribute] + '"';
      case "totalscore":
        return smartphone[attribute] + " Points";
      default:
        return smartphone[attribute];
    }
  };
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
