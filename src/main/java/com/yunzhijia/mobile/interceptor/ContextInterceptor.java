package com.yunzhijia.mobile.interceptor;

import com.yunzhijia.mobile.auth.GatewayAuth2;
import com.yunzhijia.mobile.vo.UserContext;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ContextInterceptor implements HandlerInterceptor, ApplicationContextAware {
	private static final Logger logger = LoggerFactory.getLogger(ContextInterceptor.class);

	private ApplicationContext applicationContext;

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3) throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3) throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		String ticket = arg0.getParameter("ticket");
		String appId = arg0.getParameter("appId");
		if (StringUtils.isEmpty(ticket) || StringUtils.isEmpty(appId)) {
			throw new RuntimeException("ticket、appId必要参数不能为空！");
		}
		UserContext userContext = null;
		try {
//			logger.debug("ticket: {}, appId: {}", ticket, appId);
			userContext = applicationContext.getBean(GatewayAuth2.class).getUserContext(ticket, appId);
//			logger.debug("userContext: {}", userContext.toString());
		} catch (Exception e) {
			throw new RuntimeException("用户上下文件获取异常，请检查APP.SECRET配置参数！");
		}
		arg0.setAttribute("userContext", userContext);
		return true;
	}

	@Override
	public void setApplicationContext(ApplicationContext arg0) throws BeansException {
		this.applicationContext = arg0;
	}
}