import { Component, OnInit } from '@angular/core';
import {UploadFileService} from "./upload-file.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList | undefined;
  currentFile: File | undefined;
  progress = 0;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any> | undefined;

  constructor(private uploadService: UploadFileService) { }

  selectFile(event: Event) {
    this.progressInfos = [];

    // @ts-ignore
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
      // @ts-ignore
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      // @ts-ignore
      event.srcElement.percentage = null;
    }
  }

  upload() {
    this.progress = 0;

    // @ts-ignore
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }

}
