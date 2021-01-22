import { Component } from '@angular/core';
import { DataService } from '../../app-core/services/data.service';
import { BasketService } from '../../app-core/services/basket.service';
import { ProductWithChoise, BasketItem } from '../../app-core/models/models';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
  }

  changePicture(){
  }

}