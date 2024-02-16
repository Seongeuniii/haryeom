package com.ioi.haryeom.matching.document;

import com.ioi.haryeom.common.dto.SubjectResponse;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document
public class MatchingResult {

    @Id //_id
    private ObjectId id;
    private Long chatRoomId;
    private Boolean isAccepted;
    private Long teacherMemberId;
    private String teacherName;
    private Long studentMemberId;
    private String studentName;
    private SubjectResponse subject;
    private Integer hourlyRate;

    @Builder
    public MatchingResult(Matching matching, Boolean isAccepted) {
        this.chatRoomId = matching.getChatRoomId();
        this.isAccepted = isAccepted;
        this.teacherMemberId = matching.getRecipientMemberId();
        this.studentMemberId = matching.getSenderMemberId();
        this.teacherName = matching.getRecipientName();
        this.studentName = matching.getSenderName();
        this.subject = matching.getSubject();
        this.hourlyRate = matching.getHourlyRate();
    }
}