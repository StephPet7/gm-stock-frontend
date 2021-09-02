export class CommandModel{
  id?:string;
  addDate?: Date;
  commandDate?: Date;
  title: string | undefined;
  command_by: any;
  totalPrice: number | undefined;
}
