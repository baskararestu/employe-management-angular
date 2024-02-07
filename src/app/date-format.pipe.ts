import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'MM/dd/yyyy'): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format);
  }
}
