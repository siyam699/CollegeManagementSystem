import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { StudentService } from './student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})

export class StudentComponent implements OnInit {
  students: any | undefined;
  teachers: any | undefined;

  constructor(private studentService: StudentService,
    private serviceRouter: Router,
    private httpClient: HttpClient,
  ) { }

  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: studentModel = new studentModel();
  studentList: studentModel[] = [];

  @ViewChild('myTeacherModal') tchModel: ElementRef | undefined;
  teacherObj: teacherModel = new teacherModel();
  teacherList: teacherModel[] = [];

  router = inject(Router);

  ngOnInit(): void {
    this.getStudentList();
    this.getTeacherList();
    this.studentService.getAllStudents().subscribe((response: any) => {
      console.log(response)
      this.students = response;
    })
    this.studentService.getAllTeachers().subscribe((response: any) => {
      console.log(response)
      this.teachers = response;
    })
    console.log(this.teacherObj, this.teacherObj.id)
    console.log(this.studentObj, this.studentObj.id)
  }

  logout() {
    this.router.navigateByUrl('login');
  }

  openStudentModel() {

    const sdtmodel = document.getElementById('myModal');
    if (sdtmodel != null) {
      sdtmodel.style.display = 'block';
    }

  }

  openTeacherModel() {
    const tchmodel = document.getElementById('myTeacherModal')
    if (tchmodel != null ) {
      tchmodel.style.display = 'block';
    }
  }

