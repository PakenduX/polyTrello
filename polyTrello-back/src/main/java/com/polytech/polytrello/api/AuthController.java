package com.polytech.polytrello.api;

import com.polytech.polytrello.business.RegisterService;
import com.polytech.polytrello.repository.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * Le controlleur de l'authentification
 * J'utilse des hashMap pour retourner des réponse
 * json
 * @author Mama
 *
 */

@CrossOrigin(origins = "http://mamadembele.fr:5000")
@RestController
public class AuthController {

    @Autowired
    AuthenticationManager manager;

    @Autowired
    RegisterService registerService;


    @PostMapping("/register")
    public HashMap<String, String> register(@RequestBody User user){
        HashMap<String, String> result = new HashMap<>();
        try{
            registerService.save(user);
            result.put("status", "success");
        }catch (Exception e){
            System.out.println(e.getMessage());
            result.put("status", "error");
        }
        return result;

    }

    @PostMapping("/login")
    public HashMap<String, String> login(@RequestBody User user, HttpServletResponse res){
        HashMap<String, String> response = new HashMap<>();
        try{
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = manager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            if(auth.isAuthenticated())
                response.put("status", "success");
            else
                response.put("status", "error");
        }catch (Exception e){
            response.put("status", "error");
        }

        return response;

    }
}
