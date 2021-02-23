/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FullCardComponent } from './full-card.component';

describe('FullCardComponent', () => {
  let component: FullCardComponent;
  let fixture: ComponentFixture<FullCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
