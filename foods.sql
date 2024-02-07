CREATE DATABASE cardapio;

USE cardapio;

CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    image VARCHAR(256),
    price LONG
);

/*  ========== */
/*    INSERT  */
/*  ========== */
INSERT INTO foods (title, image, price) VALUES ('X-Burguer','https://sachefmio.blob.core.windows.net/fotos/x-burguer-73517.jpg','20');

/*  ========== */
/*    SELECT  */
/*  ========== */
SELECT * FROM foods;

/*  ========== */
/*    UPDATE  */
/*  ========== */
UPDATE foods
SET image = 'https://sachefmio.blob.core.windows.net/fotos/x-burguer-73517.jpg'
WHERE id = 2;

/*  ========== */
/*    DELETE  */
/*  ========== */
DELETE FROM foods WHERE id = 14;