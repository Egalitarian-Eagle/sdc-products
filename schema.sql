-- DROP DATABASE test;
CREATE DATABASE test;

CREATE TABLE products (
  product_id integer PRIMARY KEY,
  name varchar(100) NOT NULL,
  slogan TEXT,
  description TEXT,
  category varchar(200),
  default_price varchar(10) NOT NULL
);

CREATE TABLE features (
  feature_id integer PRIMARY KEY,
  product_id integer REFERENCES products(product_id),
  feature varchar(80) NOT NULL,
  value varchar(80) NOT NULL
);

-- isDefault in the old api is referenced as 'default?'
CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer REFERENCES products (product_id) NOT NULL,
  name varchar(80) NOT NULL,
  sale_price varchar(10),
  original_price varchar(10) NOT NULL,
  isDefault boolean
);


CREATE TABLE photos (
  id integer PRIMARY KEY,
  style_id integer REFERENCES styles (style_id),
  thumbnail_url TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE skus (
  sku_id integer PRIMARY KEY,
  style_id integer REFERENCES styles (style_id),
  size varchar(10) NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE related (
  id integer PRIMARY KEY,
  product_id integer REFERENCES products (product_id),
  related_id integer NOT NULL
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user integer,
  sku_id integer REFERENCES skus (sku_id),
  count integer,
  active boolean,
);

CREATE INDEX product_id_index ON products (product_id);
CREATE INDEX features_id_index ON features (product_id);
CREATE INDEX styles_id_index ON styles (product_id);
CREATE INDEX photos_id_index ON photos (style_id);
CREATE INDEX skus_id_index ON skus (style_id);
CREATE INDEX related_id_index ON related (product_id);

COPY products FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/product.csv' CSV HEADER;
COPY features FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/features.csv' CSV HEADER;
COPY styles FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/styles.csv' CSV HEADER;
COPY photos FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/photos.csv' CSV HEADER;
COPY skus FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/skus.csv' CSV HEADER;
COPY related FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/related.csv' CSV HEADER;
-- COPY cart FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/cart.csv' CSV HEADER;