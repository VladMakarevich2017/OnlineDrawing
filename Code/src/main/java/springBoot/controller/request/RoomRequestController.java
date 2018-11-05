package spring_boot.springBoot.controller.request;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import spring_boot.springBoot.domain.Room;
import spring_boot.springBoot.domain.UserLogin;
import spring_boot.springBoot.repos.RoomRepository;

@Controller
@RequestMapping(value="/rooms")
public class RoomRequestController {
	@Autowired
	private RoomRepository roomRepository;
	
	@RequestMapping(params = "add", method = RequestMethod.POST)
	public String addRoom(HttpServletRequest request , Map<String, Object> model) {
        Room room = new Room("room");
        roomRepository.save(room);
        renameRoomDependingOnTheId(room);
        Iterable<Room> rooms = roomRepository.findAll();
        model.put("rooms", rooms);
	    return "redirect:/rooms";
	}
	
	public void renameRoomDependingOnTheId(Room room) {
        room.setName("room" + room.getId().toString());
        roomRepository.save(room);
	}
	
	@RequestMapping(params = "trash", method = RequestMethod.POST)
	public String trashRoom(HttpServletRequest request, @RequestParam(value = "inlineCheckbox", required=false) List<String> idrates) {
		deleteIdratesById(idrates);
	    return "redirect:/rooms";
	}
	
	public void deleteIdratesById(List<String> idrates) {
		idrates.forEach(new Consumer<String>() {
			public void accept(String idrate) {
				roomRepository.deleteById(Long.parseLong(idrate));
			}
		});
	}
	
	@RequestMapping(params = "connect", method = RequestMethod.POST)
	public String roomConnect(HttpServletRequest request) {
		Room.activeRoomId = Integer.parseInt(request.getParameter("connect"));
	    return "redirect:/index";
	}

}
