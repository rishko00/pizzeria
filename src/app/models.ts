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

  constructor(name, price, image, constructorImage){
    super(name, price, image);
    this.constructorImage = constructorImage;
  }
}

export class PizzaBase extends ProductWithChoise{
  constructorImage: string;

  constructor(name, image, prices){
    super(name, image, prices);
    this.constructorImage = image;
  }
}

export class Pizza extends ProductWithChoise{
  ingredients: Ingredient[];
  info: string;

  constructor(name, image, prices, info){
    super(name, image, prices);
    this.ingredients = [];
    this.info = info;
  };

  setSize(size: string){
    this.size = size;
    this.price = this.prices[size];
  };

  getCountOfIngredient(ingr: Ingredient){
    let res = 0;
    if(this.ingredients){
      for(let i of this.ingredients){
        if(i == ingr) res++;
      }
    }
    return res;
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
  processed: boolean;

  constructor(items, user, address, phoneNumber, date, processed){
    this.address = address;
    this.items = items;
    this.user = user;
    this.phoneNumber = phoneNumber;
    this.date = date;
    this.processed = processed;
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