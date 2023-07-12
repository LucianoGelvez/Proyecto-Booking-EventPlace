package com.example.EventPlace.Security;


import com.example.EventPlace.domain.Location;
import com.example.EventPlace.domain.Permission;
import com.example.EventPlace.domain.Role;
import com.example.EventPlace.domain.User;
import com.example.EventPlace.repository.RolRepository;
import com.example.EventPlace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements ApplicationRunner {


    private RolRepository rolRepository;

    private UserRepository userRepository;


    @Autowired
    public DataLoader(RolRepository rolRepository, UserRepository userRepository) {
        this.rolRepository = rolRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

        BCryptPasswordEncoder cifrador=new BCryptPasswordEncoder();

//
//---------------------------------------------------ADMIN USER-------------------------------------------


        Role roleAdmin = new Role();
        roleAdmin.setName("ADMIN");
        roleAdmin.setDescription("All permissions");
        roleAdmin.setPermissions(Arrays.asList(
                Permission.DELETE_EVENTS, Permission.CREATE_EVENTS, Permission.UPDATE_EVENTS, Permission.READ_EVENTS,
                Permission.READ_USERS, Permission.CREATE_USERS, Permission.DELETE_USERS, Permission.UPDATE_USERS,
                Permission.CREATE_ROLE, Permission.DELETE_ROLE, Permission.READ_ROLE, Permission.UPDATE_ROLE,
                Permission.READ_CATEGORY, Permission.DELETE_CATEGORY, Permission.CREATE_CATEGORY, Permission.UPDATE_CATEGORY,
                Permission.CREATE_CITY, Permission.UPDATE_CITY,Permission.DELETE_CITY,Permission.READ_CITY, Permission.READ_BOOKING,
                Permission.CREATE_BOOKING,
                Permission.UPDATE_BOOKING,
                Permission.DELETE_BOOKING, Permission.UPDATE_PROFILE));




        String passCifradaAdmin = cifrador.encode("admin123");


        Location locationAdmin = new Location("confNumberAdmin", "confStreetAdmin");
        User userAdmin = new User("ADMIN", "adminApellido", "admin@gmail.com", passCifradaAdmin, locationAdmin, roleAdmin, true);


        try {
            User savedUserAdmin = userRepository.save(userAdmin);
            System.out.println(savedUserAdmin);
            System.out.println(savedUserAdmin.getRole());
        } catch (Exception e) {
            e.printStackTrace();
        }

//
//        //-----------------------------BASIC USER--------------------------------

        Role roleBasic = new Role();
        roleBasic.setName("BASIC");
        roleBasic.setDescription(" limited permissions ");
        roleBasic.setPermissions(Arrays.asList(
                Permission.UPDATE_USERS,
              Permission.UPDATE_ROLE, Permission.DELETE_ROLE,
             Permission.RATE_EVENTS, Permission.READ_USERS,
                Permission.CREATE_FAVORITES, Permission.DELETE_FAVORITES, Permission.READ_FAVORITES, Permission.READ_CITY, Permission.READ_BOOKING,
                Permission.CREATE_BOOKING,
                Permission.UPDATE_BOOKING,
                Permission.DELETE_BOOKING, Permission.UPDATE_PROFILE));






        String passCifradaBasic= cifrador.encode("basic123");

        Location locationBasic = new  Location("confNumberBasic","confStreetBasic");
        User userBasic= new User("BASIC","basicApellido","basic@gmail.com",passCifradaBasic,locationBasic,roleBasic,true);



        try{

            userRepository.save(userBasic);
            System.out.println( userRepository.findByUsername("basic@gmail.com"));
        }catch (Exception e){
            e.printStackTrace();
        }

//
//        //----------------------------------OWNER USER----------------------------------------------

        Role roleOWNER = new Role();
        roleOWNER.setName("OWNER");
        roleOWNER.setDescription(" reduced administration permissions");
        roleOWNER.setPermissions(Arrays.asList(
                Permission.UPDATE_USERS,
                Permission.DELETE_EVENTS,Permission.CREATE_EVENTS,Permission.UPDATE_EVENTS,Permission.READ_EVENTS,
                Permission.DELETE_ROLE,Permission.UPDATE_ROLE,
                Permission.READ_CATEGORY, Permission.READ_USERS,
                Permission.CREATE_FAVORITES, Permission.DELETE_FAVORITES, Permission.READ_FAVORITES,Permission.READ_CITY, Permission.READ_BOOKING,
                Permission.CREATE_BOOKING,
                Permission.UPDATE_BOOKING,
                Permission.DELETE_BOOKING, Permission.UPDATE_PROFILE));




        String passCifradaOwner= cifrador.encode("owner123");


        Location locationOwner = new  Location("confNumberOwner","confStreetOwner");
        User userOwner= new User("OWNER","OwnerApellido","owner@gmail.com",passCifradaOwner,locationOwner,roleOWNER,true);




        try{

            userRepository.save(userOwner);

            System.out.println( userRepository.findByUsername("owner@gmail.com"));
        }catch (Exception e){
            e.printStackTrace();
        }



    }
}
