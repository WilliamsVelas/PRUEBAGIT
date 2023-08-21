import { Component, OnInit, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../interfaces/interfaces';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { PipesModule } from '../pipes/pipes.module';
import { environment } from 'src/environments/environment';
import { ComponentsModule } from '../components/components.module';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';

const URL = environment.imgPath;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, 
            ExploreContainerComponent, 
            CommonModule,
            PipesModule,
            ComponentsModule,
            ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasRecientesPoster: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor( private moviesService: MoviesService ) {}

  ngOnInit(){ this.moviesService.getFeature().subscribe( 
      ( resp: any) => {
        
        this.peliculasRecientes = resp.results;

        this.peliculasRecientes.forEach(( pelicula: any)=> {

          if( !pelicula.backdrop_path ){
            // console.log('a');
            pelicula['imgPoster']='assets/no-image-banner.jpg';
          }else { 
            pelicula['imgPoster']= `${ URL }${ pelicula.backdrop_path }`
            // console.log(pelicula);
          }
        })
      }
    );

    this.getPopulares();
    
  }

  cargarMas() {
    this.getPopulares();
    console.log('peoooo');
  }

  getPopulares() { 
    this.moviesService.getPopulares().subscribe( ( resp: any) =>{
      // console.log( 'Popularesdddd', resp );
      this.populares = resp.results;
    } )
  }
}
