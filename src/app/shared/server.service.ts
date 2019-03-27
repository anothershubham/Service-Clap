import { Injectable } from '@angular/core';
import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import {Http,Headers} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  headerData = localStorage.getItem('token');
  // headerData ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI3NTgzMDgzMDgzIiwiaWF0IjoxNTM3MzUyNzcyfQ.B9Yi9MONa4W6WeANyvH3e5qzXf1JOvWXRsmJqGW-8YU"; 
  userCode = localStorage.getItem('userCode');
  url='http://139.59.93.31:2018/secureApi/';
  // url1='http://192.168.31.108:2018/secureApi/';
  no_image_url = "data:image/png;base64,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";

  no_user_image = 
  "data:image/png;base64,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";
  partner_code = '';

  constructor(public router:Router,public http:HttpClient) {
    this.headerData = localStorage.getItem('token');
  }
  setAllReadNotification(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      };
    let addapi =JSON.stringify(temp);
    
    let headers=new HttpHeaders(headerJson);
    let url = 'http://139.59.93.31:2018/secureApi/seen_all_notification';
    return this.http.post(url,addapi,{
      headers: headers
    });
  }
  fetch_all_active_partner(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      };
    let addapi =JSON.stringify(temp);
    
    let headers=new HttpHeaders(headerJson);
    let url = 'http://139.59.93.31:2018/secureApi/fetch_all_active_partner';
    return this.http.post(url,addapi,{
      headers: headers
    });
  }
  fetch_all_notification(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      };
    let addapi =JSON.stringify(temp);
    
    let headers=new HttpHeaders(headerJson);
    let url = 'http://139.59.93.31:2018/secureApi/fetch_notification';
    return this.http.post(url,addapi,{
      headers: headers
    });
  }
  deleteOrder(id){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    let url = 'http://139.59.93.31:2018/secureApi/delete_order/'+id;
    return this.http.delete(url,{
      headers: headers
    });
  }
  cancelOrder(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      };
    let addapi =JSON.stringify(temp);
    let headers=new HttpHeaders(headerJson);
    let url = 'http://139.59.93.31:2018/secureApi/cancel_order';
    return this.http.post(url,addapi,{
      headers: headers
    });
  }
  fetchSpecificOrder(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      const addapi=JSON.stringify(temp);
    let headers=new HttpHeaders(headerJson);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_specific_order_details',addapi, {
      headers : headers
  });
  }
  fetchAllOrders(temp) {
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      
    let addapi = JSON.stringify(temp);
    let headers=new HttpHeaders(headerJson);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_order_list',addapi,{
      headers : headers
  });
  }
  fetch_all_broadcasts() {
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      let addapi = JSON.stringify({
        "admin_code": localStorage.getItem('user_code')
        // "admin_code": 0
          });
    let headers=new HttpHeaders(headerJson);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_broadcast_history',addapi,{
      headers : headers
    });
  }
  addNewBroadcast(temp) {
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let addapi = JSON.stringify(temp);
    let headers=new HttpHeaders(headerJson);
    return this.http.post('http://139.59.93.31:2018/secureApi/add_broadcast',addapi,{
      headers : headers
    });
  }
  deleteServingCity(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    const addapi=JSON.stringify(temp);
    let headers=new HttpHeaders(headerJson);
    let url =  'http://139.59.93.31:2018/secureApi/delete_partner_service_providing_location/'+temp;
      return this.http.delete(url,{
        headers : headers
      });
  }
  deletePartner(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    return this.http.delete('http://139.59.93.31:2018/secureApi/delete_partner/'+temp,{
      headers : headers
    });
  }
  fetch_wallet_history(code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    const addapi=JSON.stringify({
      "partner_code":code
        });
    let headers=new HttpHeaders(headerJson);
    return this.http.post('http://139.59.93.31:2018/secureApi/wallet_transaction_history_of_partner',addapi,{
      headers : headers
  });
  }
  transactMoney(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    
    return this.http.post('http://139.59.93.31:2018/secureApi/add_and_deduct_money_from_wallet', addapi ,{
      headers : headers
      });
  }
  changeBlockStatus(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/change_block_status_of_partner', addapi ,{
      headers : headers
      });
  }
  fetch_all_cities(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "user_type":0,
      "admin_code":"0"
    });
    return this.http.post(this.url+'fetch_all_city',addapi,{
      headers : headers
  });
  }
  fetch_all_city(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "user_type":1,
      "admin_code":localStorage.getItem('user_code')
    });
    return this.http.post(this.url+'fetch_all_city',addapi,{
      headers : headers
  });
  }
  fetch_all_enabled_cities(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.url+'fetch_enabled_city',{
      headers : headers
  });
  }
  add_multiple_cities(addcitydata){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
        "cities":addcitydata
      });
    return this.http.post(this.url+'add_city', addapi ,{
      headers : headers
    });
  }
  update_customer_details(temp,form){
    let headerJson = {
      // 'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    
    // var form = new FormData();
    // form.append('image',image);
    form.append('customer_data',addapi);
    return this.http.put('http://139.59.93.31:2018/secureApi/update_customer_details', form , {
      headers: headers
    });
  }
  assign_partner(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/assign_order_to_partner',addapi ,{
      headers : headers
    });
  }
  switch_partner(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/assign_order_to_partner_by_admin',addapi ,{
      headers : headers
    });
  }
  change_status_of_city(code,city_status){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
        "status":city_status,
        "city_code":code
      });
    return this.http.put(this.url+'change_status_of_city', addapi ,{
      headers : headers
    });
  }
  fetch_all_customer_city_wise(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_customer_city_wise', addapi ,{
      headers : headers
      });
  }
  fetch_specific_customer_details(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_specific_customer_details', addapi ,{
      headers : headers
      });
  }
  fetch_cutomer_order_details(code){
   let headers=new Headers();
    headers.append('code',code);
    return this.http.get(this.url);
  }
  fetch_all_partners(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_city_wise_partner', addapi ,{
      headers : headers
      });
  }
  fetch_specific_partner_details(code)	{
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
    "partner_code":code
      });
    return this.http.post('http://139.59.93.31:2018/secureApi/fetch_specific_partner_details', addapi ,{
      headers : headers
      });
  }
  update_verify_status_of_partner(temp){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    return this.http.put('http://139.59.93.31:2018/secureApi/change_verify_status_of_partner', addapi ,{
      headers : headers
      });
  }
  update_partner_details(temp, form){
    let headerJson = {
      // 'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify(temp);
    
    // let form1 = new FormData();
    // form1.append('image',image);
    form.append('partner_details',addapi);
    return this.http.put('http://139.59.93.31:2018/secureApi/update_partner_details', form , {
      headers: headers
    });

    // let headerJson = {
    //   // 'Content-Type':'application/json',
    //   'token':localStorage.getItem('token')
    //   }
    // let headers=new HttpHeaders(headerJson);
    // const addapi=JSON.stringify(temp);
    
    // let form1 = new FormData();
    // form1.append('image',image);
    // form1.append('partner_detail',addapi);
    // return this.http.put('http://139.59.93.31:2018/secureApi/update_partner_details', form1 , {
    //   headers: headers
    // });
  }
  fetch_home_slider(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
      let headers=new HttpHeaders(headerJson);
      return this.http.get(this.url+'fetch_all_home_slider',{
          headers : headers
      })
  }
  toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }
  addHome_slider_data(addFormData,textcolor,text,priority_number,slider_type,background_color_code){
    let headerJson = {
      // 'enctype': 'multipart/form-data',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "title":this.toTitleCase(text.trim()),
      "priority_number":priority_number,
      "slider_type":slider_type,
      "text_color_code":textcolor,
      "background_color_code":background_color_code,
      "user_code":1
    });
    addFormData.append("slider",addapi);
    let headers=new HttpHeaders(headerJson);
    return this.http.post(this.url+'add_home_slider',addFormData,{
        headers : headers
    })
  }
  swapHomeslider(array){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "slider":array
    });
    let headers=new HttpHeaders(headerJson);
    return this.http.put(this.url+'update_home_slider_priority',addapi,{
        headers : headers
    })
  }
  updateHome_slider_data(oldicon,code,addFormData,textcolor,text,slider_type,background_color_code){
    let headerJson = {
      // 'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "slider_code":code,
      "title":this.toTitleCase(text.trim()),
      "slider_type":slider_type,
      "text_color_code":textcolor,
      "background_color_code":background_color_code,
      "user_code":1,
      "image_url":oldicon
    });
    addFormData.append("slider",addapi);
    let headers=new HttpHeaders(headerJson);
    return this.http.put(this.url+'update_home_slider',addFormData,{
        headers : headers
    })
  }
  updateHome_slider_data_no_image(oldicon,code,textcolor,text,slider_type,background_color_code){
    let headerJson = {
      // 'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "slider_code":code,
      "title":this.toTitleCase(text.trim()),
      "slider_type":slider_type,
      "text_color_code":textcolor,
      "background_color_code":background_color_code,
      "user_code":1,
      "image_url":oldicon
    });
    let headers=new HttpHeaders(headerJson);
    return this.http.put(this.url+'update_home_slider',addapi,{
        headers : headers
    })
  }

  addTerms_and_condition(title,content,radioBtn){

    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
      const addapi=JSON.stringify({
        "title":this.toTitleCase(title.trim()),
        "content":this.toTitleCase(content.trim()),
        "valid_for":radioBtn
      });
      return this.http.post(this.url+'add_term_and_condition',addapi,{
          headers : headers
      })
  }
  editTerms_and_condition(title,content,radioBtn,code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
      const addapi=JSON.stringify({
        "title":this.toTitleCase(title.trim()),
        "content":this.toTitleCase(content.trim()),
        "valid_for":radioBtn,
        "t_and_c_code":code
      });
      let headers=new HttpHeaders(headerJson);
      return this.http.put(this.url+'update_term_and_condition',addapi,{
          headers : headers
      })
      
  }
  fetch_all_services_with_child(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.url+'fetch_all_services_with_its_child', {
        headers : headers
    })
  }
  fetch_all_services_with_child_except_one(code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      const addapi=JSON.stringify({
        "service_code":code,
      });
    let headers=new HttpHeaders(headerJson);
    return this.http.post(this.url+'fetch_all_services_except_one',addapi, {
        headers : headers
    })
  }
  fetch_all_services_with_custom(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.url+'fetch_all_services_with_custom_name', {
        headers : headers
    })
  }
  fetch_all_checked_services(array){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      const addapi=JSON.stringify({
        "services":array,
      });
    let headers=new HttpHeaders(headerJson);
    return this.http.post(this.url+'fetch_all_checked_services', addapi,{
        headers : headers
    })
  }
  fetch_all_checked_services_with_custom_name(array){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      const addapi=JSON.stringify({
        "services":array,
      });
    let headers=new HttpHeaders(headerJson);
    return this.http.post(this.url+'fetch_all_checked_services_with_custom_name', addapi,{
        headers : headers
    })
  }
  addmultipleService(parent_service_code,Services1,addFormData){
    let headerJson = {
      // 'Content-Type':'multipart/form-data',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "user_code":1,
      "parent_service_code":parent_service_code,
      "services":Services1,
    });
    addFormData.append("services",addapi);
    let headers=new HttpHeaders(headerJson);
    return this.http.post(this.url+'add_service',addFormData,{
        headers : headers
    })
  }
  update_service(code,icon,editService_name,editprice,parent_code,updateFormData,array,comssion){
    let headerJson = {
      // 'Content-Type':'multipart/form-data',
      'token':localStorage.getItem('token'),
      }
    const addapi=JSON.stringify({
      "icon":icon,
      "user_code":localStorage.getItem('user_code'),
      "parent_service_code":parent_code,
      "service_label":this.toTitleCase(editService_name),
      "price":editprice,
      "description":array,
      "service_commission":comssion,
      "service_code":code  
    });  
    updateFormData.append("services",addapi);
    let headers=new HttpHeaders(headerJson);
    return this.http.put(this.url+'update_service',updateFormData,{
        headers : headers
    })
  }
  update_service_status(service_code,code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "status":code,
      "service_code":service_code
    });
    return this.http.put(this.url+'update_status_of_service', addapi, {
      headers : headers
  })
  }

  fetch_offer(){
    var cityarray;
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      if(localStorage.getItem('user_type') == '0'){
        cityarray =[0];
      }else{
        cityarray = JSON.parse(localStorage.getItem('cities')); 
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "starting_date":"0",
      "expiring_on":"0",
      "city_code":cityarray,
      "services":[0],
      "user_type":"-1",
      "admin_type":"0"
    });
    return this.http.post(this.url+'fetch_all_offers', addapi, {
      headers : headers
  })
  }
  fetch_filtered_offer(s_date,e_date,user_type,cityarray,servicearray){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      if(cityarray.length == 0){
        cityarray =[0];
      }
      if(servicearray.length == 0){
        servicearray =[0];
      }
    let headers=new HttpHeaders(headerJson);
    if(s_date == null){
      s_date = 0
    }
    if(e_date == null){
      e_date = 0
    }
    const addapi=JSON.stringify({
      "starting_date":s_date,
      "expiring_on":e_date,
      "city_code":cityarray,
      "services":servicearray,
      "user_type":user_type
    });
    return this.http.post(this.url+'fetch_all_offers', addapi, {
      headers : headers
  })
  }
  fetch_Specific_offer_details(code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "offer_code":code
    });
    return this.http.post(this.url+'fetch_specific_offer_details', addapi, {
      headers : headers
  })
  }

  add_offer(addformvalue,cityArray,servicearray,s_date,e_date){
    if(addformvalue.max_discount_amount == undefined){
      addformvalue.max_discount_amount = 0;
    }
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "title":addformvalue.title.trim(),
      "starting_date":s_date,
      "description":this.toTitleCase(addformvalue.description.trim()),
      "expiring_date":e_date,
      "discount_value":addformvalue.discount_value,
      "promocode":addformvalue.promo_code.trim(),
      "cities":cityArray,
      "services":servicearray,
      "created_by":localStorage.getItem('user_code'),
      "min_bill_amount":addformvalue.min_bill_amount,
      "max_discount_amount":addformvalue.max_discount_amount,
      "user_type":addformvalue.user_type,
      "user_code":1,
      "offer_type":addformvalue.discount_type
    });
    return this.http.post(this.url+'add_offers', addapi, {
      headers : headers
  })
  }
  update_offer(addformvalue,cityArray,servicearray,s_date,e_date,offer_code){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "title":addformvalue.title.trim(),
      "starting_date":s_date,
      "description":this.toTitleCase(addformvalue.description.trim()),
      "expiring_date":e_date,
      "discount_value":addformvalue.discount_value,
      "promocode":addformvalue.promo_code.trim(),
      "cities":cityArray,
      "services":servicearray,
      "created_by":localStorage.getItem('user_code'),
      "min_bill_amount":addformvalue.min_bill_amount,
      "max_discount_amount":addformvalue.min_disc_amount,
      "user_type":addformvalue.user_type,
      "user_code":1,
      "offer_type":addformvalue.discount_type,
      "offer_code":offer_code
    });
    return this.http.put(this.url+'update_offer_details', addapi, {
      headers : headers
  })
  }

  fetchDashboardData(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
      let city = [];
      if(localStorage.getItem('user_type') == "0"){
        city = [0];
      }else{
       city = JSON.parse(localStorage.getItem('cities'));
      }
       let headers=new HttpHeaders(headerJson);
         const addapi=JSON.stringify({
         "city_code":city,
         "user_type":localStorage.getItem('user_type'),
         "from_date":"0",
         "to_date":"0"
       });
       return this.http.post(this.url+'fetch_dashboard_data_of_admin', addapi, {
         headers : headers
     })
    
}
filterDashboardData(city_code,from_date,to_date){
  let headerJson = {
    'Content-Type':'application/json',
    'token':localStorage.getItem('token')
    }
  let headers=new HttpHeaders(headerJson);
  if(JSON.parse(localStorage.getItem('cities')).length == 0){
    var city = [0];
  }else{
   city = JSON.parse(localStorage.getItem('cities'));
  }
  const addapi=JSON.stringify({
    "city_code":city,
    "from_date":from_date,
    "to_date":to_date
  });
  return this.http.post(this.url+'fetch_dashboard_data_of_admin', addapi, {
      headers : headers
  })
  }

  fetchAllServices(){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.url+'fetch_all_services', {
        headers : headers
    })
    }

  deleteData(code,apiname){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
      let headers=new HttpHeaders(headerJson);
      return this.http.delete(this.url+apiname+'/'+code,{
          headers : headers
      })
    }

    fetchTerms_and_condition(){
      let headerJson = {
        'Content-Type':'application/json',
        'token':localStorage.getItem('token'),
        }
        let headers=new HttpHeaders(headerJson);
        return this.http.get(this.url+'fetch_term_and_condition',{
            headers : headers
        })
    }

    fetch_all_Admin(){
      let headerJson = {
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
        }
      let headers=new HttpHeaders(headerJson);
      const addapi=JSON.stringify({
          "admin_code":localStorage.getItem('user_code')
        });
      return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_admin', addapi ,{
        headers : headers
        });
    }
    fetch_all_Admin_cityWise(code){
      let headerJson = {
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
        }
      let headers=new HttpHeaders(headerJson);
      const addapi=JSON.stringify({
          "admin_code":localStorage.getItem('user_code'),
         "city_code":code
        });
      return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_city_wise_admin', addapi ,{
        headers : headers
        });
    }
    fetch_specific_admin_details(code)	{
      let headerJson = {
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
        } 
      let headers=new HttpHeaders(headerJson);
      const addapi=JSON.stringify({
      "admin_code":code
        });
      return this.http.post('http://139.59.93.31:2018/secureApi/fetch_specific_admin_details', addapi ,{
        headers : headers
        });
    }

  
    add_Admin(value,addformdata,array,citylabel){
      let headerJson = {
       // 'Content-Type':'application/json',
        'token':localStorage.getItem('token')
        }
      let headers=new HttpHeaders(headerJson);
      
      const addapi=JSON.stringify(
        {
        "name":value.Name,
        "mobile":value.Mobile,
        "email":value.email,
        "address":value.address,
        "cities":array, 
        "password":value.password,
        "user_type":value.user,
        "admin_code":localStorage.getItem('user_code'),
        "city_label":citylabel,
      }
      // { "name":"shubham",
      //   "mobile":8305139100,
      //   "email":"email",
      //   "address":"address",
      //   "cities":[{"code":1},{"city_code":2},{"code":3},{"code":4}],
      //   "password":"password",
      //   "user_type" : 1,
      //   "admin_code":20
      //   }
    );
      addformdata.append('admin_detail',addapi) 
      return this.http.post('http://139.59.93.31:2018/secureApi/add_admin_details', addformdata , {
        headers : headers
    }) 
     
}
update_my_profile(value,addformdata,code,password,array){
  let headerJson = {
    //'Content-Type':'application/json',
    'token':localStorage.getItem('token')
    }
    if(localStorage.getItem('user_type') == '0'){
      var city = [];
    }else{
      city = JSON.parse(localStorage.getItem('cities'));
    }
  let headers=new HttpHeaders(headerJson);
  let addapi;
  if(localStorage.getItem("user_type") != "0"){
  addapi=JSON.stringify({
    "name":value.Name,
    "mobile":value.Mobile,
    "email":value.email, 
    "address":value.address,
    "cities":array, 
    "password":password,
    "user_type":localStorage.getItem("user_type"),
    "admin_code":code,
  })
}
  else if(localStorage.getItem("user_type") == "0"){
    addapi=JSON.stringify({
      "name":value.Name,
      "mobile":value.Mobile,
      "email":value.email, 
      "address":value.address,
      "cities":[0], 
      "password":password,
      "user_type":localStorage.getItem("user_type"),
      "admin_code":code,
    })
  }
  
    addformdata.append('admin_detail',addapi)        
  return this.http.put('http://139.59.93.31:2018/secureApi/update_admin_details', addformdata ,{
    headers : headers
    });
}
update_my_account(value,addformdata,code,array,citylabel){
  let headerJson = {
    //'Content-Type':'application/json',
    'token':localStorage.getItem('token')
    }
    
  let headers=new HttpHeaders(headerJson);
  const addapi=JSON.stringify({
    "code":code,
    "name":value.Name,
    "mobile":value.Mobile,
    "email":value.email, 
    "address":value.address, 
    "cities":array,
    "admin_code":code,
    "password":value.password,
    "city_label":citylabel,
    "user_type":value.user,
  }); 
    addformdata.append('admin_detail',addapi)        
  return this.http.put('http://139.59.93.31:2018/secureApi/update_admin_details', addformdata ,{
    headers : headers
    });
}

