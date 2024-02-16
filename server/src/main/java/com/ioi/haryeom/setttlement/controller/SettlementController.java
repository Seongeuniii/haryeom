package com.ioi.haryeom.setttlement.controller;

import com.ioi.haryeom.setttlement.dto.SettlementResponse;
import com.ioi.haryeom.setttlement.service.SettlementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/tutoring")
@RequiredArgsConstructor
@RestController
public class SettlementController {

    private final SettlementService settlementService;

    @GetMapping("/{tutoringId}/settlements")
    public ResponseEntity<SettlementResponse> getTutoringSettlement(@PathVariable Long tutoringId, @RequestParam String yearMonth) {
        SettlementResponse response = settlementService.getTutoringSettlement(tutoringId, yearMonth);
        return ResponseEntity.ok(response);
    }
}
