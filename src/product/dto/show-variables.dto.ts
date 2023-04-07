
export class ShowVariablesDto {
    product: number;
    stock: number;
    variables: {
      [key: string]: string;
    };
  }
  