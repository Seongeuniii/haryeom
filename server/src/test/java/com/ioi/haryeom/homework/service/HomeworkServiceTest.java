package com.ioi.haryeom.homework.service;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkRequest;
import com.ioi.haryeom.homework.exception.HomeworkStatusException;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.repository.MemberRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class HomeworkServiceTest {

    @Autowired
    private HomeworkService homeworkService;

    @MockBean
    private HomeworkRepository homeworkRepository;
    @MockBean
    private MemberRepository memberRepository;

    private Homework mockHomework;
    private Member mockMember;
    private ExecutorService executorService;

    @BeforeEach
    void setUp() {
        mockHomework = Mockito.mock(Homework.class);
        mockMember = Mockito.mock(Member.class);
        executorService = Executors.newFixedThreadPool(2);
    }

    @AfterEach
    void tearDown() {
        executorService.shutdown();
    }

    @DisplayName("학생이 숙제를 조회하면 선생님은 수정이 불가능하다")
    @Test
    public void whenStudentViewsHomework_TeacherCannotModify() {
        // given
        when(mockHomework.getStatus()).thenReturn(HomeworkStatus.UNCONFIRMED);
        when(mockHomework.isOwner(mockMember)).thenReturn(true);
        doAnswer((Answer<Void>) invocation -> {
            when(mockHomework.getStatus()).thenReturn(HomeworkStatus.IN_PROGRESS);
            return null;
        }).when(mockHomework).confirm();

        Long homeworkId = 1L;
        Long tutoringId = 1L;
        Long teacherMemberId = 1L;
        Mockito.when(homeworkRepository.findById(homeworkId)).thenReturn(Optional.of(mockHomework));
        Mockito.when(memberRepository.findById(teacherMemberId)).thenReturn(Optional.of(mockMember));

        HomeworkRequest request = new HomeworkRequest();
        request.setTextbookId(1L);
        request.setStartPage(10);
        request.setEndPage(20);
        request.setDeadline(LocalDate.of(2024, 2, 20));

        // when
        mockHomework.confirm();

        // then
        assertThrows(HomeworkStatusException.class, () -> {
            homeworkService.updateHomework(tutoringId, homeworkId, request, teacherMemberId);
        });
    }

    @DisplayName("학생과 선생님이 동시에 숙제에 접근하면 수정이 가능하다")
    @Test
    public void whenStudentAndTeacherAccessHomeworkConcurrently_ModificationIsPossible() {
        // given
        when(mockHomework.getStatus()).thenReturn(HomeworkStatus.UNCONFIRMED);
        when(mockHomework.isOwner(mockMember)).thenReturn(true);

        doAnswer((Answer<Void>) invocation -> {
            when(mockHomework.getStatus()).thenReturn(HomeworkStatus.IN_PROGRESS);
            return null;
        }).when(mockHomework).confirm();

        Long homeworkId = 1L;
        Long tutoringId = 1L;
        Long teacherMemberId = 1L;
        Mockito.when(homeworkRepository.findById(homeworkId)).thenReturn(Optional.of(mockHomework));
        Mockito.when(memberRepository.findById(teacherMemberId)).thenReturn(Optional.of(mockMember));

        HomeworkRequest request = new HomeworkRequest();
        request.setTextbookId(1L);
        request.setStartPage(10);
        request.setEndPage(20);
        request.setDeadline(LocalDate.of(2024, 2, 20));

        //when
        executorService.submit(() -> {
            mockHomework.confirm();
        });

        AtomicBoolean exceptionOccurred = new AtomicBoolean(false);

        executorService.submit(() -> {
            try {
                homeworkService.updateHomework(tutoringId, homeworkId, request, teacherMemberId);
            } catch (HomeworkStatusException e) {
                exceptionOccurred.set(true);
            }
        });

        // then
        Assertions.assertFalse(exceptionOccurred.get());
    }

    @DisplayName("Mock 검증 테스트")
    @Test
    public void mockVerificationTest() {
        // given
        when(mockHomework.getStatus()).thenReturn(HomeworkStatus.UNCONFIRMED);

        doAnswer((Answer<Void>) invocation -> {
            when(mockHomework.getStatus()).thenReturn(HomeworkStatus.IN_PROGRESS);
            return null;
        }).when(mockHomework).confirm();

        // when
        mockHomework.confirm();

        // then
        assertEquals(HomeworkStatus.IN_PROGRESS, mockHomework.getStatus());
    }
}
