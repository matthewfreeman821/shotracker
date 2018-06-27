-- -----------------
-- USER QUERIES
-- -----------------

-- Get all Users
select * from Users;

-- Get User by Id
select * from Users
where id=1;

-- Update User LastName
update Users
set LastName='dirt-bobby'
where id=1;

-- Update User Email
update Users
set Email='joeyd@dirt.com'
where id=1;

-- Update User Height
update Users
set Height='71 in'
where id=1;

-- Update User Weight
update Users
set BodyWeight='250 lbs'
where id=1;

-- Update User Age
update Users
set Age='38'
where id=1;
-- -----------------
-- MEDICINE QUERIES
-- -----------------

-- Get all Medicine
select * from Medicine;

-- Get Medicine by Id
select * from Medicine
where MedId=1;

-- Get Medicine by Name(Any text related to Name such as Boo for example below)
select * from Medicine
where MedName ilike '%Booster%';

-- Update Medicine Name
update Medicine
set MedName='Pox'
where MedId=1;

-- Update Medicine Amount
update Medicine
set AmtAvail='23ml'
where MedId=1;

-- Update Medicine Lot#
update Medicine
set LotNum='23j4290f8fd'
where MedId=1;

-- Update Medicine Exp Date
update Medicine
set ExpDate='08/31/2018'
where MedId=1;

-- -----------------
-- SHOT QUERIES
-- -----------------

-- Get all Shot
select * from Shot;

-- Get Shot info by Medicine Id
select * from Shot
where MedId=1;

-- Update Shot Time
update Shot
set ShotTime='2018/06/27 13:33:33'
where MedId=1;

-- Update Shot Location
update Shot
set ShotLocation='Right Shoulder'
where MedId=1;

-- Update Shot Notes
update Shot
set Notes='Allergic to Ampecillin and Advil'
where MedId=1;