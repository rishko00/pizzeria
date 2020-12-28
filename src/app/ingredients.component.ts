import { Input, Component } from '@angular/core';
      

class Pizza{
    name: string;
    info: string;
    price: Object;
    image: string;
    defaultSize: string = '22 cm';
}


@Component({
    selector: 'ingredients',
    template: `<p>Имя пользователя: {{userName}}</p>
              <p>Возраст пользователя: {{userAge}}</p>`
})


export class IngredientsComponent{ 
    @Input() pizza: Pizza;
}