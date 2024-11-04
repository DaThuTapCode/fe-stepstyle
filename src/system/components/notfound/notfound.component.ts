import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-notfound',
    standalone: true,
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.scss',
    imports: [CommonModule, RouterModule]
})
export class NotfoundComponent {
  message = '404 NOT FOUND LINK'
  logoUrl = 'LogoStepStyle.png';
}
