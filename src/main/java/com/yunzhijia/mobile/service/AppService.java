package com.yunzhijia.mobile.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yunzhijia.mobile.auth.GatewayAuth2;
import com.yunzhijia.mobile.vo.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppService {
	@Autowired
	private GatewayAuth2 gatewayAuth2;
	@Value("${YUNZHIJIA.GATEWAY.HOST}")
	private String gatewayHost;
	@Value("${LOCAL.HOST}")
	private String localHost;
	@Value("${APP.SECRET}")
	private String appSecret;

	public JSONObject getUserInfo(UserContext userContext) throws Exception {
		gatewayAuth2.checkValid(userContext);
		JSONObject jsonObject = this.getPerson(userContext);
		JSONObject ret = new JSONObject();
		ret.put("photoUrl", jsonObject.getString("photoUrl").concat("&spec=100"));
		ret.put("userName", jsonObject.getString("name"));
		ret.put("deptName", jsonObject.getString("department"));
		ret.put("openId", userContext.getOpenid());
		ret.put("userId", userContext.getUserid()); ret.put("eid", userContext.getEid());
		ret.put("appId", userContext.getAppid());
		return ret;
	}
	
	public void todoAction(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		String url = gatewayHost.concat("/newtodo/open/action.json?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		String appId = userContext.getAppid(), openId = userContext.getOpenid();
		Map actiontype = new HashMap(3);
        actiontype.put("read", 1);
        actiontype.put("deal", 1);
        Map parameters = new HashMap(4);
        parameters.put("sourcetype", appId);
        parameters.put("sourceitemid", "jzyj2eeappdemo");
        List<String> openIds = new ArrayList<String>(1);
        openIds.add(openId);
        parameters.put("openids", openIds);
        parameters.put("actiontype", actiontype);
        System.out.println(JSONObject.toJSONString(parameters));
        gatewayAuth2.gatewayRequestJson(url, JSONObject.toJSONString(parameters));
	}
	
	public void sendTodo(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		JSONObject jsonObject = this.getPerson(userContext);
		String url = gatewayHost.concat("/newtodo/open/generatetodo.json?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		String appId = userContext.getAppid(), openId = userContext.getOpenid();
		Map parameters = new HashMap(9);
        Map status = new HashMap(2);
        status.put("READ", 0);
        status.put("DO", 0);
        Map target = new HashMap();
        target.put("openId", openId);
        target.put("status", status);
        List<Map> targets = new ArrayList<Map>(1);
        targets.add(target);
        parameters.put("sourceId", "jzyj2eeappdemo");
        parameters.put("appId", appId);
        parameters.put("senderId", openId);        
        parameters.put("content", "[轻应用Demo演示]".concat(jsonObject.getString("name")).concat("的请假单据需要您审批"));        
        parameters.put("url", localHost.concat("/approvalstatus.html?t=approval-result"));
        parameters.put("title", "轻应用Demo演示");
        parameters.put("itemtitle", null);
        parameters.put("headImg", "https://yunzhijia.com/appsys/download.action?filename=".concat(appId).concat(".png&type=9"));
        parameters.put("params", targets);
        System.out.println(JSONObject.toJSONString(parameters));
        gatewayAuth2.gatewayRequestJson(url, JSONObject.toJSONString(parameters));
	}
	
	public JSONObject getPerson(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		String url = gatewayHost.concat("/opendata-control/data/getperson?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		Map parameters = new HashMap(2);
		parameters.put("openId", userContext.getOpenid());
		parameters.put("eid", userContext.getEid());
		String ret = gatewayAuth2.gatewayRequest(url, parameters);
		return JSONObject.parseObject(ret).getJSONArray("data").getJSONObject(0);
	}
	
	public JSONObject getOrgPersons(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		JSONObject jsonObject = this.getPerson(userContext);
		String url = gatewayHost.concat("/opendata-control/data/getorgpersons?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		Map parameters = new HashMap(2);
		parameters.put("orgId", jsonObject.getString("orgId"));
		parameters.put("eid", userContext.getEid());
		parameters.put("begin", "0");
		parameters.put("count", "10");
		String ret = gatewayAuth2.gatewayRequest(url, parameters);
		return JSONObject.parseObject(ret).getJSONObject("data");
	}
	
	public JSONObject getCompany(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		JSONObject jsonObject = this.getPerson(userContext);
		String url = gatewayHost.concat("/opendata-control/data/getcompany?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		Map parameters = new HashMap(2);
		parameters.put("orgId", jsonObject.getString("orgId"));
		parameters.put("eid", userContext.getEid());
		String ret = gatewayAuth2.gatewayRequest(url, parameters);
		return JSONObject.parseObject(ret).getJSONObject("data");
	}
	
	public JSONArray getAllOrgs(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		String url = gatewayHost.concat("/opendata-control/data/getallorgs?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		Map parameters = new HashMap(2);
		parameters.put("eid", userContext.getEid());
		parameters.put("begin", "0");
		parameters.put("count", "10");
		String ret = gatewayAuth2.gatewayRequest(url, parameters);
		return JSONObject.parseObject(ret).getJSONArray("data");
	}
	
	public JSONObject getOrg(UserContext userContext) throws Exception {
		String scope = "app";
		gatewayAuth2.checkValid(userContext);
		JSONObject jsonObject = this.getPerson(userContext);
		String url = gatewayHost.concat("/opendata-control/data/getorg?accessToken=").concat(gatewayAuth2.getAccessToken(userContext.getAppid(), appSecret, null, scope));
		Map parameters = new HashMap(2);
		parameters.put("orgId", jsonObject.getString("orgId"));
		parameters.put("eid", userContext.getEid());
		String ret = gatewayAuth2.gatewayRequest(url, parameters);
		return JSONObject.parseObject(ret).getJSONObject("data");
	}
}