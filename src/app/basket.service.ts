import { BasketItem } from './models';


export class BasketService{
  countOfOrders: number = JSON.parse(localStorage.getItem('Order')) ? JSON.parse(localStorage.getItem('Order')).length : 0;

  getLength(){
    return this.countOfOrders;
  }

  add(order: BasketItem){
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

  delete(order: BasketItem){
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

  incOrder(o: BasketItem, act: string){
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
