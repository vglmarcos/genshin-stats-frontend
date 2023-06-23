import { Component } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {
  public routes: Array<any>;
  constructor() {
    this.routes = [
      {
        name: "Inicio",
        link: "/"
      },
      {
        name: "Acerca de",
        link: "/about"
      },
    ];
  }
}
