import {UserModel} from "../../user/model/user.model";

export class DeliveryModel {
  id?:string;
  deliveryDate?: Date;
  received_by: string | UserModel;
}
