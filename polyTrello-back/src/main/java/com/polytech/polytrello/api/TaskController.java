package com.polytech.polytrello.api;

import com.polytech.polytrello.business.TaskService;
import com.polytech.polytrello.repository.Task;
import com.polytech.polytrello.repository.TaskRepository;
import com.polytech.polytrello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Le controlleur des tâches à faire
 * J'utilse des hashMap pour retourner des réponse
 * json
 * @author Mama
 *
 */

@CrossOrigin(origins = "http://mamadembele.fr:5000")
@RestController
public class TaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TaskRepository taskRepository;

    @PostMapping("/addTask/{username}")
    public HashMap<String, String> addTask(
            @RequestParam("title") String title,
            @PathVariable("username") String username){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, String> response = new HashMap<>();
        if(!auth.getName().equals(username)){
            response.put("status", "error");
            return response;
        }
        try {
            taskService.save(new Task(title, new Date(), username));
            response.put("status", "success");
        }catch (Exception e){
            System.out.println(e.getMessage());
            response.put("status", "error");
        }
        return response;
    }

    /**
     * La route
     * @param username
     * @return
     */

    @GetMapping("/getTasks/{username}")
    public List getTasks(@PathVariable("username") String username, HttpServletResponse response){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!auth.getName().equals(username)){
            List list = new ArrayList();
            list.add(-1);
            return list;
        }
        return taskService.getTasks(username);
    }

    @PutMapping("/modifyTask/{id}")
    public HashMap<String, String> modifyTask(
            @PathVariable("id") long id,
            @RequestParam("title") String title,
            @RequestParam("done") boolean done
    ){
        HashMap<String, String> response = new HashMap<>();
        Task task = taskRepository.findTaskById(id);
        if (task == null){
            response.put("status", "error");
            return response;
        }else{
            task.setTitle(title);
            task.setDate(new Date());
            task.setDone(done);
            try {
                taskService.save(task);
                response.put("status", "success");
            }catch (Exception e){
                response.put("status", "error");
            }
            return response;
        }
    }

    @DeleteMapping("/deleteTask/{id}")
    public HashMap<String, String> modifyTask(@PathVariable("id") long id){
        HashMap<String, String> response = new HashMap<>();
       try {
           taskService.deleteTask(id);
            response.put("status", "success");
       }catch (Exception e){
           System.out.println(e.getMessage());
           response.put("status", "error");
       }
        return response;
    }


}
