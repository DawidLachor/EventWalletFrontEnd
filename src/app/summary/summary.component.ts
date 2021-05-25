import { Component, OnInit } from '@angular/core';
import {CostService} from "../cost/cost.service";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../person/person.service";
import {Person} from "../person/Person";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  people: Person[] | undefined
  id: number
  constructor(private costService: CostService, private route: ActivatedRoute,
              private personService: PersonService){
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
  }

  ngOnInit(): void {
    this.findPeople()
  }

  findPeople(){
    this.personService.findAll(this.id).subscribe(
      value => this.people = value,
      error => alert(error)
    )
  }

}
