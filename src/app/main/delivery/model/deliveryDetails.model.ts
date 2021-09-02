import {DeliveryModel} from "./delivery.model";
import {CommandRowModel} from "../../command/model/commandRow.model";

export class DeliveryDetailsModel {
  id?:string;
  delivery: string|DeliveryModel;
  commandRow: string|CommandRowModel;
  quantityDelivered: number;
  addDate?: Date;
}
