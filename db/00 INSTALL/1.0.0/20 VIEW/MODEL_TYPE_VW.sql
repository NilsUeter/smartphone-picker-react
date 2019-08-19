CREATE VIEW `MODEL_TYPE_VW` AS 
select 
	`type`.`PHONE_MODEL_ID` AS `PHONE_MODEL_ID`,
	`type`.`VENDOR_ID` AS `VENDOR_ID`,
	`type`.`NAME` AS `NAME`,
	`type`.`ITEM_ID` AS `ITEM_ID`,
	`type`.`LINK` AS `LINK`,
	`type`.`LAST_UPDATED` AS `LAST_UPDATED`,
	`price`.`PRICE` AS `PRICE` 
from 
	(`MODEL_TYPE` `type` left join `CURRENT_TYPE_PRICES` `price` on((`type`.`ID` = `price`.`MODEL_TYPE_ID`)))