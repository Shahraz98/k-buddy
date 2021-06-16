import { Component } from "react";

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
export type SuccessProps = {
  addAnother?: () => void,
  mainText: string,
  subText: string,
  buttonText?: string,
}

export type BoughtProps = {
  proname: string,
  bought: string
}

export type FilterProps = {
  filterby: string, //Property, e.g. location, category, confection
  filterto: string  //Property name, e.g. fridge, fruit, fresh
}

export type WarningProps = {
  iconColor: string,
  positive: boolean,
  mainText?: string,
  subText?: string,
  mainColor?: string,
  subColor?: string,
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  AddItem: undefined;
  Home: undefined;
  QueriesScreen: undefined;
};

export type ShapeProps = {
  proname: string,
  prodate1: string,
  prodate2: string,
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
  arrIndex: number,
  titleArr: Array<string>,
  placeHold?: string,
  groupArr?: Array<string>
}

export type ButtonProps = {
  btnText: string,
  btnColor: 'dark' | 'tint' | 'light',
}

export type ScannerProps = {
  handleClosing: () => void,
  handleScanning: ({data}: any) => Promise<void>,
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
  expiry: string,
  confection?: string,
  location?: string,
  addedOn: string,
  maturity?: string,
  maturitydate?: string,
  isOpen: boolean,
  recentlyBought?: boolean,
  boughtOn?: string,
}

export type DefListProps = {
  items: ProductType[],
}

export type ProductProps = {
  item: ProductType,
}

export type ColoredProps = {
  item: ProductType,
  short?: boolean,
}

export type DisplayerProps = {
  items: ProductType[],
  text: string,
  shape?: string,
  colored?: boolean,
}

export type GroupProps = {
  items: ProductType[],
  filterby: "Category" | "Location" | "Confection",
  groupIcon?: string,
}
