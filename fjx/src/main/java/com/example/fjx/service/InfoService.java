package com.example.fjx.service;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.fjx.bean.*;
import com.example.fjx.mapper.InfoMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;


@Service
public class InfoService {

    @Resource
    private InfoMapper infoMapper;
    //警告！程序每次重新启动时任务序号将归零！
    public Integer taskNum = 0;

    public List<InfoBean> GetAllUser() {
        return infoMapper.getAllUser();
    }

    public Boolean SignIn(String username, String password) {
        for(InfoBean i:infoMapper.getAllUser()) {
            if(Objects.equals(username, i.getUsername()) && Objects.equals(password, i.getPassword())) {
                return true;
            }
        }
        return false;
    }

    public Integer SignUp(String username, String password, String email) {
        Pattern pattern = Pattern.compile("^[0-9a-z]+\\w*@([0-9a-z]+\\.)+[0-9a-z]+$");
        if(username.length() <= 6) {
            return 1;
        }
        else if(password.length() <= 6) {
            return 2;
        }
        else if(!pattern.matcher(email).matches()) {
            return 3;
        }
        else {
            for(InfoBean i:infoMapper.getAllUser()) {
                if(Objects.equals(username, i.getUsername())) {
                    return 4;
                }
                if(Objects.equals(email, i.getEmail())) {
                    return 5;
                }
            }
            if(infoMapper.signUp(username, password, email) != 1) {
                return 6;
            }
            else {
                return 0;
            }
        }
    }

    public Integer AddImage(List<InfoBean2> my_files) throws IOException {
        int addImages = 0;
        for (InfoBean2 my_file : my_files) {
            InputStream inputStream = null;
            OutputStream outputStream = null;
            File inFile = new File("C:\\Users\\Administrator\\Pictures\\"+my_file.getName());
            File outFile = new File("E:\\react\\BS\\react1\\src\\image\\"+my_file.getUploader()+"\\"+ my_file.getName());
            File fileParent = outFile.getParentFile();
            if(!fileParent.exists()){
                fileParent.mkdirs();
            }
            outFile.createNewFile();
            try {
                inputStream = new FileInputStream(inFile);
                outputStream = new FileOutputStream(outFile);
                byte[] buf = new byte[1024];
                int bytesRead;
                while((bytesRead = inputStream.read(buf)) > 0) {
                    outputStream.write(buf, 0, bytesRead);
                }
                outputStream.flush();
                inputStream.close();
                outputStream.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
                return 0;
            }
            addImages += infoMapper.addImage(my_file.getName(), my_file.getUploader());
        }
        return addImages;
    }

    public List<String> MyImage(String username) {
        return infoMapper.myImage(username);
    }

    public JSONArray TaskHall() {
        JSONArray jsonArray = new JSONArray();
        HashMap<String, HashMap<Integer, Integer>> map = new HashMap<>();
        for(InfoBean3 infoBean3:infoMapper.taskHall()) {
            String uploader = infoBean3.getUploader();
            Integer tasknum = infoBean3.getTasknum();
            if(tasknum != 0) {
                if(map.containsKey(uploader)) {
                    if(map.get(uploader).containsKey(tasknum)) {
                        int qty = map.get(uploader).get(tasknum);
                        qty++;
                        map.get(uploader).put(tasknum, qty);
                    }
                    else {
                        map.get(uploader).put(tasknum, 1);
                    }
                }
                else {
                    map.put(uploader, new HashMap<>());
                    map.get(uploader).put(tasknum, 1);
                }
            }
        }
        for(String name:map.keySet()) {
            HashMap<Integer, Integer> hashMap = map.get(name);
            for(Integer integer:hashMap.keySet()) {
                jsonArray.add(JSON.toJSON(new InfoBean4(name, integer, hashMap.get(integer))));
            }
        }
        return jsonArray;
    }

    public List<String> ViewTask(String tasknum) {
        return infoMapper.viewTask(tasknum);
    }

    public List<InfoBean5> CanAddTask(String username) {
        return infoMapper.canAddTask(username);
    }

    public Boolean ClaimTask(Integer tasknum, String taskowner) {
        return infoMapper.claimTask(tasknum, taskowner) > 0;
    }


    //会用到任务序号，所以谨慎谨慎再谨慎
    public Boolean RealeaseTask(List<Integer> images) {
        Integer modify = 0;
        if(images.size() == 0) {
            return false;
        }
        for(Integer image:images) {
            modify += infoMapper.releaseTask(taskNum, image);
        }
        if(modify == images.size()) {
            taskNum++;
            return true;
        }
        else {
            return false;
        }
    }

    public List<InfoBean6> MyTask(String username) {
        return infoMapper.myTask(username);
    }

    public String UpdateAnnotation(Integer id, String annotation) {
        String pre = infoMapper.getAnnotation(id);
        String post;
        if(annotation.length() == 0) {
            return "should not be empty!";
        }
        else {
            if(pre == null) {
                post = annotation+";";
            }
            else {
                post = pre+annotation+";";
            }
        }
        if(infoMapper.updateAnnotation(id, post) == 1) {
            return post;
        }
        else {
            return "failed!";
        }
    }

    public Boolean ExportImage(String username, Integer id) {
        String annotation = infoMapper.getAnnotation(id);
        String name = infoMapper.getImage(id);
        String path = "C:\\Users\\Administrator\\Documents\\bs\\"+username+"\\"+name+".json";
        Date date = new Date();
        SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd :hh:mm:ss");

        Map<String, String> map = new HashMap<>();
        map.put("date", dateFormat.format(date));
        map.put("name", name);
        if(annotation == null) {
            map.put("isAnnotated", "false");
            map.put("annotation", "");
        }
        else {
            map.put("isAnnotated", "true");
            map.put("annotation", annotation);
        }
        JSONObject jsonObject = (JSONObject) JSONObject.toJSON(map);
        String jsonString = jsonObject.toJSONString();
        try {
            File file = new File(path);
            if(!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            if(file.exists()) {
                file.delete();
            }
            file.createNewFile();
            Writer write = new OutputStreamWriter(new FileOutputStream(file), StandardCharsets.UTF_8);
            write.write(jsonString);
            write.flush();
            write.close();
        } catch (IOException ioException) {
            ioException.printStackTrace();
            return false;
        }
        return true;
    }
}

