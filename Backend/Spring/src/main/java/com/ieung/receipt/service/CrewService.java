package com.ieung.receipt.service;

import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.dto.req.SignUpReqDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            log.info("회원가입 시도 : 실패");
            throw new ApiMessageException("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }
    }
}


















































