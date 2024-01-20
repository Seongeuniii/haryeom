INSERT INTO member (id, role, created_at, updated_at) VALUES
(1, 'STUDENT', NOW(), NOW()),
(2, 'TEACHER', DATEADD('SECOND', 20, CURRENT_TIMESTAMP()), DATEADD('SECOND', 10, CURRENT_TIMESTAMP()));;

INSERT INTO tutoring (id, status, created_at, updated_at) VALUES
(1, 'IN_PROGRESS', NOW(), NOW()),
(2, 'CLOSED', DATEADD('SECOND', 20, CURRENT_TIMESTAMP()), DATEADD('SECOND', 10, CURRENT_TIMESTAMP()));

INSERT INTO resources (id, member_id, resource_name, total_page, created_at, updated_at) VALUES
(1, 1, 'Resource 1', 120, NOW(), NOW()),
(2, 2, 'Resource 2', 200, DATEADD('SECOND', 20, CURRENT_TIMESTAMP()), DATEADD('SECOND', 10, CURRENT_TIMESTAMP()));

INSERT INTO homework (id, resource_id, tutoring_id, deadline, start_page, end_page, status, is_deleted, created_at, updated_at) VALUES
(1, 1, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(2, 2, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, DATEADD('SECOND', 10, CURRENT_TIMESTAMP()), DATEADD('SECOND', 10, CURRENT_TIMESTAMP())),
(3, 1, 2, '2023-12-31', 30, 50, 'IN_PROGRESS', false, DATEADD('SECOND', 20, CURRENT_TIMESTAMP()), DATEADD('SECOND', 20, CURRENT_TIMESTAMP()));

