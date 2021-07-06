import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdbMoviesComponent } from './tmdb-movies.component';

describe('TmdbMoviesComponent', () => {
  let component: TmdbMoviesComponent;
  let fixture: ComponentFixture<TmdbMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmdbMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmdbMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
