package spring_boot.springBoot.service;

import java.util.Collections;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;

import spring_boot.springBoot.domain.Role;
import spring_boot.springBoot.domain.UserLogin;
import spring_boot.springBoot.repos.UserLoginRepository;

@Service
public class UserLoginService implements UserDetailsService {
	@Autowired
	private UserLoginRepository userLoginRepository;
	
	@Autowired
	private MailSender mailSender;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return (UserDetails) userLoginRepository.findByUsername(username);
	}
	
	public boolean activateUserLogin(String code) {
		UserLogin userLogin = userLoginRepository.findByActivationCode(code);
		if(userLogin == null) return false;
		userLogin.setActivationCode(null);
		userLoginRepository.save(userLogin);
		return true;
	}
	
	public boolean addUserLogin(UserLogin userLogin)  {
		UserLogin userLoginFromDB = userLoginRepository.findByUsername(userLogin.getUsername());
		if(userLoginFromDB != null) return false;
		userLoginSetParametres(userLogin);
        userLoginRepository.save(userLogin);
        sendMailMessageByStringUtilsEmpty(userLogin);
        return true;
	}
	
	public void sendMailMessageByStringUtilsEmpty(UserLogin userLogin) {
        if(!StringUtils.isEmpty(userLogin.getEmail())) {
        	sendMailMessage(userLogin);
        }
	}
	
	public void sendMailMessage(UserLogin userLogin) {
        String message = String.format(
                "Hello, %s! \n" +
                        "Please, visit next link: http://localhost:8080/activate/%s",
                userLogin.getUsername(),
                userLogin.getActivationCode()
        );
    	mailSender.send(userLogin.getEmail(), "Activation code", message);
	}
	
	public void userLoginSetParametres(UserLogin userLogin) {
        userLogin.setActive(true);
        userLogin.setRoles(Collections.singleton(Role.USER));
        userLogin.setActivationCode(UUID.randomUUID().toString());
	}

}
