package com.ioi.haryeom.setttlement.service;

import com.ioi.haryeom.setttlement.dto.ScheduleProgressResponse;
import com.ioi.haryeom.setttlement.dto.SettlementResponse;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SettlementService {

    private final TutoringRepository tutoringRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    public SettlementResponse getTutoringSettlement(Long tutoringId, String yearMonth) {

        Tutoring tutoring = tutoringRepository.findById(tutoringId).orElseThrow(() -> new TutoringNotFoundException(tutoringId));
        List<Object[]> results = tutoringScheduleRepository.findScheduleProgressByTutoringIdAndMonthNative(tutoringId, yearMonth);
        List<ScheduleProgressResponse> scheduleProgresses = new ArrayList<>();
        int totalProgressTime = 0;
        for (Object[] result : results) {
            LocalDate scheduleDate = ((java.sql.Date) result[0]).toLocalDate();
            String title = (String) result[1];
            int progressTime = ((Number) result[2]).intValue();
            scheduleProgresses.add(new ScheduleProgressResponse(scheduleDate, title, progressTime));
            totalProgressTime += progressTime;
        }
        Integer tutoringFee = totalProgressTime * (tutoring.getHourlyRate() / 60);
        return new SettlementResponse(scheduleProgresses, scheduleProgresses.size(), tutoring.getHourlyRate(), totalProgressTime, tutoringFee);
    }
}
