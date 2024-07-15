package seecovid;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.Map;

public class test {


    public static String request(String httpUrl, String httpArg) {
        BufferedReader reader = null;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        try {
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("User-Agent", "Mozilla/4.76");
            connection.setRequestMethod("GET");
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sbf.append(strRead);
                sbf.append("\r\n");
            }
            reader.close();
            result = sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    public String getConfirm()
    {
        String httpUrl="https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
        String httpArg="";
        String ans = request(httpUrl,httpArg);
        JSONObject jsonObject = JSONObject.parseObject(ans);
        String str=jsonObject.getString("data");
        JSONObject str2=JSONObject.parseObject(str);

        Map<String,Object> map=str2;
        JSONArray  mp1;
        //System.out.println(str2);
        for(Map.Entry<String,Object> entry:map.entrySet()){
            System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());

            if(entry.getKey()=="areaTree")
            {
                Object o1=entry.getValue();
                mp1=(JSONArray) o1;
                for (Iterator iterator = mp1.iterator(); iterator.hasNext();) {//第一级中国
                    Map<String, Object> itemMap = (JSONObject)iterator.next();
                    JSONArray m2=(JSONArray) itemMap.get("children");

                    for (Iterator iterator1 = m2.iterator(); iterator1.hasNext();) {//第二级省
                        Map<String, Object> itemMap1 = (JSONObject)iterator1.next();
                        System.out.println(itemMap1.get("name"));
                        //System.out.println(itemMap1.get("total"));
                        Map<String,Object> province=(Map<String, Object>) itemMap1.get("total");
                        System.out.println(itemMap1.get("name")+"确诊："+province.get("confirm"));
                    }
                    System.out.println(itemMap.get("name"));

                }

            }
        }
        return "a";
    }

    public static void main(String[] args) {
        /**
         * @param urlAll
         *            :请求接口
         * @param httpArg
         *            :参数
         * @return 返回结果
         */

//        String httpUrl="https://c.m.163.com/ug/api/wuhan/app/data/list-total";

        String httpUrl="https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
        String httpArg="";
        String ans = request(httpUrl,httpArg);
        JSONObject jsonObject = JSONObject.parseObject(ans);
        String str=jsonObject.getString("data");
        JSONObject str2=JSONObject.parseObject(str);

        Map<String,Object> map=str2;
        JSONArray  mp1;
        //System.out.println(str2);
        for(Map.Entry<String,Object> entry:map.entrySet()){
            System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());

            if(entry.getKey()=="areaTree")
            {
                Object o1=entry.getValue();
                mp1=(JSONArray) o1;
                for (Iterator iterator = mp1.iterator(); iterator.hasNext();) {//第一级中国
                    Map<String, Object> itemMap = (JSONObject)iterator.next();
                    JSONArray m2=(JSONArray) itemMap.get("children");

                    for (Iterator iterator1 = m2.iterator(); iterator1.hasNext();) {//第二级省
                        Map<String, Object> itemMap1 = (JSONObject)iterator1.next();
                        System.out.println(itemMap1.get("name"));
                        //System.out.println(itemMap1.get("total"));
                        Map<String,Object> province=(Map<String, Object>) itemMap1.get("total");
                        System.out.println(itemMap1.get("name")+"确诊："+province.get("confirm"));
                    }
                    System.out.println(itemMap.get("name"));

                }

            }
        }

    }
}
