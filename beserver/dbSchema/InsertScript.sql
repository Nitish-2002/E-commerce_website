-- Table: public.Users

INSERT INTO public.products(
    "Title", "Description", "Price", "Status", "Address", date, "UserId", "Views", "ProductId", "Category", "FileName")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Table: public.products

INSERT INTO public."Users"(
    username, password, id)
    VALUES (?, ?, ?);



--Table: public.Categories

INSERT INTO public."Categories"(
	"categoryId", "categoryName", "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?);