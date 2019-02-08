import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../../shared/services/demo.service';
import { GlobalMembersService } from '../../shared/services/global-members.service';
import { productsdetails, attrdetails } from '../model/product';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

class ddvalues {
  key: number;
  value: string;
}

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  constructor(private http: Http, 
    private router: Router, 
    private globalMembers: GlobalMembersService, 
    private demoservice: DemoService,
    private formbuilder: FormBuilder) { }
    
  productsCols: any[];
  productsCount:number;
  productsCountTxt:string;
  prdctsDetails: productsdetails[] = [];
  prdctsDetailsDisplay = new productsdetails();

  attrCols: any[];
  attrDetails: attrdetails[] = [];
  attrVal: string = "";

  //For Dropdowns
  ddvProduct: ddvalues[];
  selddvProduct: ddvalues;
  ddvCategory: ddvalues[];
  selddvCategory: ddvalues;
  selddvFormCategory: ddvalues = new ddvalues();
  ddvAttribute: ddvalues[];
  selddvAttribute: ddvalues;

  productForm: FormGroup;
  submitted: boolean = false;
  show: boolean = true;
  productOpeFlag: string = "Add";
  isSubmitDisabled : boolean = false;

  temp: string[] = [];

  ngOnInit() {
    try{
      if(this.globalMembers.authUser()){
        this.router.navigate(['']);
      }
      this.productsCols = [
        { field: 'ProductId', header: 'Product Id' },
        { field: 'ProductCategoryName', header: 'Category' },
        { field: 'Name', header: 'Name' },
        { field: 'Description', header: 'Description' },
      ];
      this.attrCols = [
        { field: 'AttributeId', header: 'Attribute Id' },
        { field: 'ProductCategoryId', header: 'Category Id' },
        { field: 'ProductCategoryName', header: 'Category' },
        { field: 'AttributeName', header: 'Attribute Name' },
        { field: 'AttributeValue', header: 'Attribute Value' },
      ];
      this.loadProductsData();
      this.fillDD();
      this.createProductForm();
    } catch (exception) {
      this.showMsg("ngOnInit: Exception: " + exception.message);
    }
  }

  onSubmit(){
    try{
      this.submitted = true;
      var url = "";
      var data = new productsdetails();
      if(this.productOpeFlag == "Edit"){
        url = this.globalMembers.configValues["baseUrl"] + "data/PostProductUpdate";
        data.ProductId = this.selddvProduct.key;
      }
      else {
        url = this.globalMembers.configValues["baseUrl"] + "data/PostProductCreate";
        data.ProductId = 0;
      }
      data.ProductCategoryId = this.selddvFormCategory.key;
      data.ProductCategoryName = this.selddvFormCategory.value;
      data.Name = this.productForm.value.productName;
      data.Description = this.productForm.value.productDesc;
      data.lstProductAttributes = this.attrDetails;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var observal = this.http.post(url, data, options);
      observal.subscribe(success => {
        this.productOpeFlag = "";
        this.show = true;
        this.fillDD();
        this.loadProductsData();
        alert("success");
      }, error => {
        alert("failed: " + error.text());
      });
    } catch (exception) {
      this.showMsg("onSubmit: Exception: " + exception.message);
    }
  }

  createProductForm(){
    try{
      this.productForm = this.formbuilder.group({
        productName: ['', [Validators.required]],
        productDesc: [''],
        productCategory: ['', [Validators.required]],
        productAttributes: ['', [Validators.required]]
      });
    } catch (exception) {
      this.showMsg("createProductForm: Exception: " + exception.message);
    }
  }

  fillDD(){
    try {
        this.globalMembers.configValues.length = 0;
        this.http.get('./assets/config/config.json').subscribe(values => {
          this.globalMembers.configValues = values.json() as string[];
          this.http.get(this.globalMembers.configValues["baseUrl"] + "/data/GetProductsDtlsForDD")
          .map((data : Response) =>{
            return data.json() as ddvalues[];
          }).toPromise().then(x => {
            this.ddvProduct = x;
          })
        });
        this.http.get('./assets/config/config.json').subscribe(values => {
          this.globalMembers.configValues = values.json() as string[];
          this.http.get(this.globalMembers.configValues["baseUrl"] + "/data/GetCategoryDtlsForDD")
          .map((data : Response) =>{
            return data.json() as ddvalues[];
          }).toPromise().then(x => {
            this.ddvCategory = x;
            var data = new ddvalues();
            data.key = 0; data.value = "All Categories";
            this.ddvCategory.push(data);
          })
        });
    } catch (exception) {
      this.showMsg("fillproductdd: Exception: " + exception.message);
    }
  }

  manageProduct(opeType: string){
    try{
      this.isSubmitDisabled = false;
      if(opeType == "add"){
        this.productOpeFlag = "Add";
        this.show = false;
        this.productForm.get('productName').setValue("");
        this.productForm.get('productDesc').setValue("");
        this.attrDetails.length = 0;
      }
      else if(opeType == "cancel"){
        this.productOpeFlag = "";
        this.show = true;
        this.loadProductsData();
      }
      else{
        if(this.selddvProduct.key != undefined){
          if(opeType == "edit"){
            this.productOpeFlag = "Edit";
            this.show = false;
          }
          else {
            this.productOpeFlag = "View";
            this.show = false;
            this.isSubmitDisabled = true;
          }
          this.GetProductDetailsById();
        }
        else{
          alert("Please select Product from dropdown");
        }
      }
    }
    catch(exception){
      alert("Please select Product from dropdown");
    }
  }

  GetProductDetailsById(){
    try {
      if(this.globalMembers.configValues["baseUrl"] != undefined)
        {
        this.http.get(this.globalMembers.configValues["baseUrl"] + "data/GetProductDetailsById/" + this.selddvProduct.key.toString())
        .map((data : Response) =>{
          return data.json() as productsdetails;
        }).toPromise().then(x => {
          this.prdctsDetailsDisplay = x;
          this.productForm.get('productName').setValue(this.prdctsDetailsDisplay.Name);
          this.productForm.get('productDesc').setValue(this.prdctsDetailsDisplay.Description);
          var catvalues = new ddvalues();
          catvalues.key = this.prdctsDetailsDisplay.ProductCategoryId;
          catvalues.value = this.prdctsDetailsDisplay.ProductCategoryName;
          this.selddvFormCategory = catvalues;
          this.attrDetails.length = 0;
          this.attrDetails = this.prdctsDetailsDisplay.lstProductAttributes;
          this.selAttrByCat();
        })
      }
    } catch (exception) {
      this.showMsg("GetProductDetailsById: Exception: " + exception.message);
    }
  }

  addAttributeToList(){
    try{
      var data = new attrdetails();
      data.AttributeId = this.selddvAttribute.key;
      data.AttributeName = this.selddvAttribute.value;
      data.AttributeValue = this.attrVal;
      data.ProductCategoryId = this.selddvFormCategory.key;
      data.ProductCategoryName = this.selddvFormCategory.value;
      this.attrDetails.push(data);
      //this.attrDetails = { ...this.attrDetails };
    } catch (exception) {
      this.showMsg("addAttributeToList: Exception: " + exception.message);
    }
  }

  selproductByCat(){
    try {
      if(this.globalMembers.configValues["baseUrl"] != undefined)
        {
        this.http.get(this.globalMembers.configValues["baseUrl"] + "data/GetProductsByCatId/" + this.selddvCategory.key.toString())
        .map((data : Response) =>{
          return data.json() as productsdetails[];
        }).toPromise().then(x => {
          this.prdctsDetails.length = 0;
          this.prdctsDetails = x;
          this.productsCount = this.prdctsDetails.length;
          this.productsCountTxt = "Showing total " + this.prdctsDetails.length.toString() + " entries";
        })
      }
    } catch (exception) {
      this.showMsg("selproductByCat: Exception: " + exception.message);
    }
  }

  selAttrByCat(){
    try {
      if(this.globalMembers.configValues["baseUrl"] != undefined)
        {
        this.http.get(this.globalMembers.configValues["baseUrl"] + "data/GetAttributesByCatID/" + this.selddvFormCategory.key.toString())
        .map((data : Response) =>{
          return data.json() as ddvalues[];
        }).toPromise().then(x => {
          this.ddvAttribute = x;
        })
      }
    } catch (exception) {
      this.showMsg("selAttrByCat: Exception: " + exception.message);
    }
  }
  
  loadProductsData(){
    try {
      if(this.globalMembers.configValues["baseUrl"] != undefined)
        {
        this.http.get(this.globalMembers.configValues["baseUrl"] + "data/GetProducts")
        .map((data : Response) =>{
          return data.json() as productsdetails[];
        }).toPromise().then(x => {
          this.prdctsDetails.length = 0;
          this.prdctsDetails = x;
          this.productsCount = this.prdctsDetails.length;
          this.productsCountTxt = "Showing total " + this.prdctsDetails.length.toString() + " entries";
        })
      }
    } catch (exception) {
      this.showMsg("loadProductsData: Exception: " + exception.message);
    }
  }

  onError(msg: string){
    this.submitted = false;
    alert(msg);
  }

  showMsg(msg:string) {
    alert(msg);
  }
}