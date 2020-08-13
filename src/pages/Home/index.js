import React, { useEffect, useState } from 'react';

import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';

import categoriasRepository from '../../repositories/categorias';

function Home() {
  const [initialsData, setInitialsData] = useState([]);

  useEffect( () => {
        categoriasRepository.getAllWithVideos()
        .then((categoriesWithVideos) => {
          //console.log(categoriasComVideos);
          setInitialsData(categoriesWithVideos);
        })
        .catch(err => {
          console.log(err.message);
        });

  }, []);

  return (
      <PageDefault paddingAll={0}>
        {initialsData.map((categoria, indice) => {
          if(indice === 0){
            return(
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={initialsData[0].videos[0].titulo}
                  url={initialsData[0].videos[0].url}
                  videoDescription={"Camila Achutti, cientista da computação e empreendedora, discorre sobre o cenário brasileiro de mulheres na tecnologia."}
                />

                <Carousel
                  ignoreFirstVideo
                  category={initialsData[0]}
                />
              </div>
            );
          }

          return (
            <Carousel
              key={categoria.id}
              category= {categoria}
            />    
          );

        })}
        
      </PageDefault> 
      
  );
}

export default Home;
