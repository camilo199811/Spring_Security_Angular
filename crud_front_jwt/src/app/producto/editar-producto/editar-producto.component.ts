import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit{
  producto:Producto =null;


  constructor(private service:ProductoService,private activatedRoute:ActivatedRoute, private toastr:ToastrService,private router:Router){}
  ngOnInit() {
    //Acceder al id
    const id=this.activatedRoute.snapshot.params.id;
    this.service.detail(id).subscribe(
      data=>{
        this.producto=data;
      },
      err => {
        this.toastr.error(err.error.mensaje,'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listar']);
      }
    )

  }

  onUpdate():void{
    const id=this.activatedRoute.snapshot.params.id;
    this.service.update(id,this.producto).subscribe(
      data=>{
        this.toastr.success('Producto actualizado','Ok',{
          timeOut:3000,
          positionClass:'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err=>{
        this.toastr.error(err.error.mensaje,'Faild',{
          timeOut:3000,
          positionClass:'toast-top-center'
        });
        this.router.navigate(['/lista']);
      }
    )
  }



}
