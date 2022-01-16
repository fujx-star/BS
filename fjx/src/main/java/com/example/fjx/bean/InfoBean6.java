package com.example.fjx.bean;

import java.util.List;

public class InfoBean6 {
    private String uploader;
    private String image;
    private Integer id;

    public InfoBean6(String uploader, String image, Integer id) {
        this.uploader = uploader;
        this.image = image;
        this.id = id;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
