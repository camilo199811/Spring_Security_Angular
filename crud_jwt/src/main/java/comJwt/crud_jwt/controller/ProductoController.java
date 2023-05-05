package comJwt.crud_jwt.controller;

import comJwt.crud_jwt.dto.Mensaje;
import comJwt.crud_jwt.dto.ProductoDto;
import comJwt.crud_jwt.entity.Producto;
import comJwt.crud_jwt.service.ProductoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:4200")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/lista")
    public ResponseEntity<List<Producto>> list(){
        List<Producto> list=productoService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);

    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<Producto> getById(@PathVariable("id") Long id){
        if(!productoService.existsById(id))
            return new ResponseEntity(new Mensaje("no existe"),HttpStatus.NOT_FOUND );
        Producto producto=productoService.getOne(id).get();
        return new ResponseEntity(producto,HttpStatus.OK);
    }


    @GetMapping("/detailname/{nombre}")
    public ResponseEntity<Producto> getByNombre(@PathVariable String nombre){
        if(!productoService.existsByNombre(nombre))
            return new ResponseEntity(new Mensaje("no existe"),HttpStatus.NOT_FOUND );
        Producto producto=productoService.getByNombre(nombre).get();
        return new ResponseEntity(producto,HttpStatus.OK);
    }

    //Aignar permisos solo al admin
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductoDto productoDto){
        if(StringUtils.isBlank(productoDto.getNombre()))
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"),HttpStatus.BAD_REQUEST);
        if(productoDto.getPrecio()==null || productoDto.getPrecio()<0 )
            return new ResponseEntity(new Mensaje("El precio debe ser mayor que $0"),HttpStatus.BAD_REQUEST);
        if(productoService.existsByNombre(productoDto.getNombre()))
            return new ResponseEntity(new Mensaje("El nombre ya existe"),HttpStatus.BAD_REQUEST);

        Producto producto=new Producto(productoDto.getNombre(),productoDto.getPrecio());
        productoService.save(producto);
        return new ResponseEntity(new Mensaje("Producto Creado"),HttpStatus.OK);

    }
    //Aignar permisos solo al admin
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,@RequestBody ProductoDto productoDto){
        if(!productoService.existsById(id))
            return new ResponseEntity(new Mensaje("no existe"),HttpStatus.NOT_FOUND );
        if(productoService.existsByNombre(productoDto.getNombre()) && productoService.getByNombre(productoDto.getNombre()).get().getId() != id)
            return new ResponseEntity(new Mensaje("El nombre ya existe"),HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(productoDto.getNombre()))
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"),HttpStatus.BAD_REQUEST);
        if(productoDto.getPrecio()<0)
            return new ResponseEntity(new Mensaje("El precio debe ser mayor que $0"),HttpStatus.BAD_REQUEST);


        Producto producto=productoService.getOne(id).get();
        producto.setNombre(productoDto.getNombre());
        producto.setPrecio(productoDto.getPrecio());
        productoService.save(producto);
        return new ResponseEntity(new Mensaje("Producto actualizado"),HttpStatus.OK);

    }
    //Aignar permisos solo al admin
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        if(!productoService.existsById(id))
            return new ResponseEntity(new Mensaje("no existe"),HttpStatus.NOT_FOUND );
        productoService.delete(id);
        return new ResponseEntity(new Mensaje("Producto eliminado"),HttpStatus.OK);
    }

}
