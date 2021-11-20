import { Component, OnInit  } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductType } from '../ProductType';
import { FormBuilder, Validators } from '@angular/forms';

import { faEllipsisV, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public restApi: ProductsService, private modalService: NgbModal, private formBuilder: FormBuilder ) {
  }

  // FontAwesome icons
  faEllipsisV = faEllipsisV;
  faPen = faPen;
  faTrash = faTrash;

  productForm = this.formBuilder.group({
    id: 0,
    name: ['', [Validators.required]],
    date: '',
    img: '',
    desc: '',
    price: ['', Validators.required],
    categories: ''
  })

  products: ProductType[] = [];
  productAction: "Novo" | "Editar" = "Novo";
  selectedImage: File | null = null;
  selectedImageBase64: any = '';
  deleteId: number;
  editId: number;

  onFileSelected(event: any) {
    if(event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        this.selectedImageBase64 = reader.result;
      }
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.restApi.getProducts();
  }

  confirmDelete(content: any, id: number) {
    this.modalService.open(content);
    this.deleteId = id;
  }

  deleteProduct(){
    this.modalService.dismissAll();
    return this.restApi.deleteProduct(this.deleteId);
  }

  addProduct(product: any) {
    let newProduct: ProductType = {
      id: this.products.length,
      name: product.value.name,
      date: product.value.date,
      img: this.selectedImageBase64,
      desc: product.value.desc,
      price: product.value.price,
      categories: product.value.categories?.replaceAll(" ", "").split(",")
    }
    
    this.modalService.dismissAll();
    return this.restApi.createProduct(newProduct);
  }

  editProduct(id: number) {
    let product: ProductType = {
      id: id,
      name: this.products[id].name,
      date: this.products[id].date,
      img: this.products[id].img,
      desc: this.products[id].desc,
      price: this.products[id].price,
      categories: this.products[id].categories
    }

    this.modalService.dismissAll();
    return this.restApi.updateProduct(id, product);
  }

  newProductModal(content: any, action: string, id: number){
    if (action == "Editar") {
      this.productAction = "Editar";
      this.modalService.open(content);
      this.editId = id;
      this.productForm.setValue(this.products[id]);
    } 
    else {
      this.productAction = "Novo"
      this.modalService.open(content);
      this.productForm.get('name')?.untouched;
      this.productForm.get('price')?.untouched;
      this.productForm.setValue({
        id: 0,
        name: '',
        date: '',
        img: '',
        desc: '',
        price: '',
        categories: ''
      });
    }
  }

  onModalSubmit() {
    if(this.productAction == "Novo") {
      let newProduct: ProductType = {
        id: this.products.length,
        name: this.productForm.value.name,
        date: this.productForm.value.date,
        img: this.selectedImageBase64,
        desc: this.productForm.value.desc,
        price: this.productForm.value.price,
        categories: this.productForm.value.categories.replaceAll(" ", "").split(",")
      }
      
      this.productForm.get('name')?.untouched;
      this.productForm.get('price')?.untouched;
      this.productForm.setValue({
        id: 0,
        name: '',
        date: '',
        img: '',
        desc: '',
        price: '',
        categories: ''
      });

      this.modalService.dismissAll();
      return this.restApi.createProduct(newProduct);
    } 
    else {
      let editedProduct: ProductType = {
        id: this.editId,
        name: this.productForm.value.name,
        date: this.productForm.value.date,
        img: this.products[this.editId].img,
        desc: this.productForm.value.desc,
        price: this.productForm.value.price,
        categories: this.productForm.value.categories.toString().replaceAll(" ", "").split(",")
      }

      this.productForm.get('name')?.untouched;
      this.productForm.get('price')?.untouched;
      this.productForm.setValue({
        id: 0,
        name: '',
        date: '',
        img: '',
        desc: '',
        price: '',
        categories: ''
      });
      
      this.modalService.dismissAll();
      return this.restApi.updateProduct(this.editId, editedProduct);
    }
  }
}
