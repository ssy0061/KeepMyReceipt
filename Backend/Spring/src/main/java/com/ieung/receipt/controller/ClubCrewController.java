package com.ieung.receipt.controller;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.dto.res.ClubCrewResDTO;
import com.ieung.receipt.dto.res.CrewReqsResDTO;
import com.ieung.receipt.dto.res.PagingListResDTO;
import com.ieung.receipt.entity.ClubCrew;
import com.ieung.receipt.entity.Crew;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.service.ClubCrewService;
import com.ieung.receipt.service.CrewService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ResponseService;
import com.ieung.receipt.service.common.SingleResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.ieung.receipt.util.TokenUtil.getCurrentCrewId;

@Tag(name = "04. 모임 회원")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring/club")
public class ClubCrewController {
    private final CrewService crewService;
    private final ClubCrewService clubCrewService;
    private final ResponseService responseService;

    /**
     * 모임 가입 요청 : post /{clubId}/crew
     * 모임 가입 신청 리스트 조회 : get /{clubId}/crews/request?page=0&size=10&sort=id,ASC
     * 모임 가입 승인 : put /crew/{clubCrewId}/request
     * 모임 가입 거절 : delete /crew/{clubCrewId}/request
     * 모임별 회원 리스트 조회 : get /{clubId}/crews?page=0&size=10&sort=id,ASC
     */

    // 모임 가입 신청
    @Operation(summary = "모임 가입 신청", description = "모임 가입 신청")
    @PostMapping(value = "/{clubId}/crew", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult joinClub(@PathVariable @NotBlank long clubId) throws Exception {
        Crew crew = crewService.findCrewById(getCurrentCrewId());
        clubCrewService.joinClub(clubId, crew);
        // 알림 주는 로직 추가 예정

        return responseService.getSuccessResult();
    }

    // 모임 가입 신청 리스트 조회
    @Operation(summary = "모임 가입 신청 리스트 조회", description = "모임 가입 신청 리스트 조회")
    @GetMapping(value = "/{clubId}/crews/request", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<PagingListResDTO<CrewReqsResDTO>> getRequestClubCrews(@PathVariable @NotBlank long clubId,
                                                                       @ParameterObject @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws Exception {
        Page<ClubCrew> page = clubCrewService.getRequestClubCrews(clubId, getCurrentCrewId(), pageable);

        // 반환 DTO에 맞도록 가공
        List<CrewReqsResDTO> clubCrews = IntStream.range(0, page.getContent().size())
                .mapToObj(i -> page.getContent().get(i).toCrewReqsResDTO())
                .collect(Collectors.toList());

        PagingListResDTO pagingListResDTO = PagingListResDTO.builder()
                .pageNumber(page.getNumber())
                .totalPages(page.getTotalPages())
                .numberOfElements(page.getNumberOfElements())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .list(Collections.singletonList(clubCrews))
                .build();

        // 알림 주는 로직 추가 예정


        return responseService.getSingleResult(pagingListResDTO);
    }

    // 모임 가입 승인
    @Operation(summary = "모임 가입 승인", description = "모임 가입 승인")
    @PutMapping(value = "crew/{clubCrewId}/request", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult approveClubCrew(@PathVariable @NotBlank long clubCrewId) throws Exception {
        clubCrewService.approve(clubCrewId, getCurrentCrewId());
        // 알림 주는 로직 추가 예정

        return responseService.getSuccessResult();
    }

    // 모임 가입 거절
    @Operation(summary = "모임 가입 거절", description = "모임 가입 거절")
    @DeleteMapping(value = "crew/{clubCrewId}/request", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult refuseClubCrew(@PathVariable @NotBlank long clubCrewId) throws Exception {
        clubCrewService.refusal(clubCrewId, getCurrentCrewId());
        // 알림 주는 로직 추가 예정

        return responseService.getSuccessResult();
    }

    // 모임별 회원 리스트 조회
    @Operation(summary = "모임별 회원 리스트 조회", description = "모임별 회원 리스트 조회")
    @GetMapping(value = "/{clubId}/crews", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SingleResult<PagingListResDTO<ClubCrewResDTO>> getClubCrews(@PathVariable @NotBlank long clubId,
                                                                                     @ParameterObject @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws Exception {
        Page<ClubCrew> page = clubCrewService.getClubCrews(clubId, getCurrentCrewId(), pageable);

        // 반환 DTO에 맞도록 가공
        List<ClubCrewResDTO> clubCrews = IntStream.range(0, page.getContent().size())
                .mapToObj(i -> page.getContent().get(i).toClubCrewResDTO())
                .collect(Collectors.toList());

        PagingListResDTO pagingListResDTO = PagingListResDTO.builder()
                .pageNumber(page.getNumber())
                .totalPages(page.getTotalPages())
                .numberOfElements(page.getNumberOfElements())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .list(Collections.singletonList(clubCrews))
                .build();

        // 알림 주는 로직 추가 예정

        return responseService.getSingleResult(pagingListResDTO);
    }

    // 모임별 회원 관리자 권한 지정
    @Operation(summary = "모임별 회원 관리자 권한 지정", description = "모임별 회원 관리자 권한 지정")
    @PutMapping(value = "crew/{clubCrewId}/auth/{auth}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult updateClubCrewAuth(@PathVariable @NotBlank long clubCrewId, @PathVariable @NotBlank String auth) throws Exception {
        try {
            AuthCode authCode = AuthCode.valueOf(auth);

            switch (authCode) {
                case LEADER:
                    // 위임 로직 추가 예정
                    //clubCrewService.toLeader(clubCrewId, getCurrentCrewId());
                    throw new ApiMessageException("지원하지 않는 권한입니다.");
                case MANAGER:
                    clubCrewService.toManager(clubCrewId, getCurrentCrewId());
                    break;
                case NORMAL:
                    clubCrewService.toNormal(clubCrewId, getCurrentCrewId());
                    break;
                case NONE:
                    // 강퇴 로직 추가 예정
                    throw new ApiMessageException("지원하지 않는 권한입니다.");
            }

        } catch (IllegalArgumentException iae) {
            throw new ApiMessageException("지원하지 않는 권한입니다.");
        }

        // 알림 주는 로직 추가 예정

        return responseService.getSuccessResult();
    }
}
