import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  getEmployees() {
    let url = `${this.host}/employees`;
    return this.http.get(url);
  }
  addEmployee(data: any) {
    let url = `${this.host}/employees`;
    return this.http.post(url, data);
  }
  updateEmployee(data: any) {
    let url = `${this.host}/employees/${data.id}`;
    return this.http.put(url, data);
  }
  deleteEmployee(id: any) {
    let url = `${this.host}/employees/${id}`;
    return this.http.delete(url);
  }
}
