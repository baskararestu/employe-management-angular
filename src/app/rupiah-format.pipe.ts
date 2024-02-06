import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiahFormat',
  standalone: true,
})
export class RupiahFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === null) {
      return '';
    }

    const formattedValue = value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formattedValue;
  }
}
