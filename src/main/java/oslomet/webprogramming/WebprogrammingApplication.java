package oslomet.webprogramming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class WebprogrammingApplication {

    final public List<Ticket> allTickets = new ArrayList<>();
    public static void main(String[] args) {
        SpringApplication.run(WebprogrammingApplication.class, args);
    }
    @GetMapping("/save")
    public void saveTicket(Ticket newTicket){
        allTickets.add(newTicket);
    }
    @GetMapping("/getAll")
    public List<Ticket> getAllTickets(){
        return allTickets;
    }
    @GetMapping("/deleteAll")
    public void deleteAll(){
        allTickets.clear();
    }
}
