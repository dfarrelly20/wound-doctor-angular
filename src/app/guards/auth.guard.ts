import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Class is used to control which users can visit secure pages on the application
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ){}

    /**
     * Method checks if the user trying to 
     * access a page is authenticated.
     * If not authenticated, user is sent to login 
     * page
     */
    canActivate(): Observable<boolean>{
        return this.afAuth.authState.pipe(
            map(auth => {
                if(!auth){
                    this.router.navigate(['/login']);
                    return false;
                } else {
                    return true;
                }
            })
        )
    }
}