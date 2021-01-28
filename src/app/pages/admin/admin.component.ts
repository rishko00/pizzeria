import { Component } from '@angular/core';
import { DataService } from '../../app-core/services/data.service';
import { AuthService } from '../../app-core/services/auth.service';
import { Order } from '../../app-core/models/models';
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

  constructor(private data: DataService, private http: HttpClient, private auth: AuthService){}

  ngOnInit(){
    this.data.getOrders().subscribe((data) => {
      let j = -1;
      for(let i of Object.keys(data)){
        this.orders.push(new Order(data[i].items, data[i].user, data[i].address, data[i].phoneNumber, data[i].date, data[i].processed))
      }
    });
  }

  ngOnDestroy(){
    this.http.put('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', {Orders: []}).subscribe((val) => {
        console.log("PUT call successful value returned in body", val);
    });
    for(let order of this.orders){
        this.http.post('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', order) .subscribe((val) => {
          console.log("POST call successful value returned in body", val);
      });
    }
  }

  deleteOrder(o: Order){
    let index = this.orders.findIndex(el => o == el);
    this.orders.splice(index, 1);
  }

  setPageNumber(n: number){
    this.pageNumber = n;
    window.scroll(0,0);
  }
}