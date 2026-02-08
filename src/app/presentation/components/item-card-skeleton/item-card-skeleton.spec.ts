import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardSkeleton } from './item-card-skeleton';

describe('ItemCardSkeleton', () => {
  let component: ItemCardSkeleton;
  let fixture: ComponentFixture<ItemCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
