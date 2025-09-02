import { Component } from '@angular/core';
import { HelloComponent } from './features/hello/hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HelloComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
