import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }
  uploadFile(file: File ,username: string) {
    const formData = new FormData();
    formData.append('username',username);
    formData.append('file', file);
    return this.http.post<any>('http://127.0.0.1:5000/api/upload', formData);
  }
}
