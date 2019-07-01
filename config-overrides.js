const {
  adjustWorkbox,
  override,
  addDecoratorsLegacy
} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy(),
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true
    })
  )
);
