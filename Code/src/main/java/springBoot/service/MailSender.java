package spring_boot.springBoot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSender {
	@Autowired
	private JavaMailSender mailSender;
	
    @Value("${spring.mail.username}")
    private String username;
	
    public void send(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        setMailMessageParametres(mailMessage, emailTo, subject, message);
        mailSender.send(mailMessage);
    }
    
    public void setMailMessageParametres(SimpleMailMessage mailMessage, String emailTo, String subject, String message) {
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
    }
}
