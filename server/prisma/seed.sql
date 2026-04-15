-- Dogbook seed data
-- All users have password: password123

INSERT INTO "User" (username, email, password, breed, "picUrl") VALUES
  ('rex_the_lab', 'rex@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Labrador Retriever', 'https://picsum.photos/seed/abc123/200/200'),
  ('frenchie_lou', 'lou@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'French Bulldog', 'https://picsum.photos/seed/def456/200/200'),
  ('goldie_grace', 'grace@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Golden Retriever', 'https://picsum.photos/seed/ghi789/200/200'),
  ('shepherd_sam', 'sam@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'German Shepherd', 'https://picsum.photos/seed/jkl012/200/200'),
  ('poodle_pip', 'pip@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Poodle', 'https://picsum.photos/seed/mno345/200/200'),
  ('bully_bella', 'bella@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Bulldog', 'https://picsum.photos/seed/pqr678/200/200'),
  ('beagle_bo', 'bo@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Beagle', 'https://picsum.photos/seed/stu901/200/200'),
  ('husky_hana', 'hana@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Siberian Husky', 'https://picsum.photos/seed/vwx234/200/200'),
  ('corgi_carl', 'carl@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Corgi', 'https://picsum.photos/seed/yza567/200/200'),
  ('doxie_dot', 'dot@example.com', '$2b$10$kLaLNj9wQ6vJlRtzTr.mseiIluQxxMKpZcL20AsXEjOtQUJBjeLJK', 'Dachshund', 'https://picsum.photos/seed/bcd890/200/200');

-- Follows
INSERT INTO "Follow" ("followerId", "followedId") VALUES
  (1,2),(1,3),(1,4),(1,5),
  (2,1),(2,3),(2,6),(2,7),
  (3,1),(3,2),(3,4),(3,8),
  (4,1),(4,3),(4,5),(4,9),
  (5,2),(5,4),(5,6),(5,10),
  (6,1),(6,5),(6,7),(6,8),
  (7,2),(7,6),(7,8),(7,9),
  (8,3),(8,7),(8,9),(8,10),
  (9,4),(9,8),(9,10),(9,1),
  (10,5),(10,9),(10,1),(10,2);

-- Posts
INSERT INTO "Post" (title, content, "authorId", "imageUrl") VALUES
  ('Morning zoomies!', 'Rex woke up at 6am and absolutely lost his mind in the backyard. Classic Lab energy.', 1, 'https://picsum.photos/seed/post01/600/400'),
  ('Nap time 🐾', 'Sometimes you just need to recharge. Found him like this after a long walk.', 1, NULL),
  ('New trick unlocked!', 'Lou finally learned to shake hands. Only took 3 weeks and an entire bag of treats.', 2, 'https://picsum.photos/seed/post03/600/400'),
  ('Bath day survived', 'The drama was unreal. He acted like it was the end of the world.', 2, 'https://picsum.photos/seed/post04/600/400'),
  ('Afternoon at the dog park', 'Grace made three new friends and then immediately fell asleep on the way home.', 3, 'https://picsum.photos/seed/post05/600/400'),
  ('Who''s a good girl?', 'Spoiler: it''s Grace. It''s always Grace.', 3, NULL),
  ('Hiking with my best friend', 'Sam hiked 8 miles without complaint. I, on the other hand, needed a nap.', 4, 'https://picsum.photos/seed/post07/600/400'),
  ('Caught in the act', 'Found him with his head fully inside the laundry basket. No regrets apparently.', 4, 'https://picsum.photos/seed/post08/600/400'),
  ('Poodle life', 'Pip got a fresh trim today and will not stop looking at her reflection.', 5, 'https://picsum.photos/seed/post09/600/400'),
  ('Snack time!', 'The face she makes when she hears the treat bag open from three rooms away.', 6, 'https://picsum.photos/seed/post10/600/400'),
  ('First vet visit', 'Bo was very brave. The vet said he was a perfect gentleman. I believe it.', 7, NULL),
  ('Zoomies at 3am', 'Hana decided 3am was the perfect time for laps around the apartment. She was right.', 8, 'https://picsum.photos/seed/post12/600/400'),
  ('Monday morning mood', 'Carl summed it up perfectly by refusing to get off the couch until 10am.', 9, 'https://picsum.photos/seed/post13/600/400'),
  ('Living her best life', 'Dot discovered the sunny spot by the window and has claimed it permanently.', 10, 'https://picsum.photos/seed/post14/600/400'),
  ('Look at this face', 'No notes. Just look at it.', 10, 'https://picsum.photos/seed/post15/600/400');

-- Comments
INSERT INTO "Comment" (content, "authorId", "postId") VALUES
  ('This is the cutest thing I have ever seen.', 2, 1),
  ('Labs are something else haha', 3, 1),
  ('Same energy as my dog every single morning!', 5, 1),
  ('The treat tax is real', 1, 3),
  ('Mine took a month, you did great!', 4, 3),
  ('The betrayed look on their face gets me every time', 1, 4),
  ('My dog does the exact same thing lol', 7, 4),
  ('Goals! What trail was this?', 2, 7),
  ('Sam is living my dream life', 6, 7),
  ('The laundry basket thing is so relatable', 2, 8),
  ('Guilty as charged and zero shame about it', 5, 8),
  ('Freshly groomed dogs have main character energy', 3, 9),
  ('The treat radar is undefeated', 1, 10),
  ('Good boy Bo!', 3, 11),
  ('Hana said sleep is for the weak', 1, 12),
  ('Corgi solidarity from Carl', 5, 13),
  ('The sunny spot is sacred territory', 2, 14);

-- Likes
INSERT INTO "Like" ("userId", "postId") VALUES
  (2,1),(3,1),(4,1),(5,1),(6,1),
  (1,3),(3,3),(5,3),(7,3),
  (1,4),(2,4),(6,4),(8,4),
  (1,5),(2,5),(4,5),(7,5),(9,5),
  (2,7),(3,7),(5,7),(8,7),
  (1,8),(3,8),(4,8),(6,8),(9,8),
  (2,9),(4,9),(6,9),
  (1,10),(3,10),(5,10),(7,10),
  (2,11),(4,11),(6,11),
  (1,12),(3,12),(5,12),(7,12),(9,12),
  (2,13),(4,13),(6,13),(8,13),
  (1,14),(3,14),(5,14),(7,14),(9,14),
  (2,15),(4,15),(6,15),(8,15),(10,15);
