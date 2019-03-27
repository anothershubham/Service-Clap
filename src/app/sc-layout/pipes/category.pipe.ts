import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {
  NoDataMessage: string;
  results;
  transform(items: any, filter: any, isAnd: boolean): any {
    if(!filter){
      return items;
    }

    if (filter && Array.isArray(items)) {
       
        
      let filterKeys = Object.keys(filter);
      if (isAnd) {
      
        
        let results=items.filter(item =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
        
              
                return results;
              } else {

          this.results=items.filter(item => {
          return filterKeys.some((keyName) => {
           
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });


      }
    } else {
      return items;
    }
    if(this.results.length == 0){
        return [];
      }
      else{
        return this.results; 
      }
    
  }
}