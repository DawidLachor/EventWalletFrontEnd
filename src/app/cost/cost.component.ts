import { Component, OnInit } from '@angular/core';
import {Cost} from "./Cost";
import {CostService} from "./cost.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {
  costs: Cost[]
  constructor(private costService: CostService, private route: ActivatedRoute,) {
    this.costs = [];
  }

  ngOnInit(): void {
    this.findAll()
  }

  public findAll(){
    let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.costService.findAll(id).subscribe(
       value => this.costs = value,
      error => alert(error)
    )
  }
}
