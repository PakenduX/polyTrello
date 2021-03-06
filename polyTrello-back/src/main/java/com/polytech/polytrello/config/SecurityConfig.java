package com.polytech.polytrello.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

/**
 * La classe de configuration de sécurité,
 * Nous utilisons une connexion jdbc avec une base de
 * données MySQL
 * @author Mama et Zakaria
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    /**
     * Ici pour la configuration hppSecurity j'ai mis toutes les routes
     * à permitAll car j'avais un problème avec l'appel API avec axios.
     * Donc je m'assure que l'utilisateur est bien connecté avant au niveau
     * du controlleur.
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .exceptionHandling()
            .and()
            .authorizeRequests()
                .mvcMatchers("/register").permitAll()
                .mvcMatchers("/login").permitAll()
                .mvcMatchers("/getTasks/*").permitAll()
                .mvcMatchers("/deleteTask/*").permitAll()
                .mvcMatchers("/addTask/*").permitAll()
                .mvcMatchers("/modifyTask/*").permitAll()
                .anyRequest().authenticated()
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
