package spring_boot.springBoot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "room")
public class Room {

	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="room_generator")
    @SequenceGenerator(name="room_generator", sequenceName = "room_seq", allocationSize=1)
    private Long id;
    
    private String name;
    
    @Column(columnDefinition="LONGTEXT", name="IMAGE")
    private String image;
    
    public static long activeRoomId;
    
    public Room() {
    }
    
    public Room(String name) {
    	this.name = name;
    }

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
