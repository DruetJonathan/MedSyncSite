import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (value) {
      const datePipe = new DatePipe('en-US');
      return <string>datePipe.transform(value, 'dd-MM-yyyy');
    }
    return '';
  }

}
