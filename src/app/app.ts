import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('tabs');
  
  constructor(private router:Router){}
  gotodashborad(){
    this.router.navigate(['/dashboard']);
  }
}
