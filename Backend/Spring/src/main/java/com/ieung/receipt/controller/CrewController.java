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
    @GetMapping(value = "/checkEmail/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<Boolean> checkEmail(@PathVariable @NotBlank String email) throws Exception {
        if (crewService.findByEmail(email) == null) {
            return responseService.getSingleResult(false);
        } else {
            return responseService.getSingleResult(true);
        }
    }

    // 회원 정보 수정
    @Operation(summary = "정보 수정", description = "회원 정보 (이름) 수정")
    @PutMapping(value = "/info", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult changeCrewInfo(@RequestParam(value="name") @NotBlank String name) throws Exception {
        crewService.changeCrewInfo(name);

        return responseService.getSuccessResult();
    }
}
