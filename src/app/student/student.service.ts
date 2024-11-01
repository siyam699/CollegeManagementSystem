import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as lowdb from 'lowdb';
import * as lodash from 'lodash';
import { JSONFilePreset } from 'lowdb/node';
// const FileSync = require('lowdb/adapters/FileSync');
// const low = require('lowdb');

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  studentBaseUrl: string = "http://localhost:3000/studentdata"
  teacherBaseUrl: string = "http://localhost:3000/teacherdata"

  constructor(private httpClient:HttpClient) { }

  getAllStudents(): any {
    return this.httpClient.get(this.studentBaseUrl);
  }

  getAllTeachers(): Observable<any> {
    return this.httpClient.get(this.teacherBaseUrl);
  }

  addStudent(data: any): Observable<any> {
    return this.httpClient.post(this.studentBaseUrl, data);
  }

  addTeacher(data: any): Observable<any> {
    return this.httpClient.post(this.teacherBaseUrl, data);
  }

  deleteTeacherData(id: string): Observable<any> {
    return this.httpClient.delete("http://localhost:3000/teacherdata/" + id);
  }

  deleteStudentData(id: string): Observable<any> {
    return this.httpClient.delete("http://localhost:3000/studentdata/" + id);
  }

  updateTeacherData(data: any, id: any): Observable<any> {
    return this.httpClient.put("http://localhost:3000/teacherdata/" + id, data);
  }

  updateStudentData(data: any, id: any): Observable<any> {
    return this.httpClient.put("http://localhost:3000/studentdata/" + id, data);
  }
}
