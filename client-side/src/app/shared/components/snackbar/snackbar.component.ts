import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  template: `
  <div class="snackbar">
    <div class="message" [class.error]="isError">{{ message }}</div>
  </div>
  `,
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  @Input() message: string = '';
  @Input() isError: boolean = false;
}
