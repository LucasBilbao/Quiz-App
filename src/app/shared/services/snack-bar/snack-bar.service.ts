import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(message: string, duration: number): void {
    this.snackbar.open(message, '', { duration });
  }
}
