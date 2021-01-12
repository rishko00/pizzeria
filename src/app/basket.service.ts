class Pizza{
  name: string;
  info: string;
  price: Object;
  image: string;
  defaultSize: string;
  ingredients: Ingredient[];

  constructor(name, info, price, image, ingredients){
    this.name = name;
    this.info = info;
    this.image = image;
    this.price = price;
    this.ingredients = ingredients;
  }
}


class Ingredient{
  name: string;
  price: number;
  image: string;

  constructor(name, price, image){
    this.name = name;
    this.price = price;
    this.image = image;
  }
}


class Order{
  item: Pizza;
  totalPrice: number;
  count: number;

  constructor(item, totalPrice, count){
    this.item = item;
    this.totalPrice = totalPrice;
    this.count = count;
  }
}


export class BasketService{
  countOfOrders: number = JSON.parse(localStorage.getItem('Order')) ? JSON.parse(localStorage.getItem('Order')).length : 0;


  getLength(){
    return this.countOfOrders;
  }

  add(order: Order){
    let obj = new Array();
    let data = JSON.parse(localStorage.getItem('Order'));
    if(data == null){
      obj.push(order);
      localStorage.setItem('Order', JSON.stringify(obj));
    }

    else{
      if (order.item['ingredients']) order.item['ingredients'].sort();
      for(let i of data){
        if (i.item['ingredients']) i.item['ingredients'].sort();
        if(JSON.stringify(i.item) == JSON.stringify(order.item)){
          i.count++;
          localStorage.setItem('Order', JSON.stringify(data));
          return;
        }
      }

      data.push(order);
      localStorage.setItem('Order', JSON.stringify(data));
      this.countOfOrders++;
    } 
  }

  delete(order: Order){
    let arr = this.getItems();
    for(let i of arr){
      if(JSON.stringify(i) == JSON.stringify(order)){
        let c = arr.findIndex(el => el == i);
        arr.splice(c, 1);
        break;
      }
    }
    localStorage.setItem('Order', JSON.stringify(arr));
  }

  getItems(){
    return JSON.parse(localStorage.getItem('Order'));
  }

  incOrder(o: Order, act: string){
    let arr = this.getItems();
    for(let i of arr){
      if(JSON.stringify(i) == JSON.stringify(o)){
        if(act == '+') {
          i.count++;
        }
        if(act == '-' && i.count > 1) {
          i.count--;
        }
        break; 
      }
    }
    localStorage.setItem('Order', JSON.stringify(arr));
  }
}
