/*
|-----------------------------------------
| setting up Menu for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager-Expo, July, 2024
|-----------------------------------------
*/
export type optionsType = { name: string; price?: string };
export type optionType = {
  name: string;
  options?: optionsType[];
  optionFor?: string;
  required?: boolean;
};
export type menuItemType = { item: string; id?: string; price?: string; option?: optionType[]; info?: string };
export type storeValueType = { srl: number; available: number[]; lst: menuItemType[]; i?: string };
export type storeType = { [key: string]: storeValueType };
