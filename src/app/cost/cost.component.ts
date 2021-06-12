import { Component, OnInit } from '@angular/core';
import {Cost} from "./Cost";
import {CostService} from "./cost.service";
import {ActivatedRoute} from "@angular/router";
import {Person} from "../person/Person";
import {PersonService} from "../person/person.service";
import {Observable} from "rxjs";
import {UploadFileService} from "../upload-files/upload-file.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {SummaryService} from "../summary/summary.service";
import {Summary} from "../summary/Summary";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {
  costs: Cost[]
  cost: Cost | undefined
  people: Person[] | undefined
  personSet: Person | undefined
  person: Person | undefined
  id: number

  progressInfos = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  idFile = '';
  idCost = 0;

  fileInfos?: Observable<any>;
  constructor(private costService: CostService, private route: ActivatedRoute,
              private personService: PersonService,private uploadService: UploadFileService, private summaryService: SummaryService) {
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
    this.findAllPeople()
    this.findPersonByCost(cost.id)
    this.fileInfos = this.uploadService.getFilesByCost(cost.id)
  }

  findAllPeople(){
    this.personService.findAll(this.id).subscribe(
      value => this.people = value,
      error => alert(error)
    )
  }

  findPersonByCost(costId: number){
    this.personService.findByIdCost(costId,this.id).subscribe(
      value => this.person = value
    )
  }

  onUpdateCost(cost: Cost) {
    let idPerson = this.personSet?.id
    if (this.personSet?.id == undefined){
      idPerson = this.person?.id
    }
    this.costService.update(cost, idPerson, this.id).subscribe(
      value => this.findAll(),
      error => alert(error)
    )
    this.uploadFile(cost)
    this.personSet = undefined;
    this.message = "";
  }

  setUser(person: Person) {
    this.personSet = person;
  }

  onCreateCost(cost: Cost) {
    let idPerson = this.personSet?.id
    this.costService.create(cost, idPerson, this.id).subscribe(
      value => {
        this.findAll();
        this.idCost = value.id;
        this.connectFileWithCost();
      },
      error => alert(error)
    )

    this.personSet = undefined;
    this.message = "";
  }

  connectFileWithCost(){
    if(this.idFile != '')
      this.uploadService.connectFileWithCost(this.idFile, this.idCost).subscribe()
    this.idFile = '';
  }

  onCreatePerson(person: Person) {
    this.personService.create(person, this.id).subscribe(
      value => console.log(value),
      error => alert(error)
    )
  }

  onDeleteCost(cost: Cost) {
    this.costService.delete(cost.id, this.id).subscribe(
      value => this.findAll()
    )
  }

  selectFile(event: any): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  uploadFile(cost: Cost): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, cost.id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFilesByCost(cost.id);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

  createFile() {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.create(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.idFile = event.body.idFile;
              this.fileInfos = this.uploadService.getFilesById(this.idFile);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }
}
