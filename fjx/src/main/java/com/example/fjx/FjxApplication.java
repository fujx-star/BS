package com.example.fjx;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.fjx.mapper")
@SpringBootApplication
public class FjxApplication {

    public static void main(String[] args) {
        SpringApplication.run(FjxApplication.class, args);
    }

}
