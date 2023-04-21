INSERT INTO categoria (nombre, descripcion)
VALUES ('Mexican', 'Spicy and flavorful dishes from Mexico');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Italian', 'Pasta, pizza, and other classic Italian dishes');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Japanese', 'Sushi, ramen, and other Japanese favorites');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Mediterranean', 'Healthy and delicious cuisine from Greece, Italy, and other countries');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Indian', 'Spices and aromas from the Indian subcontinent');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Thai', 'Sweet, sour, and spicy dishes from Thailand');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Chinese', 'Noodles, dumplings, and other Chinese specialties');

INSERT INTO categoria (nombre, descripcion)
VALUES ('American', 'Burgers, fries, and other classic American comfort food');

INSERT INTO categoria (nombre, descripcion)
VALUES ('French', 'Elegant and sophisticated French cuisine');

INSERT INTO categoria (nombre, descripcion)
VALUES ('Vegan', 'Plant-based dishes for a healthy lifestyle');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('user123', 'https://via.placeholder.com/500x500?text=pfp', 325, MD5('admin'), 'admin');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('chef_gourmet', 'https://via.placeholder.com/500x500?text=pfp', 1523, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('foodie_life', 'https://via.placeholder.com/500x500?text=pfp', 4237, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('yumyum_cuisine', 'https://via.placeholder.com/500x500?text=pfp', 889, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('tasty_treats', 'https://via.placeholder.com/500x500?text=pfp', 624, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('foodielover', 'https://via.placeholder.com/500x500?text=pfp', 1278, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('cookmaster', 'https://via.placeholder.com/500x500?text=pfp', 3876, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('tasteofhome', 'https://via.placeholder.com/500x500?text=pfp', 5742, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('foodcritic', 'https://via.placeholder.com/500x500?text=pfp', 239, MD5('password'), 'usuario');

INSERT INTO usuario (username, pfp, followers, password, rol)
VALUES ('foodexplorer', 'https://via.placeholder.com/500x500?text=pfp', 974, MD5('password'), 'usuario');

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Spaghetti Carbonara', 12, 900, 
        '{{"Spaghetti", "500g"}, {"Egg", "3"}, {"Pancetta", "150g"}, {"Parmesan cheese", "100g"}, {"Salt", "to taste"}, {"Black pepper", "to taste"}}',
        '2023-04-20', 4.8, 'Italy', 12);

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Chicken Tikka Masala', 13, 1800, 
        '{{"Boneless chicken", "500g"}, {"Yogurt", "250g"}, {"Tomato puree", "200g"}, {"Ginger", "1 inch"}, {"Garlic", "5 cloves"}, {"Garam masala", "2 tsp"}, {"Turmeric", "1 tsp"}, {"Cumin", "1 tsp"}, {"Salt", "to taste"}, {"Oil", "2 tbsp"}}',
        '2023-04-18', 4.5, 'India', 18);

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Hamburger', 14, 600, 
        '{{"Ground beef", "500g"}, {"Burger buns", "4"}, {"Cheddar cheese", "4 slices"}, {"Lettuce", "4 leaves"}, {"Tomato", "1"}, {"Onion", "1"}, {"Ketchup", "2 tbsp"}, {"Mustard", "1 tbsp"}, {"Salt", "to taste"}, {"Black pepper", "to taste"}}',
        '2023-04-15', 4.2, 'United States', 18);
		
INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Chicken Alfredo', 15, 1200, 
        '{{"Fettuccine pasta", "500g"}, {"Chicken breast", "500g"}, {"Heavy cream", "500ml"}, {"Garlic", "3 cloves"}, {"Parmesan cheese", "100g"}, {"Butter", "50g"}, {"Salt", "to taste"}, {"Black pepper", "to taste"}}',
        '2023-04-14', 4.7, 'Italy', 12);

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Beef Stroganoff', 12, 1500, 
        '{{"Beef sirloin", "500g"}, {"Egg noodles", "500g"}, {"Sour cream", "200g"}, {"Beef broth", "500ml"}, {"Onion", "1"}, {"Garlic", "3 cloves"}, {"Flour", "2 tbsp"}, {"Paprika", "1 tbsp"}, {"Salt", "to taste"}, {"Black pepper", "to taste"}}',
        '2023-04-12', 4.6, 'Russia', 14);

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Sushi Rolls', 13, 1800, 
        '{{"Sushi rice", "2 cups"}, {"Nori seaweed", "4 sheets"}, {"Sushi vinegar", "2 tbsp"}, {"Avocado", "1"}, {"Cucumber", "1"}, {"Carrot", "1"}, {"Crab meat", "150g"}, {"Soy sauce", "to taste"}, {"Wasabi", "to taste"}, {"Pickled ginger", "to taste"}}',
        '2023-04-10', 4.9, 'Japan', 13);

INSERT INTO receta (nombre, autor_id, tiempo, ingredientes, fecha, avg_calificacion, pais, categoria_id)
VALUES ('Taco Salad', 14, 900, 
        '{{"Ground beef", "500g"}, {"Lettuce", "1 head"}, {"Tomato", "1"}, {"Onion", "1"}, {"Cheddar cheese", "100g"}, {"Taco seasoning", "2 tbsp"}, {"Tortilla chips", "1 cup"}, {"Sour cream", "4 tbsp"}, {"Salsa", "4 tbsp"}}',
        '2023-04-08', 4.3, 'Mexico', 11);
		
INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (11, 1, 'Bring a large pot of salted water to a boil. Add spaghetti and cook until al dente, according to package directions.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (11, 2, 'Meanwhile, in a large skillet, cook bacon over medium heat until crisp. Remove with a slotted spoon and drain on paper towels. Reserve 2 tablespoons of bacon fat in skillet.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (11, 3, 'In a small bowl, whisk together eggs, Parmesan cheese, and black pepper.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (11, 4, 'Add cooked spaghetti to the skillet with reserved bacon fat. Toss to coat spaghetti with fat. Remove skillet from heat.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (11, 5, 'Add egg mixture to the skillet and toss until spaghetti is coated and eggs are cooked through. Add reserved bacon and toss again. Serve immediately.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 1, 'In a large bowl, combine yogurt, lemon juice, cumin, cinnamon, cayenne pepper, black pepper, ginger, and salt. Stir in chicken pieces and coat with the mixture. Cover and refrigerate for at least 1 hour, or overnight.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 2, 'Preheat a grill or broiler to high heat. Lightly oil the grill grate or broiler pan.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 3, 'Thread the marinated chicken pieces onto skewers. Grill or broil until the chicken is no longer pink in the center and the juices run clear, about 5 minutes per side.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 4, 'In a large skillet, heat oil over medium heat. Add onion and garlic and sauté until onion is translucent, about 5 minutes.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 5, 'Stir in tomato sauce, cream, butter, and garam masala. Simmer until sauce thickens, about 10 minutes.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (12, 6, 'Add cooked chicken to the skillet and simmer until heated through, about 5 minutes. Garnish with chopped cilantro and serve with basmati rice and naan bread.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 1, 'Preheat a grill or a large skillet over medium-high heat.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 2, 'Divide the ground beef into equal portions and form each portion into a patty that is about 1/2 inch thick. Make a small indentation in the center of each patty with your thumb to prevent it from puffing up as it cooks.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 3, 'Season the patties on both sides with salt and black pepper. If desired, brush the patties lightly with oil or melted butter.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 4, 'Grill or cook the patties in the skillet until browned and cooked through, about 4-5 minutes per side for medium doneness.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 5, 'Toast the buns on the grill or in the oven, if desired.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (13, 6, 'Assemble the burger by placing the cooked patty on the bottom bun, and adding desired toppings such as cheese, lettuce, tomato, onion, pickles, or condiments like ketchup, mustard, or mayo. Add the top bun and serve immediately.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (14, 1, 'Cook the pasta according to package instructions until al dente. Drain and set aside.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (14, 2, 'Season the chicken breasts with salt and black pepper. Heat 1 tablespoon of olive oil in a large skillet over medium-high heat. Add the chicken and cook until browned on both sides and cooked through, about 4-5 minutes per side. Remove from the skillet and let rest for a few minutes.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (14, 3, 'In the same skillet, add another tablespoon of olive oil and the minced garlic. Cook until fragrant, about 30 seconds. Add the heavy cream, grated Parmesan cheese, and chopped parsley. Stir well and let simmer for 2-3 minutes until the sauce has thickened.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (14, 4, 'Add the cooked pasta to the skillet with the sauce and toss to coat evenly. Slice the chicken breasts and arrange them on top of the pasta. Serve immediately, garnished with additional Parmesan cheese and chopped parsley, if desired.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (15, 1, 'Slice the beef into thin strips and season with salt and black pepper. In a large skillet over high heat, melt 2 tablespoons of butter and add the beef strips. Cook until browned on all sides, about 2-3 minutes per side. Remove the beef from the skillet and set aside.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (15, 2, 'In the same skillet, add another tablespoon of butter and the sliced mushrooms. Cook until the mushrooms have released their moisture and are browned, about 5-7 minutes. Remove the mushrooms from the skillet and set aside with the beef.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (15, 3, 'Reduce the heat to medium and add another tablespoon of butter to the skillet. Add the diced onion and cook until softened and translucent, about 3-4 minutes. Add the minced garlic and cook for an additional 30 seconds until fragrant.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (15, 4, 'Add the beef broth, Worcestershire sauce, and Dijon mustard to the skillet. Stir well and let the mixture simmer for 5 minutes until slightly reduced. Add the sour cream and stir until well combined.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (15, 5, 'Add the beef and mushrooms back into the skillet with the sauce. Stir to coat everything evenly and let simmer for an additional 5-7 minutes until the beef is cooked through and the sauce has thickened slightly. Serve over cooked egg noodles or rice.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 1, 'Start by cooking the sushi rice according to package instructions. Once cooked, spread the rice out on a large plate or baking sheet and let it cool to room temperature.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 2, 'While the rice is cooking, prepare your fillings. You can use a variety of ingredients such as sliced avocado, cucumber, crab meat, cooked shrimp, or smoked salmon. Slice everything into thin strips and set aside.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 3, 'Once the rice has cooled, lay a sheet of nori (dried seaweed) on top of a bamboo sushi rolling mat with the shiny side facing down. Spread a thin layer of rice over the nori, leaving about 1 inch of space at the top edge of the sheet.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 4, 'Add your fillings in a line across the center of the rice. Be careful not to overfill, as this can make it difficult to roll. Lift the edge of the mat closest to you and roll it forward, pressing gently as you go to make sure the roll is tight.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 5, 'When you get to the end, use a little water to moisten the top edge of the nori to help it stick together. Use the mat to compress the roll gently and create a uniform shape. Repeat with the remaining ingredients, adjusting the fillings as desired.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (16, 6, 'Once you have all your rolls, use a sharp knife to slice them into bite-sized pieces. Serve with soy sauce, wasabi, and pickled ginger.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (17, 1, 'Start by cooking your ground beef in a large skillet over medium heat. Once it has browned, drain any excess fat.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (17, 2, 'Add a packet of taco seasoning to the skillet and stir to combine. Cook for another 2-3 minutes until the meat is well coated and the seasoning is fragrant.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (17, 3, 'While the meat is cooking, prepare your salad ingredients. Wash and chop a head of lettuce and divide it between four bowls or plates. Top with diced tomatoes, shredded cheese, and any other desired toppings such as black beans or corn.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (17, 4, 'Once the meat is cooked, spoon it over the salad in each bowl. Drizzle with ranch dressing or sour cream, and sprinkle with crushed tortilla chips for added crunch.', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO paso (receta_id, numero, descripcion, multimedia_url)
VALUES (17, 5, 'Serve immediately and enjoy your delicious and easy taco salad!', 'https://via.placeholder.com/400x400?text=paso');

INSERT INTO miniatura (receta_id, url)
VALUES (11, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (11, 'https://via.placeholder.com/1000X1000?text=receta1');

INSERT INTO miniatura (receta_id, url)
VALUES (11, 'https://via.placeholder.com/1000X1000?text=receta2');

INSERT INTO miniatura (receta_id, url)
VALUES (12, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (13, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (13, 'https://via.placeholder.com/1000X1000?text=receta1');

INSERT INTO miniatura (receta_id, url)
VALUES (13, 'https://via.placeholder.com/1000X1000?text=receta2');

INSERT INTO miniatura (receta_id, url)
VALUES (13, 'https://via.placeholder.com/1000X1000?text=receta3');

INSERT INTO miniatura (receta_id, url)
VALUES (14, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (14, 'https://via.placeholder.com/1000X1000?text=receta1');

INSERT INTO miniatura (receta_id, url)
VALUES (15, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (16, 'https://via.placeholder.com/1000X1000?text=receta');

INSERT INTO miniatura (receta_id, url)
VALUES (16, 'https://via.placeholder.com/1000X1000?text=receta1');

INSERT INTO miniatura (receta_id, url)
VALUES (16, 'https://via.placeholder.com/1000X1000?text=receta2');

INSERT INTO miniatura (receta_id, url)
VALUES (17, 'https://via.placeholder.com/1000X1000?text=receta');