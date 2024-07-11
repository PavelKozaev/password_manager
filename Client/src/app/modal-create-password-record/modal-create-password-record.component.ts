import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordRecordCreateDto } from '../models/password-record-create-dto.model';
import { PasswordRecordService } from '../services/password-record.service';
import { PasswordRecord } from '../models/password-record.model';
import HTTP_OPTIONS from '../constants/HttpOptions';
import API_ENDPOINTS from '../constants/APIEmdpoints';

@Component({
  selector: 'app-modal-create-password-record',
  templateUrl: './modal-create-password-record.component.html',
  styleUrls: ['./modal-create-password-record.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ModalCreatePasswordRecordComponent {
  form!: FormGroup;

  createSuccessful: boolean = false;
  createFailed: boolean = false;

  constructor(public formBuilder: FormBuilder, private httpClient: HttpClient, public activeModal: NgbActiveModal, private passwordRecordService: PasswordRecordService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      type: ['site', Validators.required]
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    const recordToCreate: PasswordRecordCreateDto = {
      name: this.form.get('name')!.value,
      password: this.form.get('password')!.value,
      type: this.form.get('type')!.value
    };

    this.httpClient
      .post(API_ENDPOINTS.CREATE_PASSWORD_RECORD, recordToCreate)
      .subscribe({
        next: (createdRecordFromServer: any) => {
          this.createSuccessful = true;
          this.passwordRecordService.allPasswordRecords.push(createdRecordFromServer);
          console.log('Successfully created a record! Response from server:');
          console.log(createdRecordFromServer);
          setTimeout(() => {
            this.activeModal.close('Close after creation');
          }, 800); // Закрыть модальное окно через 2 секунды (можно изменить время)
        },
        error: (error: HttpErrorResponse) => {
          this.createFailed = true;
          console.error(`Failed to create record! Response from server: HTTP statuscode: ${error.status}: ${error.error}`);
        }
      });
  }

  // Проверка формата email
  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Проверка на уникальность имени
  async isUniqueName(name: string): Promise<boolean> {
    try {
      const existingRecords = await this.passwordRecordService.getAllPasswordRecords().toPromise();
      
      if (!existingRecords) {
        console.error('Existing records not found or empty');
        return true; // Возвращает true, чтобы позволить создание записи в случае отсутствия данных
      }
      
      return !existingRecords.some(record => record.name === name);
    } catch (error) {
      console.error('Error checking uniqueness:', error);
      return false;
    }
  }
}
