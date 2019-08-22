import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { MemeGridComponent } from './meme-grid.component';

describe('MemeGridComponent', () => {
  let component: MemeGridComponent;
  let fixture: ComponentFixture<MemeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
