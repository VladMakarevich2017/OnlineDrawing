package spring_boot.springBoot.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import spring_boot.springBoot.domain.Room;
import spring_boot.springBoot.domain.UserLogin;

public interface RoomRepository extends JpaRepository<Room, Long> {
	Room findByName(String username);
}
