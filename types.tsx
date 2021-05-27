/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  AddItem: undefined;
  QueriesScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  List: undefined;
  Queries: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type NewItemParamList = {
  NewItemScreen: undefined;
};

export type QueriesParamList = {
  QueriesScreen: undefined;
};

export type  StringCallback = (
  name:string, 
  brand?:string, 
  category?:string, 
  location?:string, 
  confection?:string, 
  maturity?:string, 
  datepick?:Date) => void

export type ProductType = {
  id: string,
  brand?: string,
  category?: string,
  name: string,
  expiry?: string,
  confection?: string,
  location?: string,
  addedOn: string,
  maturity?: string,
  maturitydate?: string,
  isOpen?: boolean,
}

export type DefListProps = {
  items: ProductType[],
}

export type RowProps = {
  product: ProductType,
}
