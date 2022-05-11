package com.ieung.receipt.controller;

import com.ieung.receipt.dto.req.TagReqDTO;
import com.ieung.receipt.dto.res.TagResDTO;
import com.ieung.receipt.service.TagService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ListResult;
import com.ieung.receipt.service.common.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring")
public class TagController {
    private final TagService tagService;
    private final ResponseService responseService;

    /**
     * 태그 생성 : post /tag
     * 1차 태그 목록 조회 : get /tag/{clubId}
     * 2차 태그 목록 조회 : get /tag/{clubID}/{firstTagName}
     * 태그 삭제 : delete /tag/{clubId}/{tagName}
     */

    // 태그 생성
    @Operation(summary = "태그 생성", description = "태그 생성")
    @PostMapping(value = "/tag", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult createTag(@Valid @RequestBody TagReqDTO tagReqDTO) throws Exception{
        tagService.createTag(tagReqDTO);
        return responseService.getSuccessResult();
    }

    // 1차 태그 목록 조회
    @Operation(summary = "사용가능한 1차 태그 목록 조회", description = "사용가능한 1차 태그 목록 조회")
    @GetMapping(value = "/tag/{clubId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult<TagResDTO> getFirstTag(@PathVariable @NotBlank Long clubId) throws Exception{
        List<TagResDTO> tagResDTOList = tagService.getFirstTag(clubId);
        return responseService.getListResult(tagResDTOList);
    }

    // 2차 태그 목록 조회
    @Operation(summary = "사용가능한 2차 태그 목록 조회", description = "사용가능한 2차 태그 목록 조회")
    @GetMapping(value = "/tag/{clubId}/{firstTagName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult<TagResDTO> getSecondTag(@PathVariable @NotBlank Long clubId, @PathVariable @NotBlank String firstTagName){
        List<TagResDTO> tagResDTOList = tagService.getSecondTag(clubId, firstTagName);
        return responseService.getListResult(tagResDTOList);
    }

    // 태그 삭제
    @Operation(summary = "태그 삭제", description = "태그 삭제")
    @DeleteMapping(value = "/tag/{clubId}/{tagName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult deleteTag(@PathVariable @NotBlank Long clubId, @PathVariable @NotBlank String tagName){
        tagService.deleteTag(clubId, tagName);
        return responseService.getSuccessResult();
    }
}
