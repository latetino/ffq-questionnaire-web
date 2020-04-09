import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser);
        
        if (currentUser) {
          console.log(currentUser[0].usertype);
            // logged in so return true
            var urlType = this.getUrlType(state.url);
            console.log(state.url);
            console.log(urlType);

            if(currentUser[0].usertype == "admin"){

              if(urlType != "/admin"){
                this.router.navigate(['/admin/home']);
              }  
            }
            else if(currentUser[0].usertype == "parent"){
              if(urlType != "/parent"){
                this.router.navigate(['/parental']);
              } 
            }
            else if(currentUser[0].usertype == "clinician"){
              if(urlType != "/clinic"){
                this.router.navigate(['/clinic']);
              }  
            }
            
            return true;
        }

        // not logged in so redirect to login page with the return url

          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
    }



    private getUrlType(state: string): string{
        var urlType = "/"
        var i;
        for (i = 1; i < state.length; i++) {
          if(state[i] == "/"){
            i = (state.length)-1;
            continue;
          }
           urlType += state[i];
        }
        return urlType;

    }
}



