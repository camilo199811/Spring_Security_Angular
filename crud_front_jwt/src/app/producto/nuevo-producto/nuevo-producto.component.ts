import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  nombre:string='';
  precio:number=0;
  constructor(private service:ProductoService,private toastr:ToastrService, private router:Router){

  }

  ngOnInit(): void {

  }

  onCreate():void{
    const producto=new Producto(this.nombre,this.precio);
    this.service.save(producto).subscribe(
      data=>{
        this.toastr.success('Producto creado','Ok',{
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
