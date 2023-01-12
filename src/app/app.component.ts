import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loki';
}

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule],
})
export class AppModule {}

