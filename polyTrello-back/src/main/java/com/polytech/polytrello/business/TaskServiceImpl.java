package com.polytech.polytrello.business;

import com.polytech.polytrello.repository.Task;
import com.polytech.polytrello.repository.TaskRepository;

import java.util.List;

public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @Override
    public void save(Task task) {
        this.taskRepository.save(task);
    }

    @Override
    public List<Task> getTasks(String username) {
        return this.taskRepository.getTasks(username);
    }

    @Override
    public void deleteTask(long id) {
        this.taskRepository.deleteTask(id);
    }
}
