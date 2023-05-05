import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit{
  productos:Producto[]=[];
  roles:string[];
  isAdmin=false;
  constructor(private service:ProductoService,private toastr:ToastrService, private router:Router,private tokenService:TokenService){}
  ngOnInit(): void {
    this.cargarProductos();
    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(rol=>{
      if(rol==='ROLE_ADMIN'){
        this.isAdmin=true;
      }
    })
  }

  cargarProductos():void{
    this.service.lista().subscribe(data=>{
      this.productos=data;
    },
    err=>{console.log(err)});
  }

  borrar(id?: number){
    if (id != undefined){
    this.service.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado','OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje,'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    );
    }
  }

}
