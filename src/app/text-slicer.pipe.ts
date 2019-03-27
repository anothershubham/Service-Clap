import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlicer'
})
export class TextSlicerPipe implements PipeTransform {

  transform(stringToCut,length): any {
    if(length == null){
      return stringToCut;
    }
    if(stringToCut.length < length)
    return stringToCut;
    let final = stringToCut.slice(0,length)+'...';
    return final;
  }

}
