package com.ieung.receipt.controller;

import com.ieung.receipt.dto.req.LoginReqDTO;
import com.ieung.receipt.dto.req.TokenReqDTO;
import com.ieung.receipt.dto.res.TokenResDTO;
import com.ieung.receipt.service.CrewTokenService;
import com.ieung.receipt.service.common.ResponseService;
import com.ieung.receipt.service.common.SingleResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "02. 토큰")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring/crew")
public class CrewTokenController {
    private final CrewTokenService crewTokenService;
    private final ResponseService responseService;

    // 로그인
    @Operation(summary = "로그인", description = "로그인")
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    SingleResult<TokenResDTO> login(@Valid @RequestBody LoginReqDTO loginReqDTO) throws Exception {
        TokenResDTO tokenResDTO = crewTokenService.login(loginReqDTO.getEmail(), loginReqDTO.getPassword(), loginReqDTO.getFcmToken());

        return responseService.getSingleResult(tokenResDTO);
    }

    // 토큰 재발급
    @Operation(summary = "토큰 재발급", description = "accessToken 만료시 refreshToken으로 토큰 재발급")
    @PutMapping(value = "/token/reissue", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<TokenResDTO> reissue(@Valid @RequestBody TokenReqDTO tokenReqDTO) throws Exception {
        TokenResDTO tokenResDTO = crewTokenService.reissue(tokenReqDTO);

        return responseService.getSingleResult(tokenResDTO);
    }
}
