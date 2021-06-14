import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "./navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, public service: NavigationService) { }

  ngOnInit(): void {
    this.service.checkJWT();
  }

  //Wylogowanie
  logout() {
    //Usunięcie tokena JWT z cooki
    localStorage.removeItem('authenticationToken');
    //Przekierowanie do strony startowej
    this.router.navigate(['']);
    //Sprawdzenia tokena
    this.service.checkJWT()
  }

  //Przekierowanie
  navigation() {
    if (this.service.jwt){
      this.router.navigate(['/wallet']);
    } else {
      this.router.navigate(['']);
    }
  }
}
