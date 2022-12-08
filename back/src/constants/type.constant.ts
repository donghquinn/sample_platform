export type ElementsListType = typeof ElementsList[keyof typeof ElementsList];

export const ElementsList = Object.freeze({
  old: 'old',
  young: 'young',
  salty: 'salty',
  unsalty: 'unsalty',
  sweet: 'sweet',
  unsweet: 'unsweet',
  spicy: 'spicy',
  unspicy: 'unspicy',
  hot: 'hot',
  unhot: 'unhot',
  sea: 'sea',
  earth: 'earth',
  heavy: 'heavy',
  light: 'light',
});
