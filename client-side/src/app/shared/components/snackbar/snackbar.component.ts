import { Component, Input, OnInit, ViewContainerRef, inject } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true
})
export class SnackbarComponent {
  @Input() message: string = '';
  @Input() isError: boolean = false;
}
