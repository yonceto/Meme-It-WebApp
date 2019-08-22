import { Component, OnInit } from '@angular/core';

import { Domain } from '../domain';
import { DomainService } from '../domain.service';
import { Meme } from '../meme';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-explore-screen',
  templateUrl: './explore-screen.component.html',
  styleUrls: ['./explore-screen.component.css']
})
export class ExploreScreenComponent implements OnInit {
  domains: Domain[];
  currentDomain: Domain;
  memes: Meme[];
  filteredMemes: Meme[];
  p: Number;
  count: Number;
  closestSearchTerm: string;

  constructor(
    private domainService: DomainService,
    private memeService: MemeService) { }

  ngOnInit() {
    this.getDomains();
    this.count = 6;
  }

  selectPageSize(p: Number): void {
    this.count = p;
  }

  pickDomain(domain: Domain): void {
    this.currentDomain = domain;
    this.memeService.memesUrl = domain.address + "/meme";
    this.getMemes();
  }

  getMemes(): void {
    this.memeService.findAll()
      .subscribe(memes => {
        this.memes = memes;
        this.filteredMemes = memes;
      },
      err => {
        console.log(err);
        this.memes = this.filteredMemes = null;
      });
  }

  getDomains(): void {
    this.domainService.getDomains()
      .subscribe(domains => this.domains = domains);
  }

  search(term: string, event: KeyboardEvent) {
    if (arguments.length == 1 || event.keyCode === 13) {
      console.log(term);
      this.filteredMemes = this.memes.filter(meme => meme.title.toLowerCase().includes(term));
      if (this.filteredMemes.length === 0) {
        this.memeService.findClosestSearchTerm(term)
          .subscribe(t => {
            this.closestSearchTerm = t;
            console.log(this.closestSearchTerm);
          });
      }
      if(term === this.closestSearchTerm) {
        this.closestSearchTerm = null;
      }
    }
    else if (event.keyCode === 8) {
      this.filteredMemes = this.memes;
      this.closestSearchTerm = null;
    }
  }
}
