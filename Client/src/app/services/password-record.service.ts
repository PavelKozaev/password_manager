import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordRecord } from '../models/password-record.model';
import APIEndpoints from '../constants/APIEmdpoints';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecordService {
  allPasswordRecords: PasswordRecord[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllPasswordRecords(): Observable<PasswordRecord[]> {
    return this.httpClient.get<PasswordRecord[]>(APIEndpoints.GET_ALL_PASSWORD_RECORDS);
  }

  addPasswordRecord(passwordRecord: PasswordRecord): Observable<PasswordRecord> {
    return this.httpClient.post<PasswordRecord>(APIEndpoints.CREATE_PASSWORD_RECORD, passwordRecord);
  }

  searchPasswordRecords(query: string): Observable<PasswordRecord[]> {
    return this.httpClient.get<PasswordRecord[]>(`${APIEndpoints.SEARCH_PASSWORD_RECORDS}?query=${query}`);
  }
}
