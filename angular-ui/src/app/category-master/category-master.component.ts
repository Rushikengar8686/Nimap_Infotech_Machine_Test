import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-category-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent implements OnInit {
  categories: any[] = [];
  categoryName: string = '';
  editId: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  saveCategory() {
    if (!this.categoryName.trim()) {
      alert('Category name is required!');
      return;
    }

    if (this.editId) {
      this.api.updateCategory(this.editId, { CategoryName: this.categoryName }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.api.addCategory({ CategoryName: this.categoryName }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  editCategory(cat: any) {
    this.editId = cat.CategoryId;
    this.categoryName = cat.CategoryName;
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.api.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm() {
    this.categoryName = '';
    this.editId = null;
  }
}
