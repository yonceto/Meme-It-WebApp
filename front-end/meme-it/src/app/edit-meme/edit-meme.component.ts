import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../upload/upload-file.service';
import { Meme } from '../meme';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.css']
})
export class EditMemeComponent implements OnInit {
  memeTitle: String;
  memePath: String;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  @Input() meme: Meme;
  @ViewChild('fileInput') fileInput;
  
  constructor(
    private uploadService: UploadFileService,
    private memeService: MemeService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMeme();
  }

  onEnter(value: string)
   { this.meme.title = value; }

  getMeme(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.memeService.getMeme(id)
    .subscribe(meme => { 
      this.meme = meme;
      this.memeTitle = meme.title; 
    });
  }

  editMeme() {
    if(this.memeTitle === this.meme.title) {
      alert("Must change title");
      return;
    }
    this.memeService.updateMeme(this.meme);
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
        this.meme.image = new String(event.body).valueOf();
      }
    })
   
    this.selectedFiles = undefined
  }


}
