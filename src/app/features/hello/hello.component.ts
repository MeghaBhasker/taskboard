import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  templateUrl: './hello.html',
  styleUrls: ['./hello.scss'],
})
export class HelloComponent {
  name = signal('Megha');
  private toggle = false;

  rename() {
    this.toggle = !this.toggle;
    this.name.set(this.toggle ? 'World' : 'Megha');
  }
}
