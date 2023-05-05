package comJwt.crud_jwt.security.Repository;

import comJwt.crud_jwt.security.Entity.Rol;
import comJwt.crud_jwt.security.enums.RolNombre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol,Long> {


    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}
