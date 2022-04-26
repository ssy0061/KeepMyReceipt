package com.ieung.receipt.controller;

import com.ieung.receipt.config.security.JwtTokenProvider;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.service.CrewService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ResponseService;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.service.common.SingleResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "01. ")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring/crew")
public class CrewController {
    private final CrewService crewService;
    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 로그인 : get /login
     * 회원가입 일반 : post /signup
     * 회원가입 후 프로필등록 : post /regProfile
     * 소셜 가입 여부 체크 : get /exists/social
     */

    // 회원가입
    @Operation(summary = "회원가입", description = "회원가입")
    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult signUp(@Valid @RequestBody SignUpReqDTO signUpReqDTO) throws Exception {
        log.info("회원가입 시도 : {}", signUpReqDTO.toString());

        if (crewService.findByEmail(signUpReqDTO.getEmail()) != null) {
            log.info("회원가입 시도 : 실패 (중복 email 존재) : email : {}", signUpReqDTO.getEmail());
            throw new ApiMessageException("중복된 email을 가진 회원이 존재합니다.");
        }

        crewService.crewSignUp(signUpReqDTO);

        log.info("회원가입 시도 : 성공 : 이메일 : {}", signUpReqDTO.getEmail());
        return responseService.getSuccessResult();
    }

    // 이메일 중복 확인
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 확인")
    @GetMapping(value = "/email/check/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<Boolean> checkEmail(@PathVariable String email) throws Exception {
        log.info("이메일 중복 확인 시도 : 이메일 : {}", email);

        if (crewService.findByEmail(email) == null) {
            log.info("이메일 중복 확인 시도 : 성공 : 중복 여부 : {}", false);
            return responseService.getSingleResult(false);
        } else {
            log.info("이메일 중복 확인 시도 : 성공 : 중복 여부 : {}", true);
            return responseService.getSingleResult(true);
        }
    }

    // 이메일 인증
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 확인")
    @GetMapping(value = "/email/certify", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult certifyEmail(@RequestParam(value = "crewId") long id,
                                                   @RequestParam(value = "authKey") String authKey) throws Exception {
        log.info("이메일 인증 시도 : 인증키 : {}", authKey);

        Crew crew = crewService.findCrewById(id);
        crewService.certifyEmail(crew, authKey);

        log.info("이메일 인증 시도 : 성공 : 아이디 : {}", id);
        return responseService.getSuccessResult();
    }
}
