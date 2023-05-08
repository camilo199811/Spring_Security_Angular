package comJwt.crud_jwt.security.jwt;

import comJwt.crud_jwt.security.Entity.UsuarioPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

//Genera el token
@Component
public class JwtProvider {

    private final static Logger logger= LoggerFactory.getLogger(JwtProvider.class);

    //Los dos campos del application.properties
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private int expiration;

    public String generateToken(Authentication authentication){
        UsuarioPrincipal usuarioPrincipal= (UsuarioPrincipal) authentication.getPrincipal();
        List<String> roles=usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Jwts.builder()
                .setSubject(usuarioPrincipal.getUsername())
                .claim("roles",roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+expiration * 1000))
                .signWith(SignatureAlgorithm.HS512,secret.getBytes())
                .compact();
    }

    public String getNombreUsuarioFromToken(String token){
        return  Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token){
       try{
           Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
           return true;
       }catch (MalformedJwtException e){
           logger.error("Token mal formado");

       }catch (UnsupportedJwtException e){
           logger.error("Token no soportado");

       }
       catch (ExpiredJwtException e){
           logger.error("Token expirado");

       }
       catch (IllegalArgumentException e){
           logger.error("Token vacio");

       }
       catch (SignatureException e){
           logger.error("Fallo en la firma");

       }
        return false;
    }
}
