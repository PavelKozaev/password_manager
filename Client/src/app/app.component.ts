import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordRecordService } from './services/password-record.service';
import { PasswordRecord } from './models/password-record.model';
import APIEndpoints from './constants/APIEmdpoints'; 
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePasswordRecordComponent  } from './modal-create-password-record/modal-create-password-record.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Client';
  searchQuery: string = '';

  modalOptions: NgbModalOptions = {
    size: 'lg'
  }

  constructor(
    private httpClient: HttpClient, 
    public PasswordRecordService: PasswordRecordService, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadPasswordRecords();
  }

  loadPasswordRecords(): void {
    this.PasswordRecordService.getAllPasswordRecords()
      .subscribe(response => {
        // Фильтрация записей на основе searchQuery
        this.PasswordRecordService.allPasswordRecords = response
          .filter(record => this.searchQuery.trim() === '' || 
                             record.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                             record.type.toLowerCase().includes(this.searchQuery.toLowerCase()))
          .map(record => ({
            ...record,
            isPasswordVisible: false
          }));
      });
  }

  onClickBtnCreateNewRecord() {
    const modalRef = this.modalService.open(ModalCreatePasswordRecordComponent, this.modalOptions);
    modalRef.closed.subscribe(() => {
      this.loadPasswordRecords();
    });
  }

  togglePasswordVisibility(record: PasswordRecord) {
    record.isPasswordVisible = !record.isPasswordVisible;
  }

  onSearchInputChange(): void {
    // При изменении ввода проверяем, если строка поиска пустая,
    // то загружаем все записи
    if (this.searchQuery.trim() === '') {
      this.loadPasswordRecords();
    } else {
      // Иначе фильтруем записи на основе searchQuery
      this.loadPasswordRecords();
    }
  }
}
