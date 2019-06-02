package com.polytech.polytrello.config;

import com.mysql.cj.jdbc.MysqlDataSource;
import com.polytech.polytrello.business.*;
import com.polytech.polytrello.repository.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class AppConfig {


    @Bean
    DataSource datasource() {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/polyChatDB?serverTimezone=UTC");
        dataSource.setUser("polyChatUser");
        dataSource.setPassword("polyChatPassword");
        dataSource.setDatabaseName("polyChatDB");

        return dataSource;
    }

    @Bean
    UserRepository userRepository(){
        return new JpaUserRepository();
    }

    @Bean
    RegisterService registerService(){
        return new RegisterServiceImpl(userRepository());
    }

    @Bean
    TaskRepository taskRepository(){
        return new JpaTaskRepository();
    }
    @Bean
    TaskService taskService(){
        return new TaskServiceImpl(taskRepository());
    }
}
