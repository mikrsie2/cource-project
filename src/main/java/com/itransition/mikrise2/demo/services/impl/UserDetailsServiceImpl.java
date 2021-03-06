package com.itransition.mikrise2.demo.services.impl;

import com.itransition.mikrise2.demo.entities.User;
import com.itransition.mikrise2.demo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(usernameOrEmail);
        if (user == null)
            user = userRepository.findByEmail(usernameOrEmail);
        if (user == null)
            throw new UsernameNotFoundException("User not found");

        return user;
    }

    public void processOAuthPostLogin(String username) {
        var existUser = userRepository.findByUsername(username);
        if (existUser == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword("new user");
            userRepository.save(newUser);
        }

    }
}

