package spring_boot.springBoot.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import spring_boot.springBoot.domain.UserLogin;

public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {
	UserLogin findByUsername(String username);
	UserLogin findByActivationCode(String code);
}
