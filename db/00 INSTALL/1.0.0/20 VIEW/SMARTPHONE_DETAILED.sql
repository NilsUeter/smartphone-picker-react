CREATE VIEW `SMARTPHONE_DETAILED` AS
SELECT
	types.VENDOR_ID 	AS VENDOR,
    types.NAME 			AS TYPE_NAME,
    types.ITEM_ID 		AS ITEM_ID,
    types.LINK 			AS LINK,
    types.LAST_UPDATED	AS LAST_UPDATED,
    types.PRICE 		AS PRICE,
    models.ID			AS MODEL_ID,
    models.STORAGE		AS STORAGE,
    models.MEMORY		AS MEMORY,
    phones.*
FROM
	MODEL_TYPE_VW types
    LEFT JOIN PHONE_MODEL models ON types.PHONE_MODEL_ID = models.ID
    LEFT JOIN SMARTPHONE phones ON models.SMARTPHONE_ID = phones.ID
ORDER BY
	phones.ID,
    models.ID,
    types.PRICE ASC;