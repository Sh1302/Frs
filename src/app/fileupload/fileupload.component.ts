import { Component,NgZone,} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FileuploadService } from '../fileupload.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Time {
  value: string;
}
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File |any ;
  message:  any;
  username : any;
  predict: any;
  error = '';
  date = new FormGroup({
    selectedValue: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required])
  });
  number : any;
  selectedValue: any;
  constructor(private fileUploadService: FileuploadService,private http: HttpClient,private zone: NgZone,private fb: FormBuilder) {
   }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.username = localStorage.getItem('username')
    this.fileUploadService.uploadFile(this.selectedFile,this.username).subscribe(
      response => {
        this.message = response.message;
        console.log(response.message)
      },
      error => {
        console.log(error);
        this.message = 'Upload failed';
      }
    );
  }
  Showpredict()
  {
    this.selectedValue = this.date.get('selectedValue')?.value
    this.number = this.date.get('number')?.value
    this.username = localStorage.getItem('username') 
    this.http.get('http://127.0.0.1:5000/api/predict?username=' + this.username +'&selectedValue='+this.selectedValue+'&number='+this.number).subscribe((response: any)=> {  
      this.zone.run(()=> {
        console.log(response)
          this.predict = `data:image/png;base64,${response.image}`
      });
      console.log(this.selectedValue);
      console.log(this.number);
  },
  (error) => {
    this.zone.run(() => {
      this.error = error.message || 'An error occurred';
    });
  });
  }
}
