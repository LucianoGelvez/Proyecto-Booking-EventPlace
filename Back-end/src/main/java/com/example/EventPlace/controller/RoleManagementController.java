package com.example.EventPlace.controller;

import com.example.EventPlace.domain.Role;
import com.example.EventPlace.service.implement.RolImplement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/roles")
public class RoleManagementController {


    private RolImplement roleImplement;

    public RoleManagementController(RolImplement roleService) {
        this.roleImplement = roleService;
    }


    @PostMapping
    public ResponseEntity<Role> createRole(@RequestBody Role role)throws IllegalArgumentException {
        try {
            Role createdRole = roleImplement.createRole(role);
            return ResponseEntity.ok(createdRole);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping()
    public ResponseEntity<Role> updateRole(@RequestBody Role updatedRole) {
        try {
            Role updatedUserRole = roleImplement.updateRole(updatedRole);
            return ResponseEntity.ok(updatedUserRole);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{roleName}")
    public ResponseEntity<String> deleteRole(@PathVariable String roleName) {
        try {
            roleImplement.deleteRole(roleName);
            return ResponseEntity.ok("Role deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/{roleName}")
    public ResponseEntity<Role> getRole(@PathVariable String roleName) {
        Role role = roleImplement.findRole(roleName);
        if (role != null) {
            return ResponseEntity.ok(role);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/allRole")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleImplement.findAllRoles();
        return ResponseEntity.ok(roles);
    }

}