export function monthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}

export function getAttributeFromSmartphone(smartphone, attribute) {
  switch (attribute) {
    case "price":
      return smartphone.phoneModels[0].modelTypes[0][attribute] + "€";
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
}
