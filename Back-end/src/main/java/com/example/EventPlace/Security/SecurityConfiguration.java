package com.example.EventPlace.Security;

import com.example.EventPlace.jwt.JwtRequestFilter;
import com.example.EventPlace.service.implement.UserImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private Environment environment;

    @Autowired
    UserImplement userImplement;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                // User endpoints para gestion de usuarios solo con ADMIN
                .antMatchers(HttpMethod.POST, "/user/**").permitAll()
                .antMatchers(HttpMethod.POST, "/user/login").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/**").access("hasAuthority('UPDATE_USERS')")
                .antMatchers(HttpMethod.PUT, "/user/uploadImage").access("hasAuthority('UPDATE_PROFILE')")
                .antMatchers(HttpMethod.PUT, "/user/changeRole").access("hasAuthority('UPDATE_USERS')")
                .antMatchers(HttpMethod.DELETE, "/user/{userId}").access("hasAuthority('DELETE_USERS')")
                .antMatchers(HttpMethod.GET, "/user/{userId}").access("hasAuthority('READ_USERS')")
                .antMatchers(HttpMethod.GET, "/user/allUsers").access("hasAuthority('READ_USERS')")
                // EventPlace  (ADMIN y OWNER)
                .antMatchers(HttpMethod.POST, "/eventPlace/addPlace").access("hasAuthority('CREATE_EVENTS')")
                .antMatchers(HttpMethod.POST, "/eventPlace/updateCategory/{id}/{category}").permitAll()
                .antMatchers(HttpMethod.POST, "/eventPlace/rate").access("hasAuthority('RATE_EVENTS')")
                .antMatchers(HttpMethod.POST, "/eventPlace/images").access("hasAuthority('CREATE_EVENTS')")
                .antMatchers(HttpMethod.PUT, "/eventPlace/updatePlace").access("hasAuthority('UPDATE_EVENTS')")
                .antMatchers(HttpMethod.DELETE, "/eventPlace/deletePlaceById/{id}").access("hasAuthority('DELETE_EVENTS')")
                .antMatchers(HttpMethod.GET, "/eventPlace/**").permitAll()
                .antMatchers(HttpMethod.GET, "/eventPlace/allPlace").permitAll()
                // Role (ADMIN, OWNER, BASIC)
                .antMatchers(HttpMethod.POST, "/roles/create").access("hasAuthority('CREATE_ROLE')")
                .antMatchers(HttpMethod.PUT, "/roles/**").access("hasAuthority('UPDATE_ROLE')")
                .antMatchers(HttpMethod.DELETE, "/roles/{roleName}").access("hasAuthority('DELETE_ROLE')")
                .antMatchers(HttpMethod.GET, "/roles/{roleName}").access("hasAuthority('READ_ROLE')")
                .antMatchers(HttpMethod.GET, "/roles/allRole").access("hasAuthority('READ_ROLE')")
                //Category (ADMIN y OWNER)
                .antMatchers(HttpMethod.POST, "/categories/**").access("hasAuthority('CREATE_CATEGORY')")
                .antMatchers(HttpMethod.PUT, "/categories/updateCategory").access("hasAuthority('UPDATE_CATEGORY')")
                .antMatchers(HttpMethod.DELETE, "/categories/deleteCategory/{id}").access("hasAuthority('DELETE_CATEGORY')")
                .antMatchers(HttpMethod.GET, "/categories/findCategory/{id}").access("hasAuthority('READ_CATEGORY')")
                .antMatchers(HttpMethod.GET, "/categories/allCategories").permitAll()
                //City (USER-OWNER-ADMIN)
                .antMatchers(HttpMethod.POST, "/cities/addCity").access("hasAuthority('CREATE_CITY')")
                .antMatchers(HttpMethod.PUT, "/cities/updateCity").access("hasAuthority('UPDATE_CITY')")
                .antMatchers(HttpMethod.DELETE, "/cities/{id}").access("hasAuthority('DELETE_CITY')")
                .antMatchers(HttpMethod.GET, "/cities/allCities").permitAll()
                .antMatchers(HttpMethod.GET, "/cities").permitAll()
                // Booking ( BASIC)
                .antMatchers(HttpMethod.POST, "/booking/addBooking").access("hasAuthority('CREATE_BOOKING')")
                .antMatchers(HttpMethod.DELETE, "/booking/deleteBooking/{id}").access("hasAuthority('DELETE_BOOKING')")
                .antMatchers(HttpMethod.GET, "/booking/findBookingByUser/{id}").access("hasAuthority('READ_BOOKING')")
                .antMatchers(HttpMethod.GET, "/booking/notAvailableDates/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/booking/findAllBookingUsers/{id}").access("hasAuthority('READ_BOOKING')")
                .antMatchers(HttpMethod.PUT, "/booking/updateBooking/{id}").permitAll()

                // Messages
                .antMatchers(HttpMethod.GET, "/initial/**").permitAll()
                .antMatchers(HttpMethod.POST, "/images/**").permitAll()
                .antMatchers("/message/**").permitAll()


                .antMatchers(HttpMethod.GET, "/confirmToken/**").permitAll()
                .antMatchers(HttpMethod.POST, "/confirmToken/**").permitAll()
                .antMatchers("/static/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/ws/**");
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedHeader("*");
        config.addExposedHeader("Authorization");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(userImplement);
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        return provider;
    }

}