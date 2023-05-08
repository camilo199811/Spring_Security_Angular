import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { JwtDTO } from '../model/jwt-dto';

const AUTHORIZATION="Authorization"
@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService,private toastr:ToastrService,private authservice:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.tokenService.isLogged){
      return next.handle(req);
    }
    let intReq=req;
    const token=this.tokenService.getToken();

      intReq=this.addToken(req,token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse)=>{
      if(err.status===401){
        const dto:JwtDTO=new JwtDTO(this.tokenService.getToken());
        return this.authservice.refresh(dto).pipe(concatMap((data:any)=>{
          console.log("refresh...");
          this.tokenService.setToken(data.token);
          intReq=intReq=this.addToken(req,data.token);
          return next.handle(intReq);
        }));
      }else{
        this.tokenService.logOut();
        return throwError(err);
      }

    }));

  }

  private addToken(req: HttpRequest<any>,token:string):HttpRequest<any>{
    return req.clone({headers:req.headers.set(AUTHORIZATION,'Bearer' +  token)});
  }
}



export const interceptorProvider=[{provide:HTTP_INTERCEPTORS,useClass:ProdInterceptorService,multi:true}];
