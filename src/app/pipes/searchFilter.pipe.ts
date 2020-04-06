import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(list: any, term: any): any {
    if(term === undefined)
    {
      return list;
    }
    return list.filter(function(user){
      var username = user.username;
      var name = user.firstname + " " + user.lastname;
      var role_and_name = user.role + " " + user.firstname + " " + user.lastname;
      var role_and_lastname = user.role + " " + user.lastname;
      var lastname_firstname = user.lastname + ", " + user.firstname;
      return username.toLowerCase().includes(term.toLowerCase()) 
        || name.toLowerCase().includes(term.toLowerCase())
        || role_and_name.toLowerCase().includes(term.toLowerCase())
        || role_and_lastname.toLowerCase().includes(term.toLowerCase())
        || lastname_firstname.toLowerCase().includes(term.toLowerCase());
    });
  }

}
