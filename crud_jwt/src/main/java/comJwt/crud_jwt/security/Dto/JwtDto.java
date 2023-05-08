package comJwt.crud_jwt.security.Dto;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class JwtDto {

    private String token;


    public JwtDto(String token) {
        this.token = token;


    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


