import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { Order } from './core/models/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  orders = [];
  pageNumber: number = 0;

  constructor(private data: DataService, private http: HttpClient){}

  ngOnInit(){
    this.data.getOrders().subscribe((data) => {
      let j = -1;
      for(let i of Object.keys(data)){
        if(this.orders.length == 0 || this.orders[j].length > 10){
          this.orders.push([]);
          j++;
        }
        else {
          this.orders[j].push(new Order(data[i].items, data[i].user, data[i].address, data[i].phoneNumber, data[i].date, data[i].processed))
        }
      }
    });
  }

  ngOnDestroy(){
    this.http.put('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Or.json', {Orders: []}).subscribe((val) => {
        console.log("PUT call successful value returned in body", val);
      });
    for(let order of this.orders){
      for(let i of order){
        this.http.post('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', i) .subscribe((val) => {
          console.log("POST call successful value returned in body", val);
        });
      }
    }
  }

  deleteOrder(o: Order){
    let index = this.orders[this.pageNumber].findIndex(el => o == el);
    this.orders[this.pageNumber].splice(index, 1);
  }

  setPageNumber(n: number){
    this.pageNumber = n;
    window.scroll(0,0);
  }
}