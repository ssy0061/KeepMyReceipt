package com.ieung.receipt.service;

import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewService {
    private final CrewRepository crewRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    /**
     * crewId로 회원정보 조회
     * @param id
     * @return crew
     * @throws Exception
     */
    public Crew findCrewById(long id) throws Exception {
        Crew crew = crewRepository.findById(id).orElseThrow(() -> new ApiMessageException("존재하지 않는 회원정보입니다."));

        return crew;
    }

    /**
     * email로 Crew 조회
     * @param email
     * @return crew
     * @throws Exception
     */
    public Crew findByEmail(String email) throws Exception {
        return crewRepository.findByEmail(email);
    }

    /**
     * 회원가입
     * @param signUpReqDTO
     */
    @Transactional(readOnly = false)
    public void crewSignUp(SignUpReqDTO signUpReqDTO) {
        String authKey = RandomStringUtils.randomAlphanumeric(6);

        // DB에 저장할 Crew Entity 세팅
        Crew crew = Crew.builder()
                .email(signUpReqDTO.getEmail())
                .password(passwordEncoder.encode(signUpReqDTO.getPassword()))
                .name(signUpReqDTO.getName())
                .isAllowedPush(YNCode.Y)
                .authKey(authKey)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        Crew signUpCrew = crewRepository.save(crew);

        if (signUpCrew == null) {
            log.info("회원가입 시도 : 실패");
            throw new ApiMessageException("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }

        mailService.mailSend(signUpReqDTO.getEmail(), authKey, crew.getId());
    }

    /**
     * 이메일 중복 확인
     * @param crew, authKey
     * @throws Exception
     */
    @Transactional(readOnly = false)
    public void certifyEmail(Crew crew, String authKey) throws Exception {
        if (crew.getAuthKey().equals("Y")) {
            log.info("이메일 인증 시도 : 실패 (이미 인증된 회원)");
            throw new ApiMessageException("이미 인증된 회원입니다.");
        } else if (!crew.getAuthKey().equals(authKey)) {
            log.info("이메일 인증 시도 : 실패 (인증 코드 불일치)");
            throw new ApiMessageException("인증코드가 일치하지 않습니다.");
        } else {
            log.info("이메일 인증 시도 : 성공");
            crew.updateAuthKey("Y");
            crewRepository.save(crew);
        }
    }
}


















































