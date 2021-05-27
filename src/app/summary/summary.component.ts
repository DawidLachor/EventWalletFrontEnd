import { Component, OnInit } from '@angular/core';
import {CostService} from "../cost/cost.service";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../person/person.service";
import {Person} from "../person/Person";
import {SummaryService} from "./summary.service";
import {Summary} from "./Summary";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summaries: Summary[] | undefined
  id: number
  constructor(private route: ActivatedRoute,
              private summaryService: SummaryService){
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

}
