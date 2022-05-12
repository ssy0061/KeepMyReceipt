package com.ieung.receipt.service;

import com.ieung.receipt.dto.res.LCategoryResDTO;
import com.ieung.receipt.entity.LCategory;
import com.ieung.receipt.repository.LCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private LCategoryRepository lCategoryRepository;

    /**
     * 대분류 조회
     */
    public List<LCategoryResDTO> getLCategory(){
        List<LCategory> lCategoryList = lCategoryRepository.findAll();
        List<LCategoryResDTO> lCategoryResDTOList = new ArrayList<>();
        for(LCategory lCategory : lCategoryList){
            lCategoryResDTOList.add(lCategory.toLCategoryResDTO());
        }
        return lCategoryResDTOList;
    }

    /**
     * 대분류 생성
     * @Param l
     */
}
