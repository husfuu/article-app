CREATE TABLE posts (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200),
    Content TEXT,
    Category VARCHAR(100),
    Created_date TIMESTAMP,
    Updated_date TIMESTAMP,
    Status VARCHAR(100)
);

INSERT INTO posts (Title, Content, Category, Created_date, Updated_date, Status)
VALUES
    ('Title 1', 'Content for Title 1', 'Category 1', NOW(), NOW(), 'publish'),
    ('Title 2', 'Content for Title 2', 'Category 2', NOW(), NOW(), 'publish'),
    ('Title 3', 'Content for Title 3', 'Category 1', NOW(), NOW(), 'draft'),
    ('Title 4', 'Content for Title 4', 'Category 2', NOW(), NOW(), 'draft'),
    ('Title 5', 'Content for Title 5', 'Category 1', NOW(), NOW(), 'trash');