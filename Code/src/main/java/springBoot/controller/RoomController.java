package spring_boot.springBoot.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import spring_boot.springBoot.domain.Room;
import spring_boot.springBoot.repos.RoomRepository;

@Controller
public class RoomController {
	@Autowired
	private RoomRepository roomRepository;
	
	@GetMapping("/rooms")
	public String rooms(Model model) {
    	Iterable<Room> rooms = roomRepository.findAll();
    	rooms = roomRepository.findAll();
    	model.addAttribute("rooms", rooms);
		return "rooms";
	}
	
    @GetMapping("/index")
    public String room(Model model) {
    	Room room = roomRepository.findById(Room.activeRoomId).get();
    	model.addAttribute("room", room);
        return "index";
    }

}
