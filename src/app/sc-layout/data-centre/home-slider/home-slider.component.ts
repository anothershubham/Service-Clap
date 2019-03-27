import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from "../../../shared/server.service";
import { ScLayoutComponent } from "../../sc-layout.component";
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectionService } from 'ng-connection-service';
import { DataCentreComponent } from "../data-centre.component";
let addFormData=new FormData();
let updateFormData=new FormData();
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {
  oldicon: any;
  hex:any;
  editfilename: any;
  editcode: any;
  dataLoaded:number=0;
  imageChangedEvent: any = '';
  noText:number=0;
  editModal;
  filename: any;
  crop:number=0;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  cropimage:number=1;
  croppedImage: any = '';
  loading='0';
  cropperReady = false;
  background_color_code='';
  addSlider;
  priority_number: any;
  droprow: any;
  variable=0;
  showReCropicon:number=0;
  strt_id: any;
  dragrow:any;
  bgcolor: string;
  editcolor1: string;
  editdatalist: any={};
  imgs: any;
  customTxtColor: string;
  customtext: string='';
  backgroundcolor: string;
  photoName: any;
  textcolor: string;
  text: any;
  dragsrc: any;
  result:number=0;
  title:number=0;
  show=0;
  showId = 0;
  showId1 = 0;
  changes:number=0;
  anotherChange:number=0;
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';
  imgCropped:any ='';
  coordinates = {x:0};
  fileExtension: any;
  fileExtensionError: boolean = false;
  alertMessage: string = "";
  showAlert: number = 0;
  value;
  value1;
  file: File;
  editfile:File;
  len: number=0;
  editlen:any;
  status = 'ONLINE';
  isConnected = true;
  public arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  public selectedColor: string = 'color1';
  public color2: string = '#c62a1f';
  public color1: string = '#2889e9';
  public color:string = '#82e928';

  toggleId() {
    this.showId = 1;
    // this.showId1 = !this.showId1;
  }
  public onEventLog(event: string, data: any): void {
    this.changes=1;
    this.textcolor = data.color;
  }
  public onCustomEventCall(event: string, data: any):void{
    this.customTxtColor = data;
  }
  public onCustomEventLog(event: string, data: any): void {
    this.customTxtColor = data.color;
    // var a =document.getElementById('custom') as HTMLInputElement;
    // a.style.color = this.customTxtColor;
  }
  public onEventCall(event: string, data: any): void{
    this.textcolor = data;
  }

  onEventLog1(event: string, data: any): void {
    this.backgroundcolor = data.color;
    if(this.textcolor == this.backgroundcolor){
    }else{
      
    }
  }
  toggleId1() {
    // this.showId = !this.showId;
    this.showId1 = 1;
  }
  cancelImage(){
    this.crop=0;
    this.cropimage=1;
    this.imageChangedEvent='';
    this.result=0;
    this.showAlert=0;
    this.croppedImage='';
    this.showReCropicon=0;
    this.myInputVariable.nativeElement.value = ""
    this.file=this.myInputVariable.nativeElement.value;
  }
  openPopup(){
    var a = document.getElementById('optionsRadios1') as HTMLInputElement;
    a.checked=true;
    this.showId=1;
    this.len=0;
    this.crop=0;
    this.cropimage=1;
    this.color1 = '#2889e9';
    this.color = '#82e928';
    this.backgroundcolor = '#82e928';
    this.text='';
    this.imageChangedEvent='';
    this.result=0;
    this.showAlert=0;
    this.croppedImage='';
    this.showReCropicon=0;
  }
  homeSlider: any[] = [ ]

  constructor(private sanitizer: DomSanitizer,public apiCall:ServerService,public parentComponent : ScLayoutComponent,private connectionService: ConnectionService,public pComponent:DataCentreComponent) { 
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

  ngOnInit() {
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.textcolor = this.color1;
    this.backgroundcolor = this.color;
    this.customTxtColor = this.color2;
    this.apiCall.fetch_home_slider().subscribe(res=>this.fetch_sliders(res))
  }
  fetch_sliders(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.homeSlider = res.data;
    }else{
      this.homeSlider = [];
    }
  }
  allowDrop(ev,i) {
  
    this.dragsrc = ev.target.currentSrc;
    ev.preventDefault();
    }

  drag(ev,i) {
  
    this.strt_id = (ev.path[0].id).slice(4, 6);
    var res = ev.target.id.slice(4, 6);
    ev.dataTransfer.setData("src", ev.target.id);
    }
    imgdrop(ev){
      ev.preventDefault();
      // this.imgs = ev.dataTransfer.files[0];
      var file = ev.dataTransfer.files[0];
      this.photoName = file.name;
      this.value = 'modal';
      var allowedExtensions = 
         ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG"];
      this.fileExtension = this.photoName.split('.').pop();
      if(this.isInArray(allowedExtensions, this.fileExtension)) {
          this.fileExtensionError = false;
          this.alertMessage = ""
          this.showAlert=0;
          var reader = new FileReader();
              reader.onloadend = (e: any) => {
                  var contents = e.target.result;
                  this.result=1;
                  
                  var a = document.getElementById('crpfile') as HTMLInputElement;
                  a.click();
                  // this.imgs = contents;
                  this.imageChangedEvent = ev;
              }
              reader.readAsDataURL(file);
      } else {
        this.showAlert=1;
          this.alertMessage = "Only photos allowed!!"
          this.fileExtensionError = true;
      }
    }
    swapArray=[];
    
  drop(ev,i) {
    ev.preventDefault();
    this.swapArray=[];
    this.dragrow = this.homeSlider[this.strt_id];
    this.droprow = this.homeSlider[i];
    var obj = {slider_code:this.dragrow.code,priority_number:this.dragrow.priority_number}
    var obj1 = {slider_code:this.droprow.code,priority_number:this.droprow.priority_number}
    this.swapArray.push(obj);
    
    this.homeSlider[this.strt_id]=this.droprow;
    this.homeSlider[i]=this.dragrow;
    this.swapArray.push(obj1);
    var a = document.getElementById('swap') as HTMLInputElement;
    a.click();
    
  }
  Swap(){
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.apiCall.swapHomeslider(this.swapArray).subscribe(res=>this.responseOfSliders(res));
  }

  fileChangeEvent(event: any): void {
    this.filename = event.target.value.slice(12, event.target.value.length);
    this.cropimage =1;
    var file = event.target.files[0];
    this.photoName = file.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG"];
    this.fileExtension = this.photoName.split('.').pop();
    
    if(this.isInArray(allowedExtensions, this.fileExtension)) {
        this.fileExtensionError = false;
        this.alertMessage = ""
        this.showAlert=0;
        // addFormData.append("myImage", file);
        var reader = new FileReader();
            reader.onloadend = (e: any) => {
                var contents = e.target.result;
                this.imageChangedEvent = event;
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
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }
  imageCroppedBase64(image: string) {
    this.crop=1;
    this.croppedImage = image;
    this.result=1;
    this.file = this.dataURLtoFile(image,this.filename);
  }

  updateimageCroppedBase64(image: string){
    this.changes=1;
    this.crop=1;
    this.imgCropped = image;
    this.editfile = this.dataURLtoFile(image,this.editfilename);
  }
  cropImage(){
    this.crop=0;
    this.cropimage=0;
    this.re_image =1;
  }
  RecropImage(){
    this.cropimage =1;
    this.crop=1;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
  }
  cropIt(){
    this.result=2;
  }
  cropAgain(){
    this.result=1;
  }
  inputText(event){
    this.len = event.length;
    this.text = event;
  }


  loadImageFailed() {
    // show message
  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, {type:mime});
  }
    savehomeSliderImages(){
      if(this.croppedImage.length == 0){

      }
      else{
      }
    }
    // customTitleBox(event){
    //   this.customtext = event;
    // }
    dosomething(){
        this.loading='1';
    }
    addCustomSlider(){
      if(this.customtext == ''){
        this.title =1;
      }else{
      }
    }
    dropimg(event){
    }
    f11(event){
    }
    EditImg(){
      this.changes=1;
      var a = document.getElementById('editoptionsRadios1') as HTMLInputElement;
      a.checked = true;
      this.show=1;
      this.noText =0;
      this.showAlert=0;
    }
    EditCustomImg(){
      this.changes=1;
      var a = document.getElementById('editoptionsRadios2') as HTMLInputElement;
      a.checked = true;
      this.show=2;
      this.noText =0;
    }
    editcancelImage(){
      this.imgCropped = "";
      this.crop=0;
      this.cropimage=3;
    }
    re_image:number=0;
    EditData(list){
      this.editcode = list.code;
      this.changes=0;
      this.crop=0;
      this.cropimage=3;
      this.anotherChange=0;
      this.showReCropicon=0;
      this.editdatalist = list;
      this.noText=0;
      this.showAlert=0;
      this.oldicon = this.editdatalist.image_url;
      this.imgCropped = this.editdatalist.image_url;
      this.customtext = this.editdatalist.title;
      this.editlen = this.editdatalist.title.length;
      this.editcolor1 = this.editdatalist.text_color_code;
      this.bgcolor = '#ffffff';
      if(list.slider_type == '1'){
        var a = document.getElementById('editoptionsRadios2') as HTMLInputElement;
        a.checked = true;
        this.show=2;
        this.result=0;
        this.customtext = this.editdatalist.title;
        this.re_image =0;
        this.bgcolor = this.editdatalist.background_color_code; 
      }else{
        this.re_image =1;
        this.show=1;
        this.result=1;
        var a = document.getElementById('editoptionsRadios1') as HTMLInputElement;
        a.checked = true;
      }
    }
    
    editinputText(event){
      this.changes=1;
      this.customtext = event;
      this.editlen = event.length;
    }
    delete_pop_Up(code){
      this.editcode = code;
    }
    deleteIt(){
      this.pComponent.showLoader=2;
      this.dataLoaded=0;
      this.apiCall.deleteData(this.editcode,'delete_home_slider').subscribe(res=>this.responseOfSliders(res))
    }
    onEditEventLog1(event: string, data: any):void{
      this.changes=1;
      this.bgcolor = data.color;
    }
    updatefileChangeEvent(event){
      this.editfilename = event.target.value.slice(12, event.target.value.length);
      var file = event.target.files[0];
      this.photoName = file.name;
      var allowedExtensions = 
         ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG"];
      this.fileExtension = this.photoName.split('.').pop();
      if(this.isInArray(allowedExtensions, this.fileExtension)) {
          this.fileExtensionError = false;
          this.alertMessage = ""
          this.showAlert=0;
          // addFormData.append("myImage", file);
          this.cropimage=1;
          this.result=1;
          var reader = new FileReader();
              reader.onloadend = (e: any) => {
                  var contents = e.target.result;
                  this.imageChangedEvent = event;
              }
              reader.readAsDataURL(file);
        } 
        else 
        {
          this.showAlert=1;
            this.alertMessage = "Only photos allowed!!"
            this.fileExtensionError = true;
        }
    }

    addHomeSlider(slider_type){
      
      if(slider_type == '0'){
        if(this.croppedImage.length == 0){
          this.showAlert=1;
        }
        else{
          this.pComponent.showLoader=2;
          this.dataLoaded=0;
          this.addSlider='modal';
        
          var priority =  Math.max.apply(Math, this.homeSlider.map(function(o) {
            return o.priority_number; }))
            this.priority_number = priority+1;
            addFormData.append("image", this.file);
            if(this.priority_number == '-Infinity'){
              this.priority_number =1;
            }
            this.apiCall.addHome_slider_data(addFormData,this.textcolor,this.text,this.priority_number,slider_type,this.background_color_code).subscribe(res=>this.responseOfSliders(res));
        }
      }
      else if(slider_type == '1'){
        if(this.text == ''){
          this.noText = 1;
        }else{
          this.pComponent.showLoader=2;
          this.dataLoaded=0;
          this.addSlider='modal';
          var priority =  Math.max.apply(Math, this.homeSlider.map(function(o) {
            return o.priority_number; }))
            this.priority_number = priority+1;

            this.apiCall.addHome_slider_data(addFormData,this.textcolor,this.text,this.priority_number,slider_type,this.backgroundcolor).subscribe(res=>this.responseOfSliders(res));         
        }
      }
      
    }
    updateHomeSlider(slider_type){
      let updateFormData=new FormData();
      if(slider_type == '0'){
        this.editModal='';
        if(this.imgCropped.length == ''){
          // if(this.imgCropped == ''){
            this.showAlert =1;
          // }else{
          //   this.editModal='modal';
          //   this.bgcolor='';
          //   this.pComponent.showLoader=2;
          //   this.dataLoaded=0;
          //   this.apiCall.updateHome_slider_data(this.oldicon,this.editcode,updateFormData,this.editcolor1,this.customtext,slider_type,this.bgcolor).subscribe(res=>this.updateresponseOfSliders(res));  
          // }
        }else{
          if(this.imgCropped == ''){
            this.showAlert =1;
          }else{
            this.editModal='modal';
            this.pComponent.showLoader=2;
            this.dataLoaded=0;
            updateFormData.append("image", this.editfile);
            this.apiCall.updateHome_slider_data(this.oldicon,this.editcode,updateFormData,this.editcolor1,this.customtext,slider_type,this.bgcolor).subscribe(res=>this.updateresponseOfSliders(res)); 
          }
        }
        
      }else if(slider_type == '1'){
        if(this.customtext == ''){
          this.noText=1;
        }
        else{
          this.pComponent.showLoader=2;
          this.dataLoaded=0;
          this.editModal='modal';
          this.noText=0;
          this.apiCall.updateHome_slider_data('',this.editcode,updateFormData,this.editcolor1,this.customtext,slider_type,this.bgcolor).subscribe(res=>this.updateresponseOfSliders(res));   
        }
      }
    }

    responseOfSliders(res){
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
      addFormData=new FormData();
      if(res.success == true){
        
        this.parentComponent.showAlert=1;
        this.apiCall.fetch_home_slider().subscribe(res=>this.fetch_sliders(res))
      }else{
        this.parentComponent.showAlert=3;
      }
      this.parentComponent.messageAlert = res.message;
      this.parentComponent.setNotificationTimer();
    }
    updateresponseOfSliders(res){
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
      updateFormData=new FormData();
      if(res.success == true){
        this.parentComponent.showAlert=1;
        this.apiCall.fetch_home_slider().subscribe(res=>this.fetch_sliders(res))
      }else{
        this.parentComponent.showAlert=3;
      }
      this.parentComponent.messageAlert = res.message;
      this.parentComponent.setNotificationTimer();
    }
    swap(){}
    // uploadFile(event){
  
    //   if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = (event:any) => {
  
    //     // this.newsPic = event.target.result;
    //     }
    //     reader.readAsDataURL(event.target.files[0]);  
    //   } 
    // }
  
}
