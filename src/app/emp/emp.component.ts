import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css'
})
export class EmpComponent {
  
  addMode: boolean = true;
  employees: any[] = [];
  empForm: any;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private api: ApiService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.showEmployees();
    this.empForm = this.builder.group({
      id: '',
      name: '',
      city: '',
      salary: ''
    })
  }
  showEmployees() {
    this.api.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data;
        console.log(data);
      }
    })
  }

  saveEmployee() {
    console.log('Mentés indul...')
    if (this.addMode) {
      this.addEmployee();
    } else {
      this.updateEmployee(this.empForm.value);
    }
  }
  addEmployee() {
    this.api.addEmployee(this.empForm.value).subscribe({
      next: (data: any) => {
        console.log('Mentés sikeres!');
        this.showEmployees();
        this.empForm.reset();
      }
    })    
  }
  editEmployee(emp: any) {
    this.addMode = false;
    this.empForm.patchValue(emp);
  }
  updateEmployee(emp: any) {
    this.api.updateEmployee(this.empForm.value).subscribe({
      next: (data: any) => {
        console.log('Mentés sikeres!');
        this.showEmployees();
        this.empForm.reset();
      }
    })
  }

  deleteEmployee(id: any) {
    this.api.deleteEmployee(id).subscribe({
      next: (data: any) => {
        console.log('Törölve!');
        this.showEmployees();
      }
    })
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  get pagedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage() {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }
}
