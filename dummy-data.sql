-- User Table
insert into Users
	(GithubId, LastName, FirstName, Email, Height, BodyWeight, Age, Gender, Ethnicity)
values
	(1,'Dirt','Joe','dirtyjoe@dirt.com','70 in','275 lbs','37','Male','Caucasian')	
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

