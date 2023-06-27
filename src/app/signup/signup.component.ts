import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule ,FormsModule ,NgControl, NgForm, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true;
  login= new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    confirm: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
  });
constructor(private router: Router,private http: HttpClient,private snackBar: MatSnackBar) { 
}
onSubmit()
{
  const data = this.login.value;
  let user = this.login.value.username!;
  this.http.post('http://127.0.0.1:5000/api/signup', data).subscribe((response: any) => {
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

OnLogin()
{
  this.router.navigate(['/login']);
}

}
