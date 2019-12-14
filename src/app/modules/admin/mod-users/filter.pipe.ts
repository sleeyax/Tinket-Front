import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/shared/models/user';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: User[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.firstname.toLowerCase().includes(searchText);
    });
  }
}