import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHomeComponent } from './sidebar-home.component';

describe('SidebarHomeComponent', () => {
  let component: SidebarHomeComponent;
  let fixture: ComponentFixture<SidebarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
