import { Component, OnInit } from '@angular/core';
import {Cost} from "./Cost";
import {CostService} from "./cost.service";
import {ActivatedRoute} from "@angular/router";
import {Person} from "../person/Person";
import {PersonService} from "../person/person.service";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {
  costs: Cost[]
  cost: Cost | undefined
  people: Person[] | undefined
  person: Person | undefined
  id: number
  constructor(private costService: CostService, private route: ActivatedRoute,
              private personService: PersonService) {
    this.costs = [];
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  ngOnInit(): void {
    this.findAll()
  }

  public findAll(){
    this.costService.findAll(this.id).subscribe(
       value => this.costs = value,
      error => alert(error)
    )
  }

  onOpenModal(cost: Cost) {
    this.cost = cost
    this.findPeople()
  }

  findPeople(){
    this.personService.findAll(this.id).subscribe(
      value => this.people = value,
      error => alert(error)
    )
  }

  onUpdateCost(cost: Cost) {
    let idPerson = this.person?.id
    this.costService.update(cost, idPerson, this.id).subscribe(
      value => this.findAll(),
      error => alert(error)
    )

  }

  setUser(person: Person) {
    this.person = person;
  }

  onCreateCost(cost: Cost) {
    let idPerson = this.person?.id
    this.costService.create(cost, idPerson, this.id).subscribe(
      value => this.findAll(),
      error => alert(error)
    )
  }

  onCreatePerson(person: Person) {
    this.personService.create(person, this.id).subscribe(
      value => console.log(value),
      error => alert(error)
    )
  }
}