change_password(value,code)	{
  let headerJson = {
    'Content-Type':'application/json',
    'token':localStorage.getItem('token')
    }
  let headers=new HttpHeaders(headerJson);
  const addapi=JSON.stringify({
    "old_password":value.oldpassword,
    "new_password":value.password,
    "admin_code":code
    });
  return this.http.put('http://139.59.93.31:2018/secureApi/change_password_of_admin/', addapi ,{
    headers : headers
    });
}
delete_Admin(code){
  let headerJson = {
    'Content-Type':'application/json',
    'token':localStorage.getItem('token'),
    }
    let headers=new HttpHeaders(headerJson);
    return this.http.delete('http://139.59.93.31:2018/secureApi/delete_Admin/'+code,{
        headers : headers
    })
}
fetch_all_city_wise_Admin(code){
  let headerJson = {
    'Content-Type':'application/json',
    'token':localStorage.getItem('token')
    }
  let headers=new HttpHeaders(headerJson);
  const addapi=JSON.stringify({
      "city_code":33,
    });
  return this.http.post('http://139.59.93.31:2018/secureApi/fetch_all_city_wise_admin', addapi ,{
    headers : headers
    });
}


  global_Search(event){
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token')
      }
    let headers=new HttpHeaders(headerJson);
    const addapi=JSON.stringify({
      "keyword":event
      });
    return this.http.post(this.url+'global_serarch', addapi ,{
      headers : headers
      });
  } 
}
