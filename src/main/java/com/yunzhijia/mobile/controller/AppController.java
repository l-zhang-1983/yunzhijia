package com.yunzhijia.mobile.controller;

import com.alibaba.fastjson.JSONObject;
import com.yunzhijia.mobile.controller.base.BaseController;
import com.yunzhijia.mobile.service.AppService;
import com.yunzhijia.mobile.vo.UserContext;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("/app")
public class AppController extends BaseController {
	private Logger logger = LoggerFactory.getLogger(AppController.class);
	@Autowired
	private AppService appService;
	private enum REQUEST_TYPE {
		GETUSERINFO, SENDTODO, GETPERSON, GETORGPERSONS, GETCOMPANY, GETALLORGS, GETORG, TODOACTION
	}
	@RequestMapping(value = "/request", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object doRequest(HttpServletRequest request) {
		Map<String, Object> response = this.initMessage();
		REQUEST_TYPE requestType = REQUEST_TYPE.valueOf(request.getParameter("reqName").toUpperCase());
		UserContext userContext = (UserContext) request.getAttribute("userContext");
		try {
			switch (requestType) {
			case GETUSERINFO:
				response.put("data", appService.getUserInfo(userContext));
				break;
			case SENDTODO:
				appService.sendTodo(userContext);
				break;
			case GETPERSON:
				response.put("data", appService.getPerson(userContext));
				break;
			case GETORGPERSONS:
				response.put("data", appService.getOrgPersons(userContext));
				break;
			case GETCOMPANY:
				response.put("data", appService.getCompany(userContext));
				break;
			case GETALLORGS:
				response.put("data", appService.getAllOrgs(userContext));
				break;
			case GETORG:
				response.put("data", appService.getOrg(userContext));
				break;
			case TODOACTION:
				appService.todoAction(userContext);
				break;
			default:
				break;
			}
		} catch (Exception e) {
			String errMsg = "信息处理异常！";
			if(StringUtils.isNotEmpty(e.getLocalizedMessage())) errMsg = e.getMessage();
			logger.error(errMsg, e);
			this.ERROR(errMsg, 1001, response);
		} finally {
			logger.info("结果输出：".concat(JSONObject.toJSONString(response)));
		}
		return response;
	}
}