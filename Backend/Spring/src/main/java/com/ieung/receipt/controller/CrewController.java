package com.ieung.receipt.controller;

import com.ieung.receipt.dto.req.LoginReqDTO;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.dto.req.TokenReqDTO;
import com.ieung.receipt.dto.res.TokenResDTO;
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
import javax.validation.constraints.NotBlank;

@Tag(name = "01. 회원")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring/crew")
public class CrewController {
    private final CrewService crewService;
    private final ResponseService responseService;

    /**
     * 회원가입 일반 : post /signup
     * 이메일 중복 확인 : get /check-email/{email}
     */

    // 회원가입
    @Operation(summary = "회원가입", description = "회원가입")
    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult signUp(@Valid @RequestBody SignUpReqDTO signUpReqDTO) throws Exception {

        if (crewService.findByEmail(signUpReqDTO.getEmail()) != null) {
            throw new ApiMessageException("중복된 email을 가진 회원이 존재합니다.");
        }

        crewService.signUp(signUpReqDTO);

        return responseService.getSuccessResult();
    }

    // 이메일 중복 확인
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 확인")
    @GetMapping(value = "/check-email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<Boolean> checkEmail(@PathVariable @NotBlank String email) throws Exception {
        if (crewService.findByEmail(email) == null) {
            return responseService.getSingleResult(false);
        } else {
            return responseService.getSingleResult(true);
        }
    }

    // 로그인
    @Operation(summary = "로그인", description = "로그인")
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<TokenResDTO> login(@Valid @RequestBody LoginReqDTO loginReqDTO) throws Exception {
        TokenResDTO tokenResDTO = crewService.login(loginReqDTO);

        return responseService.getSingleResult(tokenResDTO);
    }

    // 토큰 재발급
    @Operation(summary = "토큰 재발급", description = "accessToken 만료시 refreshToken으로 토큰 재발급")
    @PutMapping(value = "/token", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<TokenResDTO> reissue(@Valid @RequestBody TokenReqDTO tokenReqDTO) throws Exception {
        TokenResDTO tokenResDTO = crewService.reissue(tokenReqDTO);

        return responseService.getSingleResult(tokenResDTO);
    }

    // 회원 정보 수정
    @Operation(summary = "정보 수정", description = "회원 정보 (이름) 수정")
    @PutMapping(value = "/info", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult changeCrewInfo(@RequestParam(value="name") @NotBlank String name) throws Exception {
        crewService.changeCrewInfo(name);

        return responseService.getSuccessResult();
    }
}
