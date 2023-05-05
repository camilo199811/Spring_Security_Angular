package comJwt.crud_jwt.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//Valida el token y da acceso
public class JwtTokenFilter extends OncePerRequestFilter {
    private final static Logger logger= LoggerFactory.getLogger(JwtTokenFilter.class);
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JwtProvider jwtProvider;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    UserDetailsService userDetailsService;
    //Comprobar si el token es valido
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String token=this.getToken(request);
            if(token != null && jwtProvider.validateToken(token)){
                String nombreUsuario= jwtProvider.getNombreUsuarioFromToken(token);
                UserDetails userDetails=userDetailsService.loadUserByUsername(nombreUsuario);
                UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }catch (Exception e){
            logger.error("Fallo en el metodo doFilter"+e.getMessage());
        }
        filterChain.doFilter(request,response);
    }

    private String getToken(HttpServletRequest request){
        String header=request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer"))
            return  header.replace("Bearer","");
        return null;
    }
}
