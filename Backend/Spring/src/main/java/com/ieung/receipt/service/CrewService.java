package com.ieung.receipt.service;

import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.config.security.JwtTokenProvider;
import com.ieung.receipt.dto.req.LoginReqDTO;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.dto.req.TokenReqDTO;
import com.ieung.receipt.dto.res.TokenResDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.exception.CUserNotFoundException;
import com.ieung.receipt.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.ieung.receipt.util.TokenUtil.getCurrentCrewId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewService {
    private final CrewRepository crewRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * crewId로 회원정보 조회
     * @param id
     * @return crew
     * @throws Exception
     */
    public Crew findCrewById(long id) throws Exception {
        Crew crew = crewRepository.findById(id).orElseThrow(() -> new CUserNotFoundException());

        return crew;
    }

    /**
     * email로 Crew 조회
     * @param email
     * @return crew
     * @throws Exception
     */
    public Crew findByEmail(String email) throws Exception {
        Crew crew = crewRepository.findByEmail(email);

        return crew;
    }

    /**
     * 회원가입
     * @param signUpReqDTO
     */
    @Transactional(readOnly = false)
    public void signUp(SignUpReqDTO signUpReqDTO) {
        // DB에 저장할 Crew Entity 세팅
        Crew crew = Crew.builder()
                .email(signUpReqDTO.getEmail())
                .password(passwordEncoder.encode(signUpReqDTO.getPassword()))
                .name(signUpReqDTO.getName())
                .isAllowedPush(YNCode.Y)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        Crew signUpCrew = crewRepository.save(crew);

        if (signUpCrew == null) {
            throw new ApiMessageException("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }
    }

    /**
     * 로그인
     * @param loginReqDTO
     * @return TokenResDTO (accessToken, refreshToken)
     * @throws Exception
     */
    @Transactional(readOnly = false)
    public TokenResDTO login(LoginReqDTO loginReqDTO) throws Exception {
        Crew crew = findByEmail(loginReqDTO.getEmail());
        if (crew == null) {
            throw new CUserNotFoundException();
        }

        if (!passwordEncoder.matches(loginReqDTO.getPassword(), crew.getPassword())) {
            throw new ApiMessageException("비밀번호를 잘못 입력하였습니다.");
        }

        // 토큰 발급
        List<String> list = Arrays.asList("ROLE_USER");
        TokenResDTO tokenResDTO = jwtTokenProvider.createToken(String.valueOf(crew.getId()), list);

        crew.updateRefreshToken(tokenResDTO.getRefreshToken());
        crewRepository.save(crew);

        return tokenResDTO;
    }

    /**
     * 토큰 재발급
     * @param tokenReqDTO
     * @return TokenResDTO (accessToken, refreshToken)
     * @throws Exception
     */
    @Transactional(readOnly = false)
    public TokenResDTO reissue(TokenReqDTO tokenReqDTO) throws Exception {
        if (!jwtTokenProvider.validateToken(tokenReqDTO.getRefreshToken())) {
            throw new ApiMessageException("refreshToken이 유효하지 않습니다.");
        }

        Crew crew = findCrewById(Long.parseLong(jwtTokenProvider.getUserPk(tokenReqDTO.getAccessToken())));

        // DB에 저장된 토큰과의 일치 여부 확인
        if (crew.getRefreshToken().equals(tokenReqDTO.getRefreshToken())) {
            TokenResDTO tokenResDTO = jwtTokenProvider.createToken(String.valueOf(crew.getId()),
                                                                    jwtTokenProvider.getUserRoles(tokenReqDTO.getAccessToken()));
            crew.updateRefreshToken(tokenResDTO.getRefreshToken());
            crewRepository.save(crew);

            return tokenResDTO;
        } else {
            throw new ApiMessageException("refreshToken이 일치하지 않습니다.");
        }
    }

    /**
     * 회원 정보 수정 (이름)
     * @param name 바꿀 이름
     * @return crew
     * @throws Exception
     */
    @Transactional(readOnly = false)
    public void changeCrewInfo(String name) throws Exception {
        Crew crew = findCrewById(getCurrentCrewId());

        crew.updateName(name);
        crewRepository.save(crew);
    }
}


















































