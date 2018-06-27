-- User info

INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Dirt', 'Joe', 'dirtyjoe@dirt.com', '37', '70 in', '275 lbs', 'Male', 'Caucasian') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";

INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Cleanly', 'Lady', 'cleanlady@clean.com', '23', '64 in', '120 lbs', 'Female', 'Asian') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";

INSERT INTO "public"."users"("lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity") 
VALUES('Friedman', 'Danny', 'none', '7', '46 in', '56 lbs', 'Male', 'n/a') 
RETURNING "id", "lastname", "firstname", "email", "age", "height", "bodyweight", "gender", "ethnicity";

-- med info

INSERT INTO "public"."medicine"("userid", "amtavail", "lotnum", "expdate", "medname") 
VALUES(7, '10', '56789U98', 'none', 'Insulin') 
RETURNING "medid", "userid", "amtavail", "lotnum", "expdate", "medname";

-- User Table
insert into Users
	(LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity)
values
	('Dirt','Joe','dirtyjoe@dirt.com','70 in','275 lbs','37','Male','Caucasian')	
;
-- Medicine Table
insert into Medicine
    (MedName, UserId, AmtAvail, LotNum, ExpDate)
values
    ('Booster', 1, '13ml', '02f8sd7a23', 'July 30th, 2018')
;
-- Shot Info Table
insert into Shot
    (MedId, ShotTime, ShotLocation, Notes)
values
    (1, '2018/06/30 05:33:47', 'Left Shoulder', 'Allergic to Ampecillin')
;