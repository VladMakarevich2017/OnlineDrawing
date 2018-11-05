package spring_boot.springBoot.controller.request;

import java.util.List;
import java.util.function.Consumer;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import spring_boot.springBoot.repos.UserRepository;

@Controller
@RequestMapping(value="/main")
public class ToolbarRequestController {
	@Autowired
	private UserRepository userRepo;
	
	@RequestMapping(params = "lock", method = RequestMethod.POST)
	public String lockUser(HttpServletRequest request, @RequestParam(value = "inlineCheckbox", required=false) List<String> idrates) {
		lockUsersById(idrates);
	    return "redirect:/main";
	}
	
	public void lockUsersById(List<String> idrates) {
		idrates.forEach(new Consumer<String>() {
			public void accept(String idrate) {
				userRepo.findById(Long.parseLong(idrate)).get().setLockStatus(true);
				userRepo.save(userRepo.findById(Long.parseLong(idrate)).get());
			}
		});
	}
	
	@RequestMapping(params = "unlock", method = RequestMethod.POST)
	public String unlockUser(HttpServletRequest request, @RequestParam(value = "inlineCheckbox", required=false) List<String> idrates) {
		unlockUsersById(idrates);
	    return "redirect:/main";
	}
	
	public void unlockUsersById(List<String> idrates) {
		idrates.forEach(new Consumer<String>() {
			public void accept(String idrate) {
				userRepo.findById(Long.parseLong(idrate)).get().setLockStatus(false);
				userRepo.save(userRepo.findById(Long.parseLong(idrate)).get());
			}
		});
	}
	
	@RequestMapping(params = "trash", method = RequestMethod.POST)
	public String trashUser(HttpServletRequest request, @RequestParam(value = "inlineCheckbox", required=false) List<String> idrates) {
		deleteUsersById(idrates);
	    return "redirect:/main";
	}
	
	public void deleteUsersById(List<String> idrates) {
		idrates.forEach(new Consumer<String>() {
			public void accept(String idrate) {
				userRepo.deleteById(Long.parseLong(idrate)); 	
			}
		});
	}
	
}
