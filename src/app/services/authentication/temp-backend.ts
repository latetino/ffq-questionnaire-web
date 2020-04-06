import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from 'src/app/services/authentication/temp-user';

const users: User[] = [{ id: "1", 
                    ffqadmin: {userId: "ADMIN", username: 'admin', userpassword: "admin123", firstname: 'Cristina', lastname: 'Palacio' }, 
                    userType: "admin" }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            //const { username, password } = body;
            const inputUser = body;
            var userz = users.filter(x => x.userType === inputUser.userType);
            var user;
            var userName;
                var passWord;
                if(inputUser.userType == "parent"){

                    user = userz.find(x => x.ffqparent.username === inputUser.ffqparent.username && x.ffqparent.userpassword === inputUser.ffqparent.password)
                }
                else if(inputUser.userType == "clinician"){
                    user = userz.find(x => x.ffqclinician.username === inputUser.ffqclinician.username && x.ffqclinician.userpassword === inputUser.ffqclinician.password)
                    
                }
                else if(inputUser.userType == "admin"){
                    user = userz.find(x => x.ffqadmin.username === inputUser.ffqadmin.username && x.ffqadmin.userpassword === inputUser.ffqadmin.password)
                }
            //user = user.find(x => userName === userz. && passWord === password)
            /*const user = users.find(x =>{   
                var userName;
                var passWord;
                if(x.userType == "parent"){
                    userName = x.ffqparent.username;
                    passWord = x.ffqparent.userpassword;
                }
                else if(x.userType == "clinician"){
                    userName = x.ffqclinician.username;
                    passWord = x.ffqclinician.userpassword;
                    
                }
                else if(x.userType == "admin"){
                    userName = x.ffqadmin.username;
                    passWord = x.ffqadmin.userpassword;
                }
            
                
                
                userName === username && passWord === password
                
             });*/
                
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                ffqclinician: user.ffqclinician,
                ffqparent: user.ffqparent,
                ffqadmin: user.ffqadmin,
                userTyoe: user.userType,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};