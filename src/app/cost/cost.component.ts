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
  createdPerson: Person | undefined

  constructor(private costService: CostService, private route: ActivatedRoute,
              private personService: PersonService) {
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

  onOpenModal(cost: Cost) {
    this.cost = cost
    this.findPeople()
  }

  findPeople(){
    let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.personService.findAll(id).subscribe(
      value => this.people = value,
      error => alert(error)
    )
  }

  onUpdateCost(cost: Cost) {
    let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    let idPerson = this.person?.id
    this.costService.update(cost, idPerson, id).subscribe(
      value => this.findAll(),
      error => alert(error)
    )

  }

  setUser(person: Person) {
    this.person = person;
  }

  onCreateCost(cost: Cost) {
    let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    let idPerson = this.person?.id
    this.costService.create(cost, idPerson, id).subscribe(
      value => this.findAll(),
      error => alert(error)
    )
  }

  onCreatePerson(person: Person) {
    let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.personService.create(person, id).subscribe(
      value => console.log(value),
      error => alert(error)
    )
  }
}
