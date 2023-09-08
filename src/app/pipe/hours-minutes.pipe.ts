import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutes'
})
export class HourMinutePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hourText = hours > 0 ? hours + 'h' : '';
    const minuteText = minutes > 0 ? minutes + 'min' : '';

    return hourText + minuteText;
  }
}
