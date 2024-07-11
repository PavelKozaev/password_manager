import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePasswordRecordComponent } from './modal-create-password-record.component';

describe('ModalCreatePasswordRecordComponent', () => {
  let component: ModalCreatePasswordRecordComponent;
  let fixture: ComponentFixture<ModalCreatePasswordRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreatePasswordRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatePasswordRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
