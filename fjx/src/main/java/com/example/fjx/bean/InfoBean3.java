package com.example.fjx.bean;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Map;

public class InfoBean3 {

    private String uploader;

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public Integer getTasknum() {
        return tasknum;
    }

    public void setTasknum(Integer tasknum) {
        this.tasknum = tasknum;
    }

    private Integer tasknum;

}
