import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate{
  realRol:string;
  constructor(private tokenService:TokenService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
   const expectedRol=route.data.expectedRol;
  this.realRol=this.tokenService.getIsAdmin() ? 'admin' : 'user';
   if(!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0){
    this.router.navigate(['/inicio']);
    return false;
   }
   return true;
  }
}
