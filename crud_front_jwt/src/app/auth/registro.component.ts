import { Component,OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  nuevoUsuario:NuevoUsuario;
  nombre:string;
  nombreUsuario:string;
  email:string;
  password:string;

  isLogged=false;
  errMsj:string;
  constructor(private tokenService:TokenService, private authService:AuthService, private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {
    if(this.tokenService.getToken){
      this.isLogged=false;


    }
  }


  onRegister():void{
    this.nuevoUsuario=new NuevoUsuario(this.nombre,this.nombreUsuario,this.email,this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data=>{
        this.toastr.success('Cuenta creada','Ok',{
          timeOut:3000,
          positionClass:'toast-top-center'
        });

        this.router.navigate(['/login'])
      },
      err=>{

        this.errMsj=err.error.mensaje;
        this.toastr.error(err.error.mensaje,'Faild',{
          timeOut:3000,
          positionClass:'toast-top-center'
        });
        //console.log(err.error.message);
      }
    );
  }

}
