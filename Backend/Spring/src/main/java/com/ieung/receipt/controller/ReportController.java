package com.ieung.receipt.controller;

import com.ieung.receipt.dto.res.LargeCategoryResDTO;
import com.ieung.receipt.dto.res.ReportResDTO;
import com.ieung.receipt.dto.res.SmallCategoryResDTO;
import com.ieung.receipt.entity.Asset;
import com.ieung.receipt.service.ReportService;
import com.ieung.receipt.service.common.ListResult;
import com.ieung.receipt.service.common.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ieung.receipt.util.TokenUtil.getCurrentCrewId;

@Tag(name = "10. 보고서")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring")
public class ReportController {
    private final ReportService reportService;
    private final ResponseService responseService;

    // 자산현황표 조회
    @Operation(summary = "자산현황표 조회", description = "자산현황표 조회")
    @GetMapping(value = "/{clubId}/report/asset", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult<ReportResDTO> getAsset(@PathVariable @NotNull Long clubId, @RequestParam(value = "date",
                                                       defaultValue = "#{T(java.time.YearMonth).now()}") @DateTimeFormat(pattern = "yyyy-MM") YearMonth date) {
        List<Asset> list = reportService.getAsset(clubId, getCurrentCrewId(), date);

        if (list == null || list.size() == 0) {
            return responseService.getListResult(null);
        } else {
            Map<String, Map<String, List<SmallCategoryResDTO>>> map = new HashMap<>();
            List<ReportResDTO> result = new ArrayList<>();

            for (Asset asset : list) {
                String type = asset.getType();
                String lcName = asset.getLcName();
                String scName = asset.getAscName();

                if (map.containsKey(type)) {
                    if (map.get(type).containsKey(lcName)) {
                        map.get(type).get(lcName).add(SmallCategoryResDTO.builder().scName(scName).balance(asset.getBalance()).build());
                    } else {
                        List<SmallCategoryResDTO> smallList = new ArrayList<>();
                        smallList.add(SmallCategoryResDTO.builder().scName(scName).balance(asset.getBalance()).build());
                        map.get(type).put(lcName, smallList);
                    }
                } else {
                    Map<String, List<SmallCategoryResDTO>> newMap = new HashMap<>();
                    List<SmallCategoryResDTO> smallList = new ArrayList<>();
                    smallList.add(SmallCategoryResDTO.builder().scName(scName).balance(asset.getBalance()).build());
                    newMap.put(lcName, smallList);
                    map.put(type, newMap);
                }
            }

            for (String type : map.keySet()) {
                List<LargeCategoryResDTO> largeList = new ArrayList<>();

                for (String lcName : map.get(type).keySet()) {
                    largeList.add(LargeCategoryResDTO.builder().lcName(lcName).list(map.get(type).get(lcName)).build());
                }

                result.add(ReportResDTO.builder().type(type).list(largeList).build());
            }

            return responseService.getListResult(result);
        }
    }
}
