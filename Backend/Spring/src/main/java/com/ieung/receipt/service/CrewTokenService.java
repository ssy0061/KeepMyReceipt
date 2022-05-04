package com.ieung.receipt.service;

import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.config.security.JwtTokenProvider;
import com.ieung.receipt.dto.req.LoginReqDTO;
import com.ieung.receipt.dto.req.TokenReqDTO;
import com.ieung.receipt.dto.res.TokenResDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.entity.CrewToken;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.exception.CUserNotFoundException;
import com.ieung.receipt.repository.CrewRepository;
import com.ieung.receipt.repository.CrewTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewTokenService {
    private final CrewRepository crewRepository;
    private final CrewTokenRepository crewTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 로그인
     * @param email, password, fcmToken
     * @return TokenResDTO (accessToken, refreshToken)
     * @throws Exception
     */
    @Transactional(readOnly = false)
    public TokenResDTO login(String email, String password, String fcmToken) throws Exception {
        Crew crew = crewRepository.findByEmail(email);
        if (crew == null) {
            throw new CUserNotFoundException();
        }

        if (!passwordEncoder.matches(password, crew.getPassword())) {
            throw new ApiMessageException("비밀번호를 잘못 입력하였습니다.");
        }

        // 토큰 발급
        List<String> list = crew.getRoles();
        TokenResDTO tokenResDTO = jwtTokenProvider.createToken(String.valueOf(crew.getId()), list);

        // 모든 회원을 대상으로 해당 기기로 로그인한 기록이 있는지 확인
        CrewToken crewToken = crewTokenRepository.findByFcmToken(fcmToken);
        // 해당 회원을 대상으로  해당 기기로 로그인한 기록이 있는지 확인
        CrewToken myCrewToken = crewTokenRepository.findByCrewIdAndFcmToken(crew.getId(), fcmToken);

        // 기존 로그인 내역이 없으면 새로 생성
        if (myCrewToken == null) {
            myCrewToken = CrewToken.builder()
                    .crew(crew)
                    .isAllowedPush(YNCode.Y)
                    .fcmToken(fcmToken).build();
        }

        myCrewToken.updateRefreshToken(tokenResDTO.getRefreshToken());
        crewTokenRepository.save(myCrewToken);

        // 다른 회원이 해당 기기로 로그인한 기록이 있으면 refreshToken null 처리
        if (crewToken != null && crewToken.getCrew().getId() != crew.getId()) {
            crewToken.updateRefreshToken(null);
            crewTokenRepository.save(crewToken);
        }

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

        Crew crew = crewRepository.findById(Long.parseLong(jwtTokenProvider.getUserPk(tokenReqDTO.getAccessToken())))
                                    .orElseThrow(() -> new CUserNotFoundException());

        // DB에 토큰이 저장된 토큰인지 확인
        CrewToken crewToken = crewTokenRepository.findByCrewIdAndRefreshToken(crew.getId(), tokenReqDTO.getRefreshToken())
                                                    .orElseThrow(() -> new ApiMessageException("refreshToken이 일치하지 않습니다."));

        // 토큰 재발급
        TokenResDTO tokenResDTO = jwtTokenProvider.createToken(String.valueOf(crew.getId()),
                jwtTokenProvider.getUserRoles(tokenReqDTO.getAccessToken()));
        crewToken.updateRefreshToken(tokenResDTO.getRefreshToken());
        crewTokenRepository.save(crewToken);

        return tokenResDTO;
    }
}
