import {CommandModel} from "./command.model";
import {ProductModel} from "../../product/model/product.model";

export class CommandRowModel {
  id?:string;
  command: string | CommandModel;
  product: string | ProductModel;
  quantityOrdered: number;
}
