

export interface ProductDTO {
    title: string;
    description: string;
    numberInStock: number;
    categoryId: string;
    image: {
        filename: string;
        contentType: string;
        path: string;
      }
  }