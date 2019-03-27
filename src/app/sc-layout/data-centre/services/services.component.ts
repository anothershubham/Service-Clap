import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../../shared/server.service";
import { ScLayoutComponent } from "../../sc-layout.component";
import { TreeModel, TreeNode, TreeComponent } from 'angular-tree-component';
import { ConnectionService } from 'ng-connection-service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DataCentreComponent } from "../data-centre.component";
let addFormData=new FormData();
let updateFormData=new FormData();
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  editimage: string;
  newimage: string;
  checkcode: any;
  blankdescrption:number=0;
  activecode: any=[];
  editservice_commission: any;
  text: string;
  file_array:any=[];
  descriptionvalue:string='';
  editpriceno: any;
  editlabel: any;
  loading='0';
  dataLoaded:number = 0;
  filterText1: string;
  status = 'ONLINE';
  isConnected = true;
  updatefile: File;
  updatecroppedImage: any='';
  updateimageChangedEvent: any='';
  newCroppedImage: any;
  parent_code: number;
  delcode: any;
  service_code: any;
  service_status: any;
  code: any;
  searcharray=[];
  nodes=[];
  previousValue: any;
  updatedValue: any;
  changes:number=0;
  anotherChange:number=0;
  crop:any=[0];
  editcrop:number=0;
  editcropimage:number=0;
  cropimage:any=[];
  add_service;update_ser;
  cropperReady = false;
  imageChangedEvent: any = [];
  croppedImage: any = [];
  showAlert: number = 0;
  file: File;
  filename: any;
  parent_service_code: number=0;
  EditservicePic: any;
  editData: any={};
  newnode=[];
  data_object={};
  htmlContent: string;
  descriptionarray=[];
  blankList: [{ code: string; title: string; cost: string; }];
  insertid: any;
  price: any;
  addnew:number=0;
  commission:any;
  name: any;
  servicePic: any;
  photoName: any;
  fileExtension: any;
  blank=0;
  service_name:number=0;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  @ViewChild("tree") public treeComponent: TreeComponent;
  @ViewChild('edittree') public edittree:TreeComponent;
  fileExtensionError: boolean = false;
  tree = [
    { 
      text: "grandfather",
      nodes: [
          { 
          text: "Child 1",
          type: "Child",
          nodes: [
            { 
            text: "baccha", 
            type: "shetan" 
            },
            { 
            text: "khiladi",
            type: "master" 
            }
          ] 
        }, 
        { 
          text: "Child 2",
          type: "Child" 
        }
      ] 
  }, 
  { 
    text: "dadaji",
    type: "Parent" 
  }, 
  { 
    text: "bade papa",
    type: "Parent" 
  }
  ];
  Services: any[] = [
    {
      "code":1,
      "label": "Parent Service"
    },
    {
      "code":2,
      "label": "Parent Service"
    },
    {
      "code":3,
      "label": "Parent Service"
    },
    {
      "code":4,
      "label": "Parent Service"
    },
    {
      "code":5,
      "label": "Parent Service"
    }
  ];

  Services1: any[] = [
    {
      "id":'0',
      "name":"fvdf",
      "imageUrl": "../../../../assets/icons/picture (1).svg",
      "price":"",
      "commission":"",
      "description":[{i:0,description:""}]
    }
  ]
  demo:any[] = [
    {
      code:"lvl1",
      title: 'Ac reapir',
      cost: '200',
      children: [
        {
          code:"lvl2",
          title: 'machine repair',
          cost: '200',
          children: [
          { 
            code:"lvl3",
            title: 'Replacement',
            cost: '200',
          }
          ]
        },
        {
          code:"lvl2",
          title: 'blade repair',
          cost: '200',
        }
      ]
    },
    {
      code:"lvl1",
      title: 'Washing machine',
      cost: '200',
      children: [
        {
          code:"lvl2",
          title: 'Cleaning',
          cost: '200',
        }
      ]
    },
    {
      code:"lvl1",
      title: 'node 3',
      cost: '200',
      children: [
        {
          code:"lvl2",
          title: 'node 2.1',
          cost: '200',
        }
      ]
    },
    {
      code:"lvl1",
      title: 'node 4',
      cost: '200',
      children: [
        {
          code:"lvl2",
          title: 'welcome',
          cost: '200',
        }
      ]
    }
  ]
  // arraylist:any[] = this.demo;
  append:number=0;
  constructor(public apiCall:ServerService,public parentComponent:ScLayoutComponent,private connectionService: ConnectionService,public pComponent:DataCentreComponent) {
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.isConnected = true;
        this.pComponent.showLoader=2;
      }
      
      else
      this.isConnected = false;
    }
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if(this.isConnected == true)
      localStorage.setItem('isConnected','true');
      else
      localStorage.setItem('isConnected','false');

      
      if (this.isConnected) {
        this.parentComponent.showAlert=0;
        this.status = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.status = "OFFLINE";
      }
    })
   }
 
  parent=[];
  data=[
    {
      "code":1,
      "service_label":'Ac Repairing',
      "price":"500",
      "children":[
        {
        "code":11,
        "service_label":'Split AC Repairing',
        "price":"500",
        "icon":"https://www.gstatic.com/webp/gallery3/1.png",
        "children":[
              {
                "code":21,
                "service_label":'Cleaning Split AC',
                "price":"500",
                "icon":"https://www.gstatic.com/webp/gallery3/1.png",
                "children":1
              }
            ]
        },
        {
        "code":12,
        "service_label":'Refrigerator Repairing',
        "price":"550",
        "icon":"https://www.gstatic.com/webp/gallery3/2_webp_ll.png",
        "children":1
        },
        {
        "code":13,
        "service_label":'Electrician',
        "price":"750",
        "icon":"https://www.gstatic.com/webp/gallery3/3.png",
        "children":0
        }
      ]
    },
    {
      "code":2,
      "service_label":'Beauty Parlour',
      "price":"1000",
      "icon":"https://www.gstatic.com/webp/gallery3/3.png",
      "children":0
    },
    {
      "code":3,
      "service_label":'Gents parlour',
      "price":"1000",
      "icon":"https://www.gstatic.com/webp/gallery3/3.png",
      "children":[
        {
          "code":31,
          "service_label":'Shaving and massage',
          "price":"500",
          "icon":"https://www.gstatic.com/webp/gallery3/1.png",
          "children":1
        }
      ]
    }
  ]

  cancelImage(i){
    var a = document.getElementById('pic'+i) as HTMLInputElement;
    a.src = 'assets/images/no_image.png';
    this.cropimage[i]=3;
    this.updatefile = this.dataURLtoFile(this.apiCall.no_image_url,"no_image_url.png");
    this.file_array[i]=this.updatefile;
  }
  editremoveDiv(i){
    for (var p = 0; p < this.descriptionarray.length; p++) {
      var obj = this.descriptionarray[p];
      if (obj.i == i) {


        this.descriptionarray.splice(p, 1);

        this.changes=1;
        // this.i = this.descriptionarray.length;
      }
    }
    console.log(this.descriptionarray);
  }
  removeDiv(i,id){
    this.descriptionarray = this.Services1[id].description;
    for (var p = 0; p < this.descriptionarray.length; p++) {
      var obj = this.descriptionarray[p];
      if (obj.i == i) {

        this.descriptionarray.splice(p, 1);

        this.i = this.descriptionarray.length;
      }
    }
    if(this.descriptionarray.length ==1){
      this.addnew=0;
    }
  }

  ngOnInit() {
    this.editService=0;
    this.pComponent.showLoader=2;
    this.croppedImage = 'assets/images/no_image.png'
    // this.data_object = {i:0,description:''};
    // this.Services1[0].description.push(this.data_object);

    // this.descriptionarray.push(this.data_object);
    this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    // this.apiCall.fetch_all_services_with_child().subscribe(res=>this.fetch_all_service(res))
  }
  toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }
  descriptionData(value,j,id){
    this.descriptionvalue = this.toTitleCase(value);
    var x= document.getElementById('description'+id+j) as HTMLInputElement;
    x.value = this.descriptionvalue;
    this.descriptionarray = this.Services1[id].description;

    for(var k=0;k<this.descriptionarray.length;k++){
      if(j == this.descriptionarray[k].i){

        this.descriptionarray[k].description= this.descriptionvalue;
        if(value !=''){
          this.blankdescrption = 0;
          this.descriptionarray[k].description= this.descriptionvalue;
        }else{
          this.blankdescrption = 1;
          var b = document.getElementById('desc'+j) as HTMLInputElement;
          b.style.display = 'block';
        }
      }else{
       
      }
    }

  }
  
  focusoutContent(event,i,id){




    for(var k =0 ;k<this.Services1[id].description.length ;k++){
       if( i ==  this.Services1[id].description[k].i){
         i = k;
       }
    }

      this.Services1[id].description[i].description = this.descriptionvalue

    if(this.Services1[id].description.length > 1){
      for(var l=0;l<this.Services1[id].description.length;l++){
        if(this.Services1[id].description[l].description == ''){
          var b = document.getElementById('desc'+id+i) as HTMLInputElement;
          b.style.display = 'block';
          this.blankdescrption = 1;
        }else{
          var b = document.getElementById('desc'+id+i) as HTMLInputElement;
          b.style.display = 'none';
          this.blankdescrption = 0;
        }
      }
    }
    
    
    
    // if(id == 0){
    //   if(i == 0){
    //     this.Services1[id].description.push({i:i,description:this.descriptionvalue})
    //   }
    // }else{
    //   this.descriptionarray = this.Services1[id].description;
    //   if(this.data_object == undefined){
    //     var a = document.getElementById('description'+i) as HTMLInputElement;
    //     this.data_object = {i:i,description:this.descriptionvalue};
    //     this.descriptionarray.push(this.data_object);
    //   }else{
    
    //     for(var k=0;k<this.descriptionarray.length;k++){
    //       if(i == this.descriptionarray[k].i){
    
    //         if(event !=''){
    //           this.blankdescrption = 0;
    //           this.descriptionarray[k].description= this.descriptionvalue;
    //         }else{
    //           this.blankdescrption = 1;
    //           var b = document.getElementById('desc'+i) as HTMLInputElement;
    //           b.style.display = 'block';
    //         }
    //       }else{
           
    //       }
    //     }
    //   }
    // }
    
  }
  fetch_all_service(res){
    if(res.success == true){
      this.newnode = res.data;
      this.treeComponent.treeModel.expandAll()
    }
  }
  fetch_all_service_exceptone(res){
    if(res.success == true){
      this.newnode = res.data;
      this.edittree.treeModel.expandAll()
    }
  }
  options = {
    useCheckbox: false
  };
  i=0;
  addRow(id){

    this.descriptionarray = this.Services1[id].description;
    for(var a=0;a<this.descriptionarray.length;a++){
      
      if(this.descriptionarray[a].description == ''){

        // this.descriptionvalue = ''; 
      }
    }

    if(this.descriptionvalue == ''){

    }
    else{
      this.addnew=1;
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var a=this.descriptionarray.length-1; a>=0; a--) {
          tmp = this.descriptionarray[a].i;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
      }

      this.i = highest+1;

      this.data_object={i:this.i,description:''};
      this.Services1[id].description.push(this.data_object);
      this.descriptionvalue='';

    }
  }
  addeditRow(){
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var a=this.descriptionarray.length-1; a>=0; a--) {
        tmp = this.descriptionarray[a].i;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }

    if(highest == -Infinity){
      highest =-1;
    }
    var obj = {i:highest+1,description:''}

    if(this.descriptionarray.length == 0){
      this.descriptionarray.push(obj);
    }else{
      for(var i=0;i<this.descriptionarray.length;i++){
        if(this.descriptionarray[i].description == ''){
          this.editdescription = 1;
          break;
        }else{
          this.editdescription = 0;
        }
      }
      if(this.editdescription == 1){

      }else{
        this.descriptionarray.push(obj);
        this.changes=1;
      }

    }
    
    if(this.descriptionarray.length>1){
      this.addnew=1;
    }
  }
  editdescription:number=0;
  filter(array, text) {
    return array.filter(function iter(o) {

        var temp;
        if (JSON.stringify(o.service_label) === JSON.stringify(text)) {

            return true;
        }
        if (!Array.isArray(o.child_service)) {

            return false;
        }
        temp = o.child_service.filter(iter);
        if (temp.length) {

          o.child_service = temp;
          return true;
        }
    });
  }
  xx:string='';
  fetch_added_service(res){
    this.searcharray = res.data;
  }
  selectedItem;
  setIndex(newValue) {
    
    this.selectedItem = newValue;
    
   }
  fetch_service(res){
    this.dataLoaded=1;
    this.pComponent.showLoader=0;
    if(res.success == true){
      this.nodata=0;
      this.parent=[];
      this.searcharray = res.data;
      this.parent.push({services:res.data,level:0,search:this.xx});


      this.nodes=[];

    }else{
      this.parentComponent.callService();
      this.nodata =1;
      this.parent.push({services:[],level:0,search:this.xx});
      this.RefreshServices();
    }
  }
  filterText:string='';
  nodata:number=0;
  selectParent(event){
    // var a= document.getElementById('filter') as HTMLInputElement;
    // a.value = event.name;
    
  }
  RefreshServices(){
    this.parent.splice(1);
    this.blank = 0;
  }
  
  onEvent(event){
    
    
    this.filterText = event.node.data.name;
    this.parent_service_code = event.node.data.id;

  }
  

  offEvent(event){

    if(event == ''){
      this.treeComponent.treeModel.expandAll();
      this.treeComponent.treeModel.getNodeById(this.parent_service_code).setIsActive(false);
      this.parent_service_code = 0;
    }
  }
  editoffEvent(event){
    if(event == ''){
      this.changes=1;
      this.parent_code =0;
    }
  }
  onEvent1(event){
    this.changes=1;

    this.filterText = event.node.data.name;
    this.parent_code = event.node.data.id;

  }
  closedropdown($event){
    console.log(this.parent_service_code);
    if(this.parent_service_code  !=0){
      
    }else{
      $event.stopPropagation();
    }
    
  }
  
  moveToChildren(list,level,code){

    var obj  = {level:level,code:code};
    if(level == 0){

      if(this.activecode.length == 0){

        this.activecode.push(obj);

      }else{
        this.activecode[0].code = code;
      }

    }
    // if(level == 1){
    
    //   if(this.activecode.length == 1){
    
    //     this.activecode.push(obj);
    
    //   }else{
    //     this.activecode[1].code = code;
    //   }
    
    // }
    this.parent.splice(level+1);
    if (list.length > 0) {
    this.blank = 0;
    this.parent.push({services:list,level:level+1});
    }
    else{
      this.blank = 1;
    }
  }
  searchFilter(event,i){


    if(i == 0){
      
    }
    else if(i >= 1){

      var a = document.getElementById('search1'+(i-1)) as HTMLInputElement;
      a.innerText='';
      // this.filterText1='';
    }
  }
  viewlist:any={};
  
  nodescription:number=0;
  ViewModal(list,i){
    this.nodescription=0;
    this.viewlist = list;
    console.log(this.viewlist);
    for(var k=0;k<this.viewlist.description.length;k++){
      if(this.viewlist.description[k].description == ''){
        this.nodescription = 1;
      }
    }
  }
  EditServiceModal(list,i){
    this.apiCall.fetch_all_services_with_child_except_one(list.code).subscribe(res=>this.fetch_all_service_exceptone(res))
    this.editcropimage=3;
    this.editcrop=0;
    this.editService=1;
    if(list.parent_service_code == 0){
      console.log("sdvsd");
      this.parent_code = 0;
      this.filterText = '';
      var a =document.getElementById('filter123') as HTMLInputElement;
      a.value='';
      this.edittree.treeModel.filterNodes('');
    }else{
      console.log(list);
      
      this.parent_code = list.parent_service_code;
      this.filterText = list.parent_name;
      var a =document.getElementById('filter123') as HTMLInputElement;
      a.value=list.parent_name;
      // const treeModel: TreeModel = this.treeComponent.treeModel;
      // const nodes = treeModel.nodes;
      // treeModel.getNodeById(this.parent_code).setIsSelected(true);
      // this.treeComponent.treeModel.getNodeById(this.parent_code).setIsActive(true);
      
    }
    
    this.changes=0;
    this.anotherChange=0;
    this.code = list.code;
    this.editData = list;
    this.descriptionarray = list.description;
    if(this.descriptionarray.length >1){
      this.addnew=1;
    }
    this.editlabel = list.service_label;
    this.editpriceno = list.price;
    this.editservice_commission = list.service_commission

    this.updatecroppedImage = list.icon;
  }
  stop(event){
    event.preventDefault();
  }
  
  insertName(event,idname,i){
    if(i==0){
      this.insertid =0;
    }
    if(idname == 'serviceName'){
      var a = document.getElementById(idname+i) as HTMLInputElement;
      a.value = event;
      if(event == ''){
        this.Services1[i].service_label = '';
      }else{
        this.name = this.toTitleCase(event);
        this.Services1[i].id = this.insertid ;
        this.Services1[i].service_label = this.name;
      }
    }
    if(idname == 'price'){
      var b = document.getElementById(idname+i) as HTMLInputElement;
      b.value = event;
      if(event == ''){
        this.Services1[i].price = '';
      }else{
        this.price = event;
        this.Services1[i].id = this.insertid;
        this.Services1[i].price = this.price;
      }
    }
    if(idname == 'commission'){
      var b = document.getElementById(idname+i) as HTMLInputElement;
      b.value = event;
      if(event == ''){
        this.Services1[i].service_commission = '';
      }else{
        this.commission = event;
        this.Services1[i].id = this.insertid;
        this.Services1[i].service_commission = this.commission;
      }
    }

  }
  
  
  editfocusoutContent(event,i){
    for(var l = 0;l<this.descriptionarray.length;l++){
      if( i == this.descriptionarray[l].i){
        this.descriptionarray[l].description = event;
      }
    }  

  }
  UpdatechangeIcon($event){
    var file = $event.target.files[0];
    this.photoName = file.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG",".svg"];
    this.fileExtension = this.photoName.split('.').pop();
    if(this.isInArray(allowedExtensions, this.fileExtension)) {

        this.fileExtensionError = false;
        // this.alertMessage = ""
        // this.showAlert=0;
        updateFormData.append("myImage", file);
        var reader = new FileReader();
            reader.onloadend = (e: any) => {
                var contents = e.target.result;
                this.changes=1;
                // var x= document.getElementById('pic'+i) as HTMLInputElement;
                // x.src = contents;
                this.EditservicePic = contents;
            }
            reader.readAsDataURL(file);
    } else {

        // this.showAlert=1;
        // this.alertMessage = "Only photos allowed!!"
        this.fileExtensionError = true;
    }
  }
  Validatekeypress(event:any){
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.keyCode == 69) {
      event.preventDefault();
    }
  }
  dosomething(){

      this.loading='1';
  }
 
  addServiceForm(){
    this.editService=0;
    this.apiCall.fetch_all_services_with_child().subscribe(res=>this.fetch_all_service(res))
    this.filterText='';
    this.parent_service_code=0;
    this.cropimage=[];
    this.crop=[];
    var a =document.getElementById('filter12') as HTMLInputElement;
    a.value='';
    this.treeComponent.treeModel.filterNodes('');
    // this.cropimage=2;
    // this.crop=0;
    var a = document.getElementById('pic0') as HTMLInputElement;
    a.src='../../../../assets/icons/picture (1).svg';
    // this.croppedImage = 'assets/images/no_image.png';
    this.Services1 = [{
      "id":0,
      "service_label":"",
      "imageUrl": "../../../../assets/icons/picture (1).svg",
      "price":"",
      "service_commission":"",
      "description":[{i:0,description:""}]
    }]
  }
  check(event,i){
    if(event == ''){
      var a = document.getElementById('hide'+i) as HTMLInputElement;
      a.style.display = 'block';
    }else{
      var a = document.getElementById('hide'+i) as HTMLInputElement;
      a.style.display = 'none';
    }
  }
  addMultipleField(){
    var len = this.Services1.length -1;
    var a = document.getElementById('serviceName'+len) as HTMLInputElement;
    if(a.value == ''){

    }
    // else if(b.value == ''){

    // }
    else{
      if(this.file == undefined){
        this.cropimage.push(3);
        this.imageChangedEvent.push('');
        this.myInputVariable.nativeElement.value = ""
        this.file=this.myInputVariable.nativeElement.value;
      }
      
      // this.file_array.push(this.file);

      this.myInputVariable.nativeElement.value = "";
      this.file = this.myInputVariable.nativeElement.value;
      this.insertid =  Math.max.apply(Math, this.Services1.map(function(o) {
        return o.id; }))
        this.insertid = this.insertid +1;
      var obj = {
        "id":this.insertid,
        "service_label":"",
        "imageUrl": "../../../../assets/icons/picture (1).svg",
        "price":"",
        "service_commission":"",
        "description":[{i:0,description:""}]
      }
      this.Services1.push(obj);
      this.file_array.push('');
    }
  console.log(this.file_array);
  }
  popList(i){
    
    
    if(this.Services1.length == 1){

    }else{
      this.Services1 = this.Services1.filter(function( obj ) {
        return obj.id !== i;
    });
    }
  
  
  }
  addServices(){
    // this.blankdescrption =0;
    var yu;
    if(this.Services1[this.Services1.length -1].service_label == ''){
      var a = document.getElementById('hide'+(this.Services1.length -1)) as HTMLInputElement;
      a.style.display='block';
    }
    else{   
    for(var abc =0;abc<this.Services1.length;abc++){
      var arraydescription = this.Services1[abc].description;
      for(var k=1;k<arraydescription.length;k++){
        if(arraydescription[k].description == ''){

          var b = document.getElementById('desc'+abc+k) as HTMLInputElement;
          b.style.display = 'block'; 
          yu = abc+k;
          this.blankdescrption=1; 
          break;
        }
      }
      
    }
    
    if(this.blankdescrption == 1){
        // var b = document.getElementById('desc'+yu) as HTMLInputElement;
        // b.style.display = 'block';
    }else{
      this.pComponent.showLoader=2;
      this.dataLoaded=0;
      this.add_service='modal';
      console.log(this.file_array);
      for( var i =0;i<this.file_array.length;i++){
        console.log(this.file_array[i]);
        if(this.file_array[i] == "" || this.file_array[i] == undefined){
          console.log("hj0");
          this.updatefile = this.dataURLtoFile(this.apiCall.no_image_url,this.filename);
          addFormData.append("image"+(i+1), this.updatefile);  
        }else{
          addFormData.append("image"+(i+1), this.file_array[i]);
        }
      }
      this.apiCall.addmultipleService(this.parent_service_code,this.Services1,addFormData).subscribe(res=>this.addResponse(res))
    }
      
      
    }
  }
  ChangeInData(event){
    this.changes=1;
    // this.updatedValue = event;
    // if(this.updatedValue == this.previousValue){
    //   this.changes =0;
    // }else{
    //   this.changes =1;
    //   this.anotherChange =1;
    // }
  }

  EditcancelImage(){
    this.updatecroppedImage = 'assets/images/no_image.png';
    this.changes=1;
    updateFormData=new FormData()
    this.updatefile = this.dataURLtoFile(this.apiCall.no_image_url,"no_image_url.png");
    this.editcropimage=3;
    this.editcrop=0;
    updateFormData.append("service_icon", this.updatefile);
  }
  blankarray:number=0;
  descarray=[];
  UpdateServices(editService_name,editprice,commission){
    if(editService_name == ''){

    }
    else{
      this.pComponent.showLoader=2;
      this.dataLoaded=0;



      for(var k=1;k<this.descriptionarray.length;k++){
        if(this.descriptionarray[k].description == ''){
          var error = document.getElementById('desc'+this.descriptionarray[k].i) as HTMLInputElement;
          error.style.display = 'block';
          this.blankarray =1;
          break;
        }else{
          var error = document.getElementById('desc'+this.descriptionarray[k].i) as HTMLInputElement;
          error.style.display = 'none';
          this.blankarray =0;
        }
      }
      if(this.blankarray ==1){
        
        }
      else if(this.updatefile != undefined){
        updateFormData=new FormData()
        updateFormData.append("service_icon", this.updatefile);
        this.update_ser='modal';
        for(var l=0;l<this.descriptionarray.length;l++){
          var obj = {i:this.descriptionarray[l].i,description:this.toTitleCase(this.descriptionarray[l].description)}
          this.descarray.push(obj);
        }
        console.log(this.descarray);
        this.apiCall.update_service(this.code,this.updatecroppedImage,editService_name,editprice,this.parent_code,updateFormData,this.descarray,commission).subscribe(res=>this.responseOfUpdateService(res))
      }
      else{
        
        if(this.updatecroppedImage = 'assets/images/no_image.png'){
          this.updatecroppedImage = '';
        }
        this.update_ser='modal';
        console.log(this.descriptionarray);
        for(var l=0;l<this.descriptionarray.length;l++){
          var obj = {i:this.descriptionarray[l].i,description:this.toTitleCase(this.descriptionarray[l].description)}
          this.descarray.push(obj);
        }
        console.log(this.descarray);
       this.apiCall.update_service(this.code,this.updatecroppedImage,editService_name,editprice,this.parent_code,updateFormData,this.descarray,commission).subscribe(res=>this.responseOfUpdateService(res))
      }
    
    }
  }
  responseOfUpdateService(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    updateFormData=new FormData()
    if(res.success == true){
      this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
      this.parentComponent.showAlert=1
    }else{
      this.parentComponent.showAlert=3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
  }
  deletePopUp(code){
   this.delcode = code;

  }
  deleteIt(){
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.apiCall.deleteData(this.delcode,'delete_service').subscribe(res=>this.responseOfUpdateService(res))
  }
  toggle(code,status){
    if(status == 1){
      this.text = 'Block';
    }
    if(status == 0){
      this.text = 'UnBlock';
    }
    this.service_code = code;

    this.service_status = status;

    if(this.service_status == 1){

      var a = document.getElementById('block'+code) as HTMLInputElement;
      a.checked = true;
    }
    if(this.service_status == 0){

      var a = document.getElementById('block'+code) as HTMLInputElement;
      a.checked = false;
    }
  }
  blockUser(code){
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.apiCall.update_service_status(this.service_code,code).subscribe(res=>this.Response(res))
  }
  addResponse(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    addFormData=new FormData();
    if(res.success == true){
      this.parentComponent.showAlert = 1;
      this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    }else{
      this.parentComponent.showAlert = 3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
  }
  Response(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.parentComponent.showAlert = 1;
      this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    }else{
      this.parentComponent.showAlert = 3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
  }
  // donotBlock(){
  //   var a = document.getElementById('block') as HTMLInputElement;
  //   a.checked=false;
  // }
  filterFn(value: string, treeModel: TreeModel) {

    treeModel.filterNodes((node: TreeNode) => this.fuzzysearch(value, node.data.name));
  }
  editService:number=0;
  fuzzysearch (needle: string, haystack: string) {

    const haystackLC = haystack.toLowerCase();
    const needleLC = needle.toLowerCase();
  
    const hlen = haystack.length;
    const nlen = needleLC.length;
  
    if (nlen > hlen) {

      return false;
    }
    if (nlen === hlen) {

      return needleLC === haystackLC;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needleLC.charCodeAt(i);
      
      while (j < hlen) {
        if (haystackLC.charCodeAt(j++) === nch) {

          continue outer;
        }
      }
      return false;
    }
    return true;
  }
  updateimageCroppedBase64(image: string,i) {
    this.editcrop=1;
    this.editimage = image;
    // this.updatecroppedImage = image;
    this.editcropimage=1;
    this.changes=1;
    this.updatefile = this.dataURLtoFile(image,this.filename);


  }
  imageCroppedBase64(image: string,i) {

    this.newimage = image;
    if(i==0){
      this.cropimage[i]=1;
      this.crop[i]=1;

      // var a = document.getElementById('pic'+i) as HTMLInputElement;
      // a.src = image;
    }else{
      
      // this.croppedImage = image;
      
      this.cropimage[i]=1;
      this.crop[i]=1;
      // var a = document.getElementById('pic'+i) as HTMLInputElement;
      // a.src = image;
    }
    this.file = this.dataURLtoFile(image,this.filename);
    this.file_array[i] = this.file;
  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  arrayofimage:any=[];
  cropImage(i){
    this.crop[i]=0;
    this.cropimage[i]=0;
    var a = document.getElementById('pic'+i) as HTMLInputElement;
    a.src = this.newimage;
    this.arrayofimage[i]=this.newimage;
  }
  editcropImage(){
    this.editcrop=0;
    this.editcropimage=0;
    this.updatecroppedImage = this.editimage;
  }
  RecropImage(i){

    this.cropimage[i] =1;


    
    this.crop[i]=1;
    this.imageCroppedBase64(this.arrayofimage[i],i);
  }
  editRecropImage(){
    this.editcropimage =1;
    this.editcrop=1;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {

  }
  updatefileChangeEvent(event: any): void {

    this.filename = event.target.value.slice(12, event.target.value.length);
    this.editcropimage =1;
    var file = event.target.files[0];

    this.photoName = file.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG","svg"];
    this.fileExtension = this.photoName.split('.').pop();
    
    if(this.isInArray(allowedExtensions, this.fileExtension)) {
        this.fileExtensionError = false;
        // this.alertMessage = ""
        this.showAlert=0;
        // addFormData.append("service_icon_1", file);
        
          var reader = new FileReader();
          reader.onloadend = (e: any) => {
              var contents = e.target.result;
              this.updateimageChangedEvent = event;
          }
          reader.readAsDataURL(file);
        
      } 
      else 
      {
        
        this.showAlert=1;
          // this.alertMessage = "Only photos allowed!!"
          this.fileExtensionError = true;
      }
  }
  fileChangeEvent(event: any,i): void {
    this.filename = event.target.value.slice(12, event.target.value.length);

    this.imageChangedEvent[i]='';

    this.cropimage[i]='';
    if(this.imageChangedEvent[i] == ''){

      this.cropimage[i]=1;    
    }else{

      this.cropimage[i]=1;    

    }
    var file = event.target.files[0];

    this.photoName = file.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG","svg"];
    this.fileExtension = this.photoName.split('.').pop();
    if(this.isInArray(allowedExtensions, this.fileExtension)) {
        this.fileExtensionError = false;
        this.showAlert=0;
        this.imageChangedEvent[i]= event;
          var reader = new FileReader();
          reader.onloadend = (e: any) => {
              var contents = e.target.result;
              
          }
          reader.readAsDataURL(file);
      } 
      else 
      {
        this.showAlert=1;
        this.fileExtensionError = true;
      }
  }
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }
}
