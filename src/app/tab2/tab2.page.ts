import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { PipesModule } from '../pipes/pipes.module';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, 
            ExploreContainerComponent,
            CommonModule,
            PipesModule]
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman','Batman','Superman','Mario Bro'];
  

  constructor(  private moviesService: MoviesService,
                private modalCtrl: ModalController ) {}

  buscar( event: any ){
      const valor: string = event.detail.value;

      if ( valor.length === 0 ) {
        this.buscando = false;    
        this.peliculas = [];
        return;
      }



      // console.log(valor);
      this.buscando = true;
      this.moviesService.buscarPeliculas( valor ).subscribe( (resp: any) =>{
        console.log(resp);
        this.peliculas = resp['results'];
        this.buscando = false;
      });
  }

  async verDetalle( id: number ){

    const modal = await this.modalCtrl.create({  
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();

  }

}
