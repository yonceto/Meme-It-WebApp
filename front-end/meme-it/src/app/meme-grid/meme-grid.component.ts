import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { Meme } from '../meme';
import { MemeService } from '../meme.service';
import { Domain } from '../domain';
import { MyDomain } from '../my-domain';

@Component({
  selector: 'app-meme-grid',
  templateUrl: './meme-grid.component.html',
  styleUrls: ['./meme-grid.component.css']
})
 

export class MemeGridComponent implements OnInit {
  myDomain: Domain;
  memes: Meme[];
  filteredMemes: Meme[];
  p: Number = 1;
  count: Number;

  constructor(private memeService: MemeService) { 
    this.myDomain = MyDomain;
    this.memeService.memesUrl = this.myDomain.address;
  }

  ngOnInit() {
    this.memeService.findAll().subscribe(
      memes => {
        this.memes = memes;
        this.filteredMemes = memes;
      }
    );
    this.count=6;
  }

  selectPageSize(p: Number) {
    this.count = p;
  } 

  getMemes() {
    this.memeService.findAll().subscribe(
      memes => {
        this.memes = memes;
        this.filteredMemes = memes;
      }
    );
  } 

 deleteMeme(meme: Meme) {
   this.memes = this.memes.filter(m => m != meme);
   this.filteredMemes = this.memes;
   this.memeService.delete(meme);
 }

 search(term: string, event: KeyboardEvent) {
   if(event.keyCode === 13) {
   console.log(term);
    this.filteredMemes = this.memes.filter(meme => meme.title.toLowerCase().includes(term));
 }
  if(event.keyCode === 8) {
   this.filteredMemes = this.memes;
  }
}



 clear() {
   this.filteredMemes = this.memes;
 }
}
