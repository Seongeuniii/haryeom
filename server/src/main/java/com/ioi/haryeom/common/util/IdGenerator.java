package com.ioi.haryeom.common.util;

import java.util.UUID;

public class IdGenerator {

    public static String createMatchingId() {
        return UUID.randomUUID().toString();
    }
}
