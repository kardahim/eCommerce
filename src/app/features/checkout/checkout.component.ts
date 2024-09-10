import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interfaces/IUser';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  errorMessage: string | null = null;
  loggedUser: IUser | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser();

    // Supports only polish patterns
    this.checkoutForm = this.fb.group({
      firstname: [
        this.loggedUser ? this.loggedUser.firstname : '',
        Validators.required,
      ],
      lastname: [
        this.loggedUser ? this.loggedUser.lastname : '',
        Validators.required,
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{3}[1-9]{3}[1-9]{3}$/)],
      ],
      email: [this.loggedUser ? this.loggedUser.email : '', Validators.email],
      street: ['', Validators.required],
      houseNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+([A-Za-z]{1})?(\/\d+)?$/),
        ],
      ],
      postalCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)],
      ],
      city: ['', Validators.required],
      paymentMethod: ['visa', Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;
      alert(
        'Here should be redirect to payment service like mTransfer. But this is mockup, confirm to continue'
      );
      this.cartService.clearCart();
      this.router.navigate(['']);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  get firstname() {
    return this.checkoutForm.get('firstname');
  }

  get lastname() {
    return this.checkoutForm.get('lastname');
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }
  get email() {
    return this.checkoutForm.get('email');
  }

  get street() {
    return this.checkoutForm.get('street');
  }

  get houseNumber() {
    return this.checkoutForm.get('houseNumber');
  }

  get postalCode() {
    return this.checkoutForm.get('postalCode');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get paymentMethod() {
    return this.checkoutForm.get('paymentMethod');
  }
}
