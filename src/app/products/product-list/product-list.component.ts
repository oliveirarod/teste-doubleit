import { Component, OnInit, Renderer2  } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { isThisTypeNode } from 'typescript';
import { ProductType } from '../ProductType';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private renderer: Renderer2, public restApi: ProductsService, private modalService: NgbModal ) {
    this.renderer.removeClass(document.body, 'main-gradient');
    this.renderer.addClass(document.body, 'bg-gray');
  }

  products: ProductType[] = [];
  productAction: "Novo" | "Editar" = "Novo";
  selectedImage: File | null = null;
  selectedImageBase64: any = '';

  onFileSelected(event: any) {
    if(event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        console.log(reader.result);
        this.selectedImageBase64 = reader.result;
      }

      reader.onerror = (error) => {
        console.log('Error: ', error);
      }
    }
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.products = this.restApi.getProducts();
  }

  newProductModal(content: any) {
    this.productAction = "Novo";
    this.modalService.open(content);
  }

  confirmDelete(id: number){
    this.modalService.open(this.products[id]);
  }

  deleteProduct(id: number){
    this.modalService.dismissAll();
    return this.restApi.deleteProduct(id);
  }

  saveProduct(){
    // let id: number = this.products.length;
    // let content: ProductType = this.products[id];

    // if(content.action == "Novo"){
    //   this.addProduct();
    // }
    // else{
    //   this.editProduct(id);
    // }
  }

  addProduct(product: NgForm){

    let newProduct: ProductType = {
      id: this.products.length,
      name: product.value.name,
      date: product.value.date,
      img: this.selectedImageBase64,
      desc: product.value.desc,
      price: product.value.price,
      categories: product.value.categories.replaceAll(" ", "").split(",")
    }
    
    console.log(newProduct);
    
    this.modalService.dismissAll();
    return this.restApi.createProduct(newProduct);
  }

  editProduct(id: number){
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

  // handleInputChange(event: any) {
  //   var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }

  // _handleReaderLoaded(event) {
  //   let reader = event.target;
  //   this.productImg = reader.result;
  //   console.log(this.productImg)
  // }
}
