package com.itransition.mikrise2.demo.controllers;

import com.itransition.mikrise2.demo.entities.*;
import com.itransition.mikrise2.demo.entities.enums.CompanyType;
import com.itransition.mikrise2.demo.entities.enums.UserRole;
import com.itransition.mikrise2.demo.repositories.CompanyRepository;
import com.itransition.mikrise2.demo.repositories.UserRepository;
import com.itransition.mikrise2.demo.services.CloudinaryService;
import com.itransition.mikrise2.demo.services.CompanyEditingService;
import com.itransition.mikrise2.demo.services.UserEditingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
@Controller
public class LoginAndRegistrationController {
    @Autowired
    private CompanyEditingService companyEditingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    //TODO
    //TODO
    //TODO

    private final UserEditingService userEditingService;

    @GetMapping("/registration")
    public String getRegistrationPage() {
//        var user = userEditingService.getUserByUserName("1");
//        userEditingService.deleteUser(user);


        return "registration";
    }

    @PostMapping("/registration")
    public String acceptRegistration(User userHTML, @RequestParam("file") MultipartFile file, Map<String, Object> model) {
        userHTML.setActive(true);
        userHTML.setUserRole(UserRole.USER);
        String url = cloudinaryService.uploadFile(file);
        userHTML.setPhotoUrl(url);

        if (userEditingService.saveUser(userHTML))
            return "redirect:/login";
        else {
            model.put("error", "User exists!");
            return "registration";
        }
    }


}
