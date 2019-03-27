import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any, searchText: string): any[] {
    if(!items){
      return [];
    }
    if(!searchText){
      return items;
    }
    searchText = searchText.toString().toLowerCase();
    return items.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(searchText);
  });
  }

}
