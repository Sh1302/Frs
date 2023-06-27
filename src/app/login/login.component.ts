import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule ,FormsModule ,NgControl, NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  login= new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
  });
  data: any;
  constructor(private router: Router,private http: HttpClient,private snackBar: MatSnackBar) { 
  }
  onSubmit()
  {
    const data = this.login.value;
    const username = this.login.value.username;
    const password = this.login.value.password;
    let user = this.login.value.username!;
    this.http.get('http://127.0.0.1:5000/api/login?username=' + username + '&password=' + password).subscribe((response: any)=> {
      if(response.success)
      {
        localStorage.setItem('username',user);
        this.router.navigate(['/file']);
        this.snackBar.open(response.message, 'Dismiss', {duration: 3000,});
      }
      else
      {
        this.snackBar.open(response.error, 'Dismiss', {duration: 3000,});

      }
  });
  }
  OnSigin()
  {
    this.router.navigate(['/sign']);
  }

}
