import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  categories: any[] = [];
  products: any[] = []; 

  productName: string = ''; 
  categoryId: number = 0;
  editId: number | null = null;

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.api.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  loadProducts() {
    this.api.getProducts(this.page, this.pageSize).subscribe((res) => {
      this.products = res.data;
      this.totalPages = res.totalPages;
    });
  }

  saveProduct() {
    if (!this.productName.trim()) {
      alert('Product name is required!');
      return;
    }

    if (this.categoryId === 0) {
      alert('Please select category!');
      return;
    }

    const payload = {
      ProductName: this.productName,
      CategoryId: this.categoryId
    };

    if (this.editId) {
      this.api.updateProduct(this.editId, payload).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      this.api.addProduct(payload).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(p: any) {
    this.editId = p.ProductId;
    this.productName = p.ProductName;
    this.categoryId = p.CategoryId;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  resetForm() {
    this.productName = '';
    this.categoryId = 0;
    this.editId = null;
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
