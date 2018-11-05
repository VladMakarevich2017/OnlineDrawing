package spring_boot.springBoot.repos;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import spring_boot.springBoot.domain.UserLogin;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<UserLogin, Long> {
	List<UserLogin> findByUsername(String username);
}
