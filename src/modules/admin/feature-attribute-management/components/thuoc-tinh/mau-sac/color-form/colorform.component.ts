import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-colorform',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './colorform.component.html',
  styleUrl: './colorform.component.scss'
})
export class ColorformComponent {

}
