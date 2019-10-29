import React from "react";
import { observer } from "mobx-react";
import FilterBox from "../FilterBox";

import MultiCheckBox from "../MultiCheckBox";
import SmartphoneStore from "../SmartphoneStore.js";

export const Area5 = observer(() => {
  return (
    <FilterBox header="Brands" startClosed={true}>
      <MultiCheckBox
        name="selectedBrands"
        options={SmartphoneStore.getUniqueBrands()}
      />
    </FilterBox>
  );
});
