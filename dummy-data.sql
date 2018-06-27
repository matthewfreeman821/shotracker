INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Dirt', 'Joe', 'dirtyjoe@dirt.com', '37', '70 in', '275 lbs', 'Male', 'Caucasian') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";

INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Cleanly', 'Lady', 'cleanlady@clean.com', '23', '64 in', '120 lbs', 'Female', 'Asian') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";

INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Friedman', 'Danny', 'none', '7', '3 ft 8 in', '56 lbs', 'Male', 'n/a') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";
