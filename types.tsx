/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
export type SuccessProps = {
  addAnother?: () => void,
  mainText: string,
  subText: string,
  buttonText?: string
}

export type FilterProps = {
  filterby: string, //Property, e.g. location, category, confection
  filterto: string  //Property name, e.g. fridge, fruit, fresh
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  AddItem: undefined;
  Home: undefined;
  QueriesScreen: undefined;
};

export type SquareProps = {
  proname: string,
  proexp: string,
  proadd: string,
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

export type myFormElementProps = {
  handleUpdate: (title:string, index: number) => void,
  titleArr: Array<string>,
  arrIndex: number,
  placeHold?: string,
  groupArr?: Array<string>
}

export type  StringCallback = (
  name:string, 
  brand?:string, 
  category?:string, 
  location?:string, 
  confection?:string, 
  maturity?:string, 
  datepick?:Date) => void

export type FormProps = {
    onDataReady: StringCallback,
    product?: ProductType,
    editor: boolean
}

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

export type ProductProps = {
  item: ProductType,
}

export type RowProps = {
  product: ProductType,
}

export type GroupProps = {
  items: ProductType[],
  filterby: "Category" | "Location" | "Confection",
  groupIcon?: string,
}
