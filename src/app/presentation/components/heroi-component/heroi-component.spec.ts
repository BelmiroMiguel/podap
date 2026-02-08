import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroiComponent } from './heroi-component';

describe('HeroiComponent', () => {
  let component: HeroiComponent;
  let fixture: ComponentFixture<HeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
