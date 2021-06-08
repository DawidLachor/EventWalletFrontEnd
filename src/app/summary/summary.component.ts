import { Component, OnInit } from '@angular/core';
import {CostService} from "../cost/cost.service";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../person/person.service";
import {Person} from "../person/Person";
import {SummaryService} from "./summary.service";
import {Summary} from "./Summary";
import {Cost} from "../cost/Cost";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summaries: Summary[] | undefined
  id: number
  cost: Cost
  constructor(private route: ActivatedRoute,
              private summaryService: SummaryService, private costService: CostService){
    this.cost = {
      id: 0,
      name: "Zwrot kosztów",
      description: "Zwrot",
      cost: 0,
      dateOfPay: ""
    }
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
  }

  ngOnInit(): void {
    this.findPeople()
  }

  findPeople(){
    this.summaryService.getSummary(this.id).subscribe(
      value => this.summaries = value,
      error => alert(error)
    )
  }

  repayment(summary: Summary){
    this.cost.cost = Math.abs(summary.cost);
    this.costService.create(this.cost, summary.id, this.id).subscribe(
      value => this.findPeople())
  }

}
