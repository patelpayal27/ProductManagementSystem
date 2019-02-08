export class productsdetails {
  ProductId: number;
  ProductCategoryId: number;
  ProductCategoryName: string;
  Name: string;
  Description: string;
  OpeType: string;
  lstProductAttributes: attrdetails[];
}
export class attrdetails {
  AttributeId: number;
  ProductId: number;
  ProductCategoryId: number;
  ProductCategoryName: string;
  AttributeName: string;
  AttributeValue: string;
}
