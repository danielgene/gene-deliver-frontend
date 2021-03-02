import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value === null) {
      return " .. ";
    } else {
      if (value.length > length) {
        if (length === null) {
          return value.substr(0, 12) + ' ...';
        } else {
          return value.substr(0, length) + ' ...';
        }

      } else {
        return value;
      }
    }

  }

}
