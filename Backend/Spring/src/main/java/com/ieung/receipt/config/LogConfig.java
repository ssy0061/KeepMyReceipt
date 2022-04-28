package com.ieung.receipt.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.StringJoiner;
import java.util.stream.Stream;

@Slf4j
@Component
@Aspect
// 요청이 들어오면 로그 출력
public class LogConfig {
    @Pointcut("execution(* com.ieung.receipt.controller.*.*(..))")  // 이런 패턴이 실행될 경우 수행
    public void loggerPointCut() {

    }

    @Around("loggerPointCut()")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable { // 2
        Class clazz = pjp.getTarget().getClass();
        Object result = null;
        try {
            result = pjp.proceed(pjp.getArgs());
            return result;
        } finally {
            log.info(getRequestUrl(pjp, clazz));
            log.info("parameters" + params(pjp));
            log.info("response: " + result, true);
        }

//        String params = getRequestParams(); // request 값 가져오기
//
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//        String bodys = getBody(request);
//
//        long startAt = System.currentTimeMillis();
//
//
//        String className = pjp.getSignature().getDeclaringTypeName();
//        log.info("+++ REQUEST Param +++ {}({}) => {} {}", className.substring(className.lastIndexOf(".") + 1), pjp.getSignature().getName(), params, bodys);
//
//        Object result = pjp.proceed(); // 4
//
//        long endAt = System.currentTimeMillis();
//
//        log.info("+++ RESPONSE Param +++ {}({}) = {} ({}ms)", pjp.getSignature().getDeclaringTypeName(),
//                                                             pjp.getSignature().getName(), result, endAt - startAt);
//
//        return result;
    }

    private String getRequestUrl(JoinPoint joinPoint, Class clazz) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        RequestMapping requestMapping = (RequestMapping) clazz.getAnnotation(RequestMapping.class);
        String baseUrl = requestMapping.value()[0];

        String url = Stream.of( GetMapping.class, PutMapping.class, PostMapping.class,
                        PatchMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(mappingClass -> method.isAnnotationPresent(mappingClass))
                .map(mappingClass -> getUrl(method, mappingClass, baseUrl))
                .findFirst().orElse(null);
        return url;
    }

    /* httpMETHOD + requestURI 를 반환 */
    private String getUrl(Method method, Class<? extends Annotation> annotationClass, String baseUrl){
        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod = null;
        try {
            value = (String[])annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            return null;
        }
        return String.format("%s %s%s", httpMethod, baseUrl, value.length > 0 ? value[0] : "") ;
    }

    /* printing request parameter or request body */
    private Map params(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        return params;
    }

//  private String getBody(@RequestBody HttpServletRequest request) throws IOException {
//      String body = null;
//      StringBuilder stringBuilder = new StringBuilder();
//      BufferedReader bufferedReader = null;
//
//      InputStream inputStream = request.getInputStream();
//      if (inputStream != null) {
//          bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
//          char[] charBuffer = new char[128];
//          int bytesRead = -1;
//          while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
//              stringBuilder.append(charBuffer, 0, bytesRead);
//          }
//      } else {
//          stringBuilder.append("");
//      }
//
//      body = stringBuilder.toString();
//      return body;
//  }
//
//  // Get request values
//  private String getRequestParams() throws IOException {
//
//    String params = "";
//    StringJoiner sj = new StringJoiner(",");
//
//    RequestAttributes requestAttributes = RequestContextHolder
//        .getRequestAttributes(); // 3
//
//    if (requestAttributes != null) {
//      HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
//          .getRequestAttributes()).getRequest();
//
//      Map<String, String[]> paramMap = request.getParameterMap();
//      if (!paramMap.isEmpty()) {
//          for (Entry<String, String[]> entry : paramMap.entrySet()) {
//                String name = entry.getKey();
//                String[] values = entry.getValue();
//                sj.add(name + "=" + Arrays.toString(values));
//          }
//        params = sj.toString();
//      }
//    }
//
//    return params;
//  }
}