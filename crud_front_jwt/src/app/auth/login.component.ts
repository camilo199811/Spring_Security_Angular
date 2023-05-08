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

  loginUusario:LoginUsuario;
  nombreUsuario:string;
  password:string;

  errMsj:string;
  constructor(private tokenService:TokenService, private authService:AuthService, private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {

  }

  onLogin():void{
    this.loginUusario=new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUusario).subscribe(
      data=>{

        this.tokenService.setToken(data.token);


        this.router.navigate(['/inicio'])
      },
      err=>{

        this.errMsj=err.error.mensaje;
        this.toastr.error(this.errMsj,'Fail',{
          timeOut:3000,positionClass:'toast-top-center',
        });
        //console.log(err.error.message);
      }
    );
  }

}
