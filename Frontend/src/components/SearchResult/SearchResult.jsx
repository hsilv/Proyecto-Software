import React from "react";
import styles from './SearchResult.module.css';
import { GrAlarm } from "react-icons/gr";

const searchData = [
    {
      "id": 24,
      "nombre": "Torta de Chocolate",
      "ingredientes": [
        "(harina, 300g)",
        "(azúcar, 250g)",
        "(cacao en polvo, 100g)",
        "(mantequilla, 200g)",
        "(huevos, 4 unidades)",
        "(leche, 200ml)",
        "(esencia de vainilla, 1 cucharadita)"
      ],
      "tiempo": 50,
      "pais": "Estados Unidos",
      "avg_calificacion": 4.9,
      "descripcion": "Una torta rica y decadente que es un sueño hecho realidad para los amantes del chocolate. Cada capa está cubierta con una cremosa ganache de chocolate y decorada con chispas de chocolate.",
      "categoria": {
        "categoria": "Comida sin Gluten"
      },
      "paso": [],
      "usuario": {
        "username": "food_lover"
      },
      "miniatura": [
        {
          "url": "https://fakeimg.pl/600x600"
        }
      ]
    },
    {
      "id": 25,
      "nombre": "Ensalada de Quinoa",
      "ingredientes": [
        "(quinoa, 1 taza)",
        "(tomate, 1 unidad)",
        "(pepino, 1 unidad)",
        "(pimiento rojo, 1 unidad)",
        "(cebolla roja, 1/4 de unidad)",
        "(aceite de oliva, 2 cucharadas)",
        "(limón, 1 unidad)",
        "(sal y pimienta al gusto)"
      ],
      "tiempo": 20,
      "pais": "Internacional",
      "avg_calificacion": 4.7,
      "descripcion": "Una ensalada fresca y nutritiva hecha con quinoa y una variedad de vegetales frescos. Aliñada con aceite de oliva y jugo de limón para darle un sabor delicioso.",
      "categoria": {
        "categoria": "Ensaladas"
      },
      "paso": [],
      "usuario": {
        "username": "healthy_eater"
      },
      "miniatura": [
        {
          "url": "https://fakeimg.pl/600x600"
        }
      ]
    }
  ];

  const formatTime = (time) => {
      let hours = Math.floor(time / 60);
      let remainingMinutes = time % 60;
  
      let formattedTime = '';
  
      if (hours > 0) formattedTime += `${hours} hrs `;
      if (remainingMinutes > 0) formattedTime += `${remainingMinutes} min`;
      return formattedTime.trim();
  };
  
  const truncateDescription = (description, maxWords) => {
      const words = description.split(' ');
      if (words.length > maxWords) {
          return words.slice(0, maxWords).join(' ') + '...';
      }
      return description;
  };
  
  const SearchResult = ({ data }) => {
      const truncatedDescription = truncateDescription(data.descripcion || 'No description available', 30);
  
      return (
          <div className={styles.resultContainer}>
              <div className={styles.resultContainerImage}>
                  <img src={data.miniatura[0]?.url || ''} alt="Thumbnail" />
              </div>
              <div className={styles.resultContainerInfo}>
                  <div className={styles.resultContainerTitle}>
                      <h2>{data.nombre || 'No title available'}</h2>
                      <div className={styles.timeInformation}>
                          <GrAlarm fontSize={'1.5rem'} />
                          <h3>{formatTime(data.tiempo || 0)}</h3>
                      </div>
                  </div>
                  <p>{truncatedDescription}</p>
              </div>
          </div>
      );
  };
  
  const SearchResultsList = () => {
      return (
          <div>
              {searchData.map((item) => (
                  <SearchResult key={item.id} data={item} />
              ))}
          </div>
      );
  };
  
  export default SearchResultsList;
  
