import { Component } from '@angular/core';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryMasterComponent, ProductMasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ui';
}
