import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileService } from '../upload/upload-file.service';
import { Meme } from '../meme';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {
  memeTitle: string;
  memePath: string;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  httpClient: HttpClient;

  @ViewChild('fileInput') fileInput;

  constructor(private uploadService: UploadFileService, http: HttpClient) { 
    this.httpClient = http;
  }

  ngOnInit() {
  }

  onEnter(value: string)
   { this.memeTitle = value; }

  createMeme() {
    let meme: Meme = new Meme();
    meme.title = this.memeTitle;
    meme.image = this.memePath;
    const req = new HttpRequest('POST', 'http://localhost:8080/meme', meme); 
    
    this.httpClient.request(req).subscribe(
      res => {
        console.log(res);
      },
      err => {
          console.log("Error occured");
      }
  );
  }

  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
 
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.memePath = new String(event.body).valueOf();
        this.memePath = "http://localhost:8080" + this.memePath;
      }
    })
   
    this.selectedFiles = undefined
  }
}

