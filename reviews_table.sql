CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data from reviews.ts
INSERT INTO reviews (user_name, content, rating, date) VALUES
('Alex K.', '"Finding clothes that align with my personal style used to be a challenge until I discovered SaShé. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”', 5, 'August 14, 2023'),
('Sarah M.', '"I''m blown away by the quality and style of the clothes I received from SaShé. From casual wear to elegant dresses, every piece I''ve bought has exceeded my expectations.”', 5, 'August 15, 2023'),
('Ethan R.', '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer''s touch in every aspect of this shirt."', 5, 'August 16, 2023'),
('Olivia P.', '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It''s evident that the designer poured their creativity into making this t-shirt stand out."', 5, 'August 17, 2023'),
('Liam K.', '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer''s skill. It''s like wearing a piece of art that reflects my passion for both design and fashion."', 5, 'August 18, 2023'),
('Samantha D.', '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It''s become my favorite go-to shirt."', 5, 'August 19, 2023');
