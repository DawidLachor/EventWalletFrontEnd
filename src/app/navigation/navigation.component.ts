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

  logout() {
    localStorage.removeItem('authenticationToken');
    this.router.navigate(['']);
    this.service.checkJWT()
  }
}
