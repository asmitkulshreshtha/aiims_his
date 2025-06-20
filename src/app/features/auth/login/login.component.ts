import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public router: Router , public authService: AuthService) { }

  isMenuOpen = false;
  isLoginMode = true;
  message = '';

  formData: any = {
    name: '',
    email: '',
    mobile: '',
    designation: '',
    password: ''
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.formData = { name: '', email: '', mobile: '', designation: '', password: '' };
    this.message = '';
  }

  onInput(event: any, field: string) {
    this.formData[field] = event.target.value;
  }

  onSubmit() {
    const { name, email, mobile, designation, password } = this.formData;

    if (this.isLoginMode) {
      this.authService.login({email, password}).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/service']);
        },
        error => {
          console.error('Login failed', error);
          this.message = '❌ Invalid email or password.';
        }
      );
      const user = JSON.parse(localStorage.getItem(email) ?? '{}');
      console.log('🔍 Login Attempt for:', email);
      console.log('📦 Stored Data Found:', user);

      if (user.password === password) {
        this.message = `✅ Welcome back, ${user.name ?? 'User'}!`;

        this.router.navigate(['/service']);
      } else {
        this.message = '❌ Invalid email or password.';
      }
    } else {
      if (!name || !email || !mobile || !designation || !password) {
        this.message = '⚠️ Please fill all fields.';
        return;
      }

      const userData = { name, email, 'mobile_number':mobile, designation, password };
     this.authService.registerPatient(userData).subscribe(
             response => console.log('Patient added successfully', response),
             error => console.error('Error adding patient', error)
           );
      localStorage.setItem(email, JSON.stringify(userData));
      console.log('🆕 New Signup Data:', userData);
      this.message = '✅ Signup Successful! Please login.';
      this.toggleMode();
    }

    this.formData = { name: '', email: '', mobile: '', designation: '', password: '' };
  }
}
