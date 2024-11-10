import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent {

  constructor(
    private router: Router
  ){}

navigate() {
  this.router.navigate(['/okconde/detail-product']);
}

hhe() {
  this.router.navigate(['/okconde/payment']);
}

}
