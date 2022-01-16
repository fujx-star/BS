package com.example.fjx.bean;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.databind.annotation.JsonAppend;

public class InfoBean4 {

    @JSONField(name = "uploader")
    private String uploader;
    @JSONField(name = "tasknum")
    private Integer tasknum;
    @JSONField(name = "qty")
    private Integer qty;

    public InfoBean4(String uploader, Integer tasknum, Integer qty) {
        this.uploader = uploader;
        this.tasknum = tasknum;
        this.qty = qty;
    }

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

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }
}
