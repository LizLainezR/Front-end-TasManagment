import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateWizard } from './task-create-wizard';

describe('TaskCreateWizard', () => {
  let component: TaskCreateWizard;
  let fixture: ComponentFixture<TaskCreateWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateWizard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
