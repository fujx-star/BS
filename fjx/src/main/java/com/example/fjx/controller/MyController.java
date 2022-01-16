package com.example.fjx.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.fjx.bean.*;
import com.example.fjx.service.InfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Controller
public class MyController {

    @Resource
    private InfoService infoService;

    @RequestMapping("/")
    public String re() {
        return "index";
    }

    @ResponseBody
    @RequestMapping("/user")
    public List<InfoBean> user() {
        return infoService.GetAllUser();
    }

    @ResponseBody
    @RequestMapping(value = "signin", method = RequestMethod.POST)
    public Boolean signin(@RequestParam("username") String username, @RequestParam("password") String password) {
        return infoService.SignIn(username, password);
    }

    @ResponseBody
    @RequestMapping(value = "signup", method = RequestMethod.POST)
    public Integer signup(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email) {
        return infoService.SignUp(username, password, email);
    }

    @ResponseBody
    @RequestMapping(value = "myimage", method = RequestMethod.POST)
    public List<String> myimage(@RequestParam("username") String username) {
        return infoService.MyImage(username);
    }

    @ResponseBody
    @RequestMapping(value = "addimage", method = RequestMethod.POST)
    public Integer addimage(@RequestBody List<InfoBean2> my_files) throws IOException {
        return infoService.AddImage(my_files);
    }

    @ResponseBody
    @RequestMapping(value = "taskhall")
    public JSONArray taskhall() {
        return infoService.TaskHall();
    }

    @ResponseBody
    @RequestMapping(value = "viewtask", method = RequestMethod.GET)
    public List<String> viewtask(@RequestParam("tasknum")String tasknum) {
        return infoService.ViewTask(tasknum);
    }

    @ResponseBody
    @RequestMapping(value = "addtask", method = RequestMethod.POST)
    public List<InfoBean5> addtask(@RequestParam("username") String username) {
        return infoService.CanAddTask(username);
    }

    @ResponseBody
    @RequestMapping(value = "claimtask", method = RequestMethod.POST)
    public Boolean claimtask(@RequestParam("tasknum") Integer tasknum, @RequestParam("taskowner") String taskowner) {
        return infoService.ClaimTask(tasknum, taskowner);
    }

    //不知道用什么方法接收时，可以先打印String
    @ResponseBody
    @RequestMapping(value = "releasetask", method = RequestMethod.POST)
    public Boolean releasetask(@RequestBody List<Integer> images) {
        return infoService.RealeaseTask(images);
    }

    @ResponseBody
    @RequestMapping(value = "mytask", method = RequestMethod.POST)
    public List<InfoBean6> mytask(@RequestParam("username") String username) {
        return infoService.MyTask(username);
    }

    @ResponseBody
    @RequestMapping(value = "updateannotation", method = RequestMethod.POST)
    public String updateannotation(@RequestParam("id") Integer id, @RequestParam("annotation") String annotation) {
        return infoService.UpdateAnnotation(id, annotation);
    }

    @ResponseBody
    @RequestMapping(value = "exportimage", method = RequestMethod.GET)
    public Boolean exportimage(@RequestParam("username") String username, @RequestParam("id") Integer id) {
        return infoService.ExportImage(username, id);
    }
}
