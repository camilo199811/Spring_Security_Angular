import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../model/login-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogged=false;
  isLoginFail=false;
  loginUusario:LoginUsuario;
  nombreUsuario:string;
  password:string;
  roles:string[]=[]
  errMsj:string;
  constructor(private tokenService:TokenService, private authService:AuthService, private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {
    if(this.tokenService.getToken){
      this.isLogged=false;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();

    }
  }

  onLogin():void{
    this.loginUusario=new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUusario).subscribe(
      data=>{
        this.isLogged=true;
        this.isLoginFail=false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.router.navigate(['/inicio'])
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        this.errMsj=err.error.mensaje;
        //console.log(err.error.message);
      }
    );
  }

}