  closeMedel() {
    this.studentObj = new studentModel();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  closeTeacherModel() {
    this.teacherObj = new teacherModel();
    if (this.tchModel != null) {
      this.tchModel.nativeElement.style.display = 'none';
    }
  }

  onSaveform() {

    this.studentService.getAllStudents().subscribe((response: any) => {
      console.log(response)
      console.log(this.studentObj, this.studentObj.id)
      if (response != null) {
        let int_id: number = response.length + 1;
        this.studentObj.id = int_id.toString();
        this.studentObj.obj_id = response.length + 1;
        // const newStudent = [];
        // newStudent.push(this.studentObj);
        this.studentService.addStudent(this.studentObj).subscribe(() => {
          this.closeMedel();
          this.getStudentList();
        });
      }
      else {
        this.studentObj.id = "1";
        this.studentObj.obj_id = 1;
        this.studentService.addStudent(this.studentObj).subscribe(() => {
          this.closeMedel();
          this.getStudentList();
        });
      }
    })
  }

  onSaveTeacherForm() {
    this.studentService.getAllTeachers().subscribe((response) => {
      if (response != null) {
        let int_id: number = response.length + 1;
        this.teacherObj.id = int_id.toString();
        this.teacherObj.obj_id = response.length + 1;
        // const newStudent = [];
        // newStudent.push(this.studentObj);
        this.studentService.addTeacher(this.teacherObj).subscribe(() => {
          this.closeTeacherModel();
          this.getTeacherList();
        });
      }
      else {
        // const newStudent = [];
        // newStudent.push(this.studentObj);
        this.teacherObj.id = "1";
        this.teacherObj.obj_id = 1;
        this.studentService.addTeacher(this.studentObj).subscribe(() => {
          this.closeTeacherModel();
          this.getTeacherList();
          // location.reload();
        });
      }
    })
  }

  onUpdateTeacherForm() {
    const currentTeacher = this.teachers.find((obj: any) => obj.obj_id === this.teacherObj.obj_id);
    if (currentTeacher != undefined) {
      currentTeacher.name = this.teacherObj.name;
      currentTeacher.mobile = this.teacherObj.mobile;
      currentTeacher.email = this.teacherObj.email;
      currentTeacher.gender = this.teacherObj.gender;
      currentTeacher.dob = this.teacherObj.dob;
      currentTeacher.address = this.teacherObj.address;
      currentTeacher.status = this.teacherObj.status;
    }
    this.studentService.updateTeacherData(currentTeacher, this.teacherObj.id).subscribe(() => {
      this.closeTeacherModel();
      this.getTeacherList();
    }
    );
  }

  onUpdateform() {
    const currentStudent = this.students.find((s: any) => s.obj_id === this.studentObj.obj_id);
    console.log(this.studentObj.id)
    if (currentStudent != undefined) {
      currentStudent.name = this.studentObj.name;
      currentStudent.mobile = this.studentObj.mobile;
      currentStudent.email = this.studentObj.email;
      currentStudent.gender = this.studentObj.gender;
      currentStudent.doj = this.studentObj.doj;
      currentStudent.address = this.studentObj.address;
      currentStudent.status = this.studentObj.status;
    }

    this.studentService.updateStudentData(currentStudent, this.studentObj.id).subscribe(() => {
      this.closeMedel();
      this.getStudentList();
    }
    );
  }

  onDeleteTeacher(data: teacherModel) {
    const isConfirm = confirm('Are you sure you want to delete this teacher ?...');
    if (isConfirm) {
      const currentTeacher = this.teacherList.findIndex(obj => obj.id === data.id);
      console.log(currentTeacher)
      this.studentService.deleteTeacherData(data.id).subscribe(() => {
        this.getTeacherList();
        // location.reload();
      })
    }
  }

  onDeleteStudent(data: studentModel) {
    const isConfirm = confirm('Are you sure you want to delete this student ?...');
    if (isConfirm) {
      const currentStudent = this.studentList.findIndex(obj => obj.id === data.id);
      console.log(data.id)
      console.log(currentStudent)
      // this.studentList.splice(currentStudent, 1);
      // localStorage.setItem('studentdata', JSON.stringify(this.studentList));
      this.studentService.deleteStudentData(data.id).subscribe(() => {
        this.getStudentList();
        // location.reload();
      })
    }
  }

  onEditTeacher(teacherData: teacherModel) {
    this.teacherObj = teacherData;
    this.openTeacherModel();
  }

  onEditStudetn(studentData: studentModel) {
    this.studentObj = studentData;
    this.openStudentModel();

  }
  getStudentList() {
    // const localData = localStorage.getItem('studentdata');
    // if (localData != null) {
    //   this.studentList = JSON.parse(localData);
    // }

    this.studentService.getAllStudents().subscribe((response: any) => {
      if (response != null)
        this.students = response;
    })
  }

  getTeacherList() {
    // const localData = localStorage.getItem('teacherdata');
    // if (localData != null) {
    //   this.teacherList = JSON.parse(localData);
    // }

    this.studentService.getAllTeachers().subscribe((response) => {
      if (response != null)
        this.teachers = response;
    })

  }

  seeTeachers() {
    const teachers = document.getElementById("teacherRow");
    const students = document.getElementById("studentRow");
    const welcomeText = document.getElementById("welcomeText");
    const logoText = document.getElementById("logoText");
    const marqueeText = document.getElementById("marqueeText");

    if (teachers && students && welcomeText && logoText && marqueeText) {
      if ( teachers.style.display == 'none' ) {
        teachers.style.display = 'flex';
        students.style.display = 'none';
        welcomeText.innerHTML = 'Welcome To Teachers Portal'
        logoText.innerHTML = '[__TEACHERS PORTAL__]'
        marqueeText.innerHTML = '<b><i> Please Insert, Update or Delete Teacher Data</i></b>'
      }
      else if ( students.style.display == 'none' ) {
        teachers.style.display = 'none';
        students.style.display = 'flex';
        welcomeText.innerHTML = 'Welcome To Students Portal'
        logoText.innerHTML = '[__STUDENTS PORTAL__]'
        marqueeText.innerHTML = '<b><i> Please Insert, Update or Delete Student Data</i></b>'
      }
    }
  }

}

export class studentModel {
  obj_id: number;
  id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  doj: string;
  address: string;
  status: boolean;
  constructor() {
    this.obj_id = 0;
    this.id = "";
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.gender = "";
    this.doj = "";
    this.address = "";
    this.status = false;
  }
}

export class teacherModel {
  obj_id: number;
  id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  status: boolean;
  constructor() {
    this.obj_id = 0;
    this.id = "";
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.gender = "";
    this.dob = "";
    this.address = "";
    this.status = false;
  }
}
