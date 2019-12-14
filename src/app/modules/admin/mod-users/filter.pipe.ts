import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/shared/models/user';
import { AuthenticationService } from '@app/core/services/authentication.service';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: User[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.lastname.toLowerCase().includes(searchText) 
      || it.firstname.toLowerCase().includes(searchText);
    //   || it.companyProfile.name.toLowerCase().includes(searchText); //needs fix
    });
  }
}