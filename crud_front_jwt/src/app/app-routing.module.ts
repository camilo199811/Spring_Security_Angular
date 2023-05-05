import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService as guard} from './guards/prod-guard.service';


const routes: Routes = [
  {path:'inicio',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'lista',component:ListaProductoComponent},
  {path:'detalle/:id',component:DetalleProductoComponent},
  {path:'nuevo',component:NuevoProductoComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'editar/:id',component:EditarProductoComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'**',redirectTo:'inicio',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
