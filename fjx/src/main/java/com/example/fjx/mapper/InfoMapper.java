package com.example.fjx.mapper;

import com.example.fjx.bean.InfoBean;
import com.example.fjx.bean.InfoBean3;
import com.example.fjx.bean.InfoBean5;
import com.example.fjx.bean.InfoBean6;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface InfoMapper {
    List<InfoBean> getAllUser();
    Integer signUp(String username, String password, String email);
    List<String> myImage(String username);
    Integer addImage(String name, String uploader);
    List<InfoBean3> taskHall();
    List<String> viewTask(String tasknum);
    List<InfoBean5> canAddTask(String username);
    Integer claimTask(Integer tasknum, String taskowner);
    Integer releaseTask(Integer tasknum, Integer image);
    List<InfoBean6> myTask(String username);
    String getAnnotation(Integer id);
    Integer updateAnnotation(Integer id, String annotation);
    String getImage(Integer id);
}
