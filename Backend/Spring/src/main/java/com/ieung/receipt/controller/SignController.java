package com.ieung.receipt.controller;

import com.ieung.receipt.code.JoinCode;
import com.ieung.receipt.code.MFCode;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.config.security.JwtTokenProvider;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.dto.res.UserIdResDTO;
import com.ieung.receipt.service.SignService;
import com.ieung.receipt.service.common.ResponseService;
import com.ieung.receipt.service.common.SingleResult;
import com.ieung.receipt.entity.User;
import com.ieung.receipt.exception.ApiMessageException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

@Tag(name = "02. 가입")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/sign")
public class SignController {
    private final SignService signService;
    private final PasswordEncoder passwordEncoder;
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
    public @ResponseBody SingleResult<UserIdResDTO> userSignUp(@Valid @RequestBody SignUpReqDTO req) throws Exception {

        log.info("회원가입 요청" + req.getUid());

        // uid 중복되는 값이 존재하는지 확인 (uid = 고유한 값)
        User uidChk = signService.findByUid(req.getUid(), YNCode.Y);
        if (uidChk != null)
            throw new ApiMessageException("중복된 uid값의 회원이 존재합니다.");

        // DB에 저장할 User Entity 세팅
        User user = User.builder()
                .joinType(JoinCode.valueOf(req.getType()))
                .uid(req.getUid())
                .password(passwordEncoder.encode(req.getPassword()))
                .name(req.getName() == null ? "" : req.getName())
                .email  (req.getEmail() == null ? "" : req.getEmail())
                .phone(req.getPhone())
                .address(req.getAddress())
                .addressDetail(req.getAddressDetail())

                // 가입 후 프로필 등록으로 받을 데이터는 우선 기본값으로 세팅
                .age(0)
                .img("")
                .nickname("")
                .gender(MFCode.NULL)

                // 기타 필요한 값 세팅
                .push(YNCode.Y)
                .isBind(YNCode.Y)
                .roles(Collections.singletonList("ROLE_USER")) // 인증된 회원인지 확인하기 위한 JWT 토큰에 사용될 데이터
                .build();

        // 회원가입 (User Entity 저장)
        long userId = signService.userSignUp(user);
        // 저장된 User Entity의 PK가 없을 경우 (저장 실패)
        if(userId <= 0)
            throw new ApiMessageException("회원가입에 실패했습니다. 다시 시도해 주세요.");

        return responseService.getSingleResult(UserIdResDTO.builder().id(userId).build());
    }
}
