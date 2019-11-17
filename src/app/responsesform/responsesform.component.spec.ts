import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesformComponent } from './responsesform.component';

describe('ResponsesformComponent', () => {
  let component: ResponsesformComponent;
  let fixture: ComponentFixture<ResponsesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
