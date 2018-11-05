package spring_boot.springBoot.controller.request;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import spring_boot.springBoot.domain.Room;
import spring_boot.springBoot.repos.RoomRepository;

@Controller
@RequestMapping(value="/index")
public class CanvasRequestController {
	@Autowired
	private RoomRepository roomRepository;
	
	@RequestMapping(method = RequestMethod.POST)
	public String renameRoom(HttpServletRequest request, @RequestParam(name = "room-name") String name, @RequestParam(name = "room-name-field") String newName) {
		Room room = roomRepository.findByName(name);
		room.setName(newName);
		roomRepository.save(room);
		return "redirect:/index";
	}

}
