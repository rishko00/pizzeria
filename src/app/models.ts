abstract class Product{
  name: string;
  price: number;
  image: string;

  constructor(name, price, image){
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

abstract class ProductWithChoise{
  name: string;
  price: number;
  image: string;
  prices: Object;
  size: string;

  constructor(name, image, prices){
    this.name = name;
    this.image = image;
    this.prices = prices;
    this.size = Object.keys(prices)[0];
    this.price = prices[this.size];
  };

  setSize(size: string){
    this.size = size;
    this.price = this.prices[size];
  };
}

export class Ingredient extends Product{
  constructorImage: string;
  count: number;

  constructor(name, price, image, constructorImage){
    super(name, price, image);
    this.constructorImage = constructorImage;
    this.count = 0;
  }

  addItem(){
    if(this.count < 5){
      this.count++;
    }
  }

  delItem(){
    if(this.count > 0){
      this.count--;
    }
  }
}

export class Pizza extends ProductWithChoise{
  ingredients: Ingredient[];

  constructor(name, image, prices){
    super(name, image, prices);
    this.ingredients = [];
  };

  setSize(size: string){
    this.size = size;
    this.price = this.prices[size];
  };

  gop(){
    console.log('dddd')
  }
}


export class BasketItem{
  item: Pizza;
  totalPrice: number;
  count: number;

  constructor(item, totalPrice, count){
    this.item = item;
    this.totalPrice = totalPrice;
    this.count = count;
  }
}

export class Order{
  items: BasketItem[];
  totalPrice: number;
  user: string;
  address: string;
  phoneNumber: string;
  date: Date;

  constructor(items, user, address, phoneNumber, date){
    this.address = address;
    this.items = items;
    this.user = user;
    this.phoneNumber = phoneNumber;
    this.date = date;
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice(){
    let sum = 0;
    for(let i of this.items){
      sum += i['totalPrice'];
    }
    return sum;
  }
}