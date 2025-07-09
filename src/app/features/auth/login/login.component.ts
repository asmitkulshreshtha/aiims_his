import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { MaterialModule } from '../../../shared/material/material.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public router: Router, public authService: AuthService) {}

  isMenuOpen = false;
  isLoginMode = true;
  message = '';

  formData: any = {
    name: '',
    email: '',
    mobile: '',
    designation: '',
    password: '',
  };

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.formData = {
      name: '',
      email: '',
      mobile: '',
      designation: '',
      password: '',
    };
    this.message = '';
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onInput(event: any, field: string) {
    this.formData[field] = event.value ?? event.target?.value;
  }

  onSubmit() {
    const { name, email, mobile, designation, password } = this.formData;

    if (this.isLoginMode) {
      this.authService.login({ email, password }).subscribe(
        (response: any) => {
          // Save JWT token
          localStorage.setItem('authToken', response.token);
          console.log('Token saved to localStorage:', response.token);

          // Redirect on success
          this.message = `Welcome back!`;
          this.router.navigate(['/service']);
        },
        (error) => {
          console.error('Login failed', error);
          this.message = 'Invalid email or password.';
        }
      );
    } else {
      if (!name || !email || !mobile || !designation || !password) {
        this.message = 'Please fill all fields.';
        return;
      }

      const userData = {
        name,
        email,
        mobile_number: mobile,
        designation,
        password,
      };
      this.authService.registerPatient(userData).subscribe(
        (response) => {
          console.log('Patient added successfully', response);
          this.message = '✅ Signup Successful! Please login.';
          this.toggleMode();
        },
        (error) => {
          console.error('Error adding patient', error);
          this.message = ' Signup failed. Try again.';
        }
      );
    }

    //  Clear form
    this.formData = {
      name: '',
      email: '',
      mobile: '',
      designation: '',
      password: '',
    };
  }
}
