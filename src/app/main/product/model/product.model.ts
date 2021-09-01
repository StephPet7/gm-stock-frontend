export class ProductModel {
  id?:string;
  name: string;
  description: string;
  unitPrice: number;
  stockUnit: string;
  stockQuantity: number;
  alertThreshold: number;
  addDate?: Date;
}
