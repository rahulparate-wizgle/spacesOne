// tslint:disable-next-line: class-name
export class arrayModel {
  key: string;
  value: string;
}

// tslint:disable-next-line: class-name
export class productModel {
  id: number;
  category: string;
  name: string;
  ratings = 0;
  reviewCount = 0;
  discount: number;
  oriRate: number;
  disRate: number;
  feature: string[];
  specification?: arrayModel[];
  images: string[];
  colorVariant: arrayModel[];
  price?: number;
  manufacture_name?: string;
  manufacture_brand?: string;
}

// tslint:disable-next-line: class-name
export class filterObject {
  discountRates: number[];
  maxVal: number;
  minVal: number;
}

export const productList: productModel[] = [
  {
      id: 1,
      category: 'T-shirts',
      name: 'Half sleeve T-shirt',
      ratings: 0,
      reviewCount: 0,
      discount: 10,
      oriRate: 450,
      disRate: 405,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'red'
      }],
      images: ['https://pix10.agoda.net/hotelImages/444/444689/444689_14031314460018684107.jpg?s=1024x768', 'https://tse1.mm.bing.net/th?id=OIP.UE9B5rZivhvL4UU4E4XhxAHaD4&pid=Api&P=0', 'https://kharadipune.com/wp-content/uploads/2019/01/Radisson-blue-hotel-kharadi-pune.jpg'],
      colorVariant: [{
          key: 'red',
          value: 'https://pix10.agoda.net/hotelImages/444/444689/444689_14031314460018684107.jpg?s=1024x768'
      },

      {
          key: 'black',
          value: 'https://pix10.agoda.net/hotelImages/444/444689/444689_14031314460018684107.jpg?s=1024x768'
      }]
  },
  {
      id: 2,
      category: 'T-shirts',
      name: 'Black T-shirt',
      ratings: 0,
      reviewCount: 0,
      discount: 20,
      oriRate: 225,
      disRate: 175,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'Light Blue'
      }],
      images: ['https://tse3.mm.bing.net/th?id=OIP.wP1bfNRZ1I4e9m1BVuJiUgHaE8&pid=Api&P=0', 'http://static.businessworld.in/upload/vhbpzY_radison_piv.jpg', 'https://tse3.mm.bing.net/th?id=OIP.wP1bfNRZ1I4e9m1BVuJiUgHaE8&pid=Api&P=0'],
      colorVariant: [{
          key: 'red',
          value: 'https://tse3.mm.bing.net/th?id=OIP.wP1bfNRZ1I4e9m1BVuJiUgHaE8&pid=Api&P=0'
      },
      {
          key: 'yellow',
          value: 'assets/images/product/img-2a.png'
      },
      {
          key: 'green',
          value: 'assets/images/product/img-2b.png'
      }
      ]
  },
  {
      id: 3,
      category: 'T-shirts',
      name: 'Printed T-shirt',
      ratings: 0,
      reviewCount: 0,
      discount: 14,
      oriRate: 177,
      disRate: 152,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'black'
      }],
      images: ['assets/images/product/img-3.png', 'assets/images/product/img-3a.png', 'assets/images/product/img-3b.png'],
      colorVariant: [{
          key: 'blue',
          value: 'assets/images/product/img-3a.png'
      },
      {
          key: 'yellow',
          value: 'assets/images/product/img-3.png'
      }]
  },
  {
      id: 4,
      category: 'T-shirts',
      name: 'Plain T-shirt',
      ratings: 4,
      reviewCount: 152,
      discount: 5,
      oriRate: 150,
      disRate: 145,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'blue'
      }],
      images: ['assets/images/product/img-4.png', 'assets/images/product/img-4a.png', 'assets/images/product/img-4b.png'],
      colorVariant: [{
          key: 'pink',
          value: 'assets/images/product/img-4.png'
      },
      {
          key: 'blue',
          value: 'assets/images/product/img-4b.png'
      }]
  },
  {
      id: 5,
      category: 'T-shirts',
      name: 'Half sleeve T-Shirt',
      ratings: 0,
      reviewCount: 0,
      discount: 14,
      oriRate: 177,
      disRate: 152,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'pink'
      }],
      images: ['assets/images/product/img-5.png', 'assets/images/product/img-5a.png', 'assets/images/product/img-5b.png'],
      colorVariant: [{
          key: 'pink',
          value: 'assets/images/product/img-5b.png'
      },
      {
          key: 'green',
          value: 'assets/images/product/img-5a.png'
      }]
  },
  {
      id: 6,
      category: 'T-shirts',
      name: 'Full Sleeve T-shirt',
      ratings: 0,
      reviewCount: 0,
      discount: 50,
      oriRate: 200,
      disRate: 100,
      feature: ['Fit Type: Regular Fit', 'highest quality fabric', 'Suitable for all weather condition', 'Excellent Washing and Light Fastness'],
      specification: [{
          key: 'size',
          value: 'M'
      },
      {
          key: 'color',
          value: 'green'
      }],
      images: ['assets/images/product/img-6.png', 'assets/images/product/img-6a.png', 'assets/images/product/img-6b.png'],
      colorVariant: [{
          key: 'black',
          value: 'assets/images/product/img-6.png'
      },
      {
          key: 'yellow',
          value: 'assets/images/product/img-6a.png'
      }]
  }
];
