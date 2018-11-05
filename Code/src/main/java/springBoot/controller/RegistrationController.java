package spring_boot.springBoot.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import spring_boot.springBoot.domain.Role;
import spring_boot.springBoot.domain.UserLogin;
import spring_boot.springBoot.service.UserLoginService;

@Controller
public class RegistrationController {
	@Autowired
	private UserLoginService userLoginService;
	
	@GetMapping("/registration")
	public String registration() {
		return "registration";
	}
	
	@PostMapping("/registration")
	public String addUserLogin(UserLogin userLogin, Map<String, Object> model) {
        if (!userLoginService.addUserLogin(userLogin)) {
            model.put("user", "User exists!");
            return "registration";
        }
		return "redirect:/login";
	}
	
	@GetMapping("/activate/{code}")
    public String activate(Model model, @PathVariable String code) {
        boolean isActivated = userLoginService.activateUserLogin(code);
        addModelAttributesDependingOnTheActivated(isActivated, model);
        return "login";
    }
	
	public void addModelAttributesDependingOnTheActivated(boolean isActivated, Model model) {
        if (isActivated) {
            model.addAttribute("message", "User successfully activated");
        } else {
            model.addAttribute("message", "Activation code is not found!");
        }
	}
}
