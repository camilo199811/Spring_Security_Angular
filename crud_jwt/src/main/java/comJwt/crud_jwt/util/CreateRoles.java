//Se utiliza una sola vez ya que si se deja siempre se ejecuta y siempre crearaa los roles de usuario

/*package comJwt.crud_jwt.util;

import comJwt.crud_jwt.security.Entity.Rol;
import comJwt.crud_jwt.security.Service.RolService;
import comJwt.crud_jwt.security.enums.RolNombre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CreateRoles implements CommandLineRunner {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    RolService rolService;
    @Override
    public void run(String... args) throws Exception {
        Rol rolAdmin=new Rol(RolNombre.ROLE_ADMIN);
        Rol rolUser=new Rol(RolNombre.ROLE_USER);
        rolService.save(rolAdmin);
        rolService.save(rolUser);
    }
}
*/

