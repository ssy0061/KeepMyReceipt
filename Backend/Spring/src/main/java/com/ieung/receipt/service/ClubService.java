package com.ieung.receipt.service;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.code.StateCode;
import com.ieung.receipt.dto.req.ClubReqDTO;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.entity.Club;
import com.ieung.receipt.entity.ClubCrew;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.ClubCrewRepository;
import com.ieung.receipt.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {
    private final ClubRepository clubRepository;
    private final ClubCrewRepository clubCrewRepository;

    /**
     * 모임 생성
     * @param crew, groupReqDTO
     */
    @Transactional(readOnly = false)
    public void createClub(Crew crew, ClubReqDTO groupReqDTO) {
        // DB에 저장할 Group Entity 세팅
        Club group = Club.builder()
                .name(groupReqDTO.getName())
                .description(groupReqDTO.getDescription())
                .build();

        Club resGroup = clubRepository.save(group);
        if (resGroup == null) {
            throw new ApiMessageException("그룹 생성에 실패했습니다. 다시 시도해 주세요.");
        }

        // DB에 저장할 Crew (Leader) Entity 세팅
        ClubCrew clubCrew = ClubCrew.builder()
                .club(resGroup)
                .crew(crew)
                .auth(AuthCode.L) // 리더
                .state(StateCode.A) // 승인 완료
                .build();

        ClubCrew resClubCrew = clubCrewRepository.save(clubCrew);
        if (resClubCrew == null) {
            throw new ApiMessageException("그룹 생성에 실패했습니다. 다시 시도해 주세요.");
        }
    }

    /**
     * 특정 모임 조회
     * @param clubId
     */
    public Club getClub(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new ApiMessageException("존재하지 않는 모임입니다."));

        return club;
    }

    /**
     * 모임 목록 검색
     * @param name, pageable
     */
    public Page<Club> getClubs(String name, Pageable pageable) {

        return clubRepository.findAllByName(name, pageable);
    }

    /**
     * 모임 삭제
     * @param crewId, clubId
     */
    @Transactional(readOnly = false)
    public void deleteClub(Long crewId, Long clubId) {
        ClubCrew clubCrew = clubCrewRepository.findByCrewIdAndClubId(crewId, clubId)
                                                 .orElseThrow(() -> new ApiMessageException("가입된 모임이 아닙니다."));

        if (clubCrew.getAuth() == AuthCode.L) {
            Long clubCrewCnt = clubCrewRepository.findApprovedCountByClubId(clubId);

            if (clubCrewCnt > 1) {
                new ApiMessageException("회원 수가 1일때만 삭제할 수 있습니다.");
            } else {
                clubCrewRepository.delete(clubCrew);
                clubRepository.delete(clubCrew.getClub());
            }
        } else {
            throw new ApiMessageException("리더만 삭제할 수 있습니다.");
        }
    }

    /**
     * 모임 정보 수정
     * @param crewId, clubId, clubReqDTO
     */
    @Transactional(readOnly = false)
    public void updateClub(Long crewId, Long clubId, ClubReqDTO clubReqDTO) {
        ClubCrew clubCrew = clubCrewRepository.findByCrewIdAndClubId(crewId, clubId)
                                                 .orElseThrow(() -> new ApiMessageException("가입된 모임이 아닙니다."));

        if (clubCrew.getAuth() == AuthCode.L) {
            Club club = clubCrew.getClub();
            club.updateName(clubReqDTO.getName());
            club.updateDescription(clubReqDTO.getDescription());
            clubRepository.save(club);
        } else {
            throw new ApiMessageException("리더만 수정할 수 있습니다.");
        }
    }
}