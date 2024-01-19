INSERT INTO member (id, role, created_at, updated_at) VALUES
(1, 'STUDENT', NOW(), NOW()),
(2, 'TEACHER', NOW(), NOW());

INSERT INTO tutoring (id, status, created_at, updated_at) VALUES
(1, 'IN_PROGRESS', NOW(), NOW()),
(2, 'CLOSED', NOW(), NOW());

INSERT INTO resources (id, member_id, resource_name, total_page, created_at, updated_at) VALUES
(1, 1, 'Resource 1', 120, NOW(), NOW()),
(2, 2, 'Resource 2', 200, NOW(), NOW());

INSERT INTO homework (id, resource_id, tutoring_id, deadline, start_page, end_page, status, is_deleted, created_at, updated_at) VALUES
(1, 1, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, NOW(), NOW()),
(2, 2, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, NOW(), NOW()),
(3, 1, 2, '2023-12-31', 30, 50, 'IN_PROGRESS', false, NOW(), NOW());
