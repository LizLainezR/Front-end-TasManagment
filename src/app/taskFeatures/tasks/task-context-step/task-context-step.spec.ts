import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContextStep } from './task-context-step';

describe('TaskContextStep', () => {
  let component: TaskContextStep;
  let fixture: ComponentFixture<TaskContextStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskContextStep],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskContextStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
