package com.example.EventPlace.service.implement;

import com.example.EventPlace.domain.Role;
import com.example.EventPlace.repository.RolRepository;
import com.example.EventPlace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RolImplement {

    private RolRepository roleRepository;

    private  UserRepository userRepository;



    @Autowired
    public RolImplement(RolRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public Role createRole(Role role) throws IllegalArgumentException{

        if (roleRepository.existsByName(role.getName())) {
            throw new IllegalArgumentException("Role with the same name already exists");
        }
      Role role1= roleRepository.save(role);
        System.out.println(role1);
        return role1;
    }


    public Role updateRole(Role updatedRole) {
        Role existingRole = roleRepository.findById(updatedRole.getId()).get();

        if (existingRole == null) {
            throw new IllegalArgumentException("Role was not found");
        } else if (existingRole.getName().isEmpty() || existingRole.getPermissions().isEmpty() || existingRole.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Empty spaces");
        }


        Role savedRole = roleRepository.save(existingRole);
        return savedRole;
    }

    public void deleteRole(String roleName) {
        Role existingRole = roleRepository.findByName(roleName);

        if (existingRole == null) {
            throw new IllegalArgumentException("Role not found");
        }

        roleRepository.delete(existingRole);
    }

    public Role findRole(String roleName) {
        return roleRepository.findByName(roleName);
    }

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}
