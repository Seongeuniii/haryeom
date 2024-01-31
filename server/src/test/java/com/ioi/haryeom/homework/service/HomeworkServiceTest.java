package com.ioi.haryeom.homework.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.repository.MemberRepository;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
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
