package com.ioi.haryeom.homework.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
public class HomeworkDrawingRequest {

    @Positive
    @NotNull
    private int page;

    @NotNull
    private List<MultipartFile> file;

}
