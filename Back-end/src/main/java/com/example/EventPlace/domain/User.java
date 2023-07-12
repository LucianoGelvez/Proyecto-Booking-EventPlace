package com.example.EventPlace.domain;

import com.example.EventPlace.emailToken.ConfirmationToken;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.util.*;


@NoArgsConstructor
@Entity
@Setter
@Getter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastName;
    private String username;
    private String password;
    private String nationalID;
    private String profileImage;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id",referencedColumnName = "id")
    private Location location;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "city_id",referencedColumnName = "id")
    private City city;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Rate> listRate = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "user_favorite",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_place_id"))
    private Set<EventPlace> listFavorites = new HashSet<>();


    private Boolean enabled = false;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "confirmationToken_id",referencedColumnName = "id")
    private ConfirmationToken confirmationToken;

    @OneToMany(mappedBy = "ownerUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<EventPlace> eventPlaces = new HashSet<>();

    public User(String name, String lastName, String username, String password, Location location, Role role, Boolean enabled) {
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.location = location;
        this.role = role;
        this.enabled = enabled;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) {
            return Collections.emptyList();
        }

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Permission permission : role.getPermissions()) {
            authorities.add(new SimpleGrantedAuthority(permission.toString()));
        }
        return authorities;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

