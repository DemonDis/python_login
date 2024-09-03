CREATE TABLE draft
(
    -- draft_id SERIAL PRIMARY KEY,
    draft_id   VARCHAR(50),
    draft_name  VARCHAR(50),
    draft_date  VARCHAR(50)
);

INSERT INTO draft (draft_id, draft_name, draft_date)
VALUES ('draft_1', 'NAME 1', '31.08.2024'),
       ('draft_2', 'NAME 2', '31.08.2024'),
       ('draft_3', 'NAME 3', '31.08.2024');