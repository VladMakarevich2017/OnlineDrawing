package spring_boot.springBoot.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import spring_boot.springBoot.domain.UserLogin;
import spring_boot.springBoot.repos.UserRepository;

@Controller
public class MainController {
	@Autowired
	private UserRepository userRepo;

    @GetMapping("/")
    public String greeting(Map<String, Object> model) {
        return "greeting";
    }
    
    @GetMapping("/main")
    public String main(@RequestParam(required = false, defaultValue = "") String filter, Model model) {
    	Iterable<UserLogin> users = userRepo.findAll();
    	searchForUsers(filter);
    	addModelAttributes(model, users, filter);
    	return "main";
    }
    
    public Iterable<UserLogin> searchForUsers(String filter) {
    	if (filter != null && !filter.isEmpty()) {
        	return userRepo.findByUsername(filter);
        } else {
        	return userRepo.findAll();
        }
    }
    
    public void addModelAttributes(Model model, Iterable<UserLogin> users, String filter) {
    	model.addAttribute("users", users);
    	model.addAttribute("filter", filter);
    }
       
}