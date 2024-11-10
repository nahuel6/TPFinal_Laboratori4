import { Component, OnInit } from '@angular/core';
import { DestinationsService } from '../services/destinations.service';
import { UnsplashImage, UnsplashResponse } from '../models/unsplash-response.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit{
  imageUrls: string[] = []; 
  description: string = ''; // Nueva propiedad para almacenar la descripción del destino
  userName: string | null = '';
  showComments: boolean = false;
  selectedDestinationId: string = '';
  constructor(private destinationsService: DestinationsService, private router: Router,private authService: AuthService) {}

ngOnInit(): void {
  if (this.authService.isAuthenticated()) {
    this.userName = this.authService.getUserName();

  }
  console.log('User Name:', this.userName);
  /*
  this.userName = this.authService.getUserName();
  console.log('User Name:', this.userName);
  */
}

  fetchImage(destination: string) {
    // Actualiza la descripción según el destino seleccionado
    this.setDescription(destination);

    this.destinationsService.getImages(destination).subscribe(
      (response: UnsplashResponse) => {
        
        this.imageUrls = response.results.slice(0, 3).map((result: UnsplashImage) => result.urls.regular);
      },
      (error: UnsplashResponse) => {
        console.error('Error fetching images:', error);
        this.imageUrls = []; // Limpiar las imágenes si hay un error
      }
    );
    this.selectedDestinationId = this.getDestinationIdByName(destination);
  }

  getDestinationIdByName(destinationName: string): string {
   
    const destinationMap: { [key: string]: string } = {
      'Buenos Aires Capital Federal': '1',
      'Mendoza': '2',
      'Córdoba Argentina': '3',
      'Bariloche Cerro Campanario': '4',
      'Iguazú': '5',
      'Salta Argentina': '6'
    };

    return destinationMap[destinationName] || '';
  }
  goToDestinations() {
    this.router.navigate(['/destinations']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPaquetes() {
    this.router.navigate(['/paquetes']);
  }

  logout() {
    this.authService.logout();
    this.userName = null;  // Limpia el nombre del usuario al cerrar sesión
  }

  isDropdownVisible: boolean = false;

toggleDropdown() {
  this.isDropdownVisible = !this.isDropdownVisible;
}

goToPaquete(paquete: string) {
  this.router.navigate([`/paquete/${paquete}`]);
}


navigateToDestination(destination: string) {
  this.fetchImage(destination);  // O realiza cualquier lógica necesaria para el destino
  this.isDropdownVisible = false;  // Ocultar el menú al seleccionar un destino
}


  setDescription(destination: string) {
    switch (destination) {
      case 'Buenos Aires Capital Federal':
        this.description = 'Descubre la vibrante capital de Argentina, un lugar donde el tango, la arquitectura europea y la vida nocturna crean una experiencia única. Desde el histórico barrio de San Telmo hasta los modernos cafés y librerías de Palermo, Buenos Aires es una ciudad que nunca duerme y siempre tiene algo nuevo que ofrecer. No te pierdas un espectáculo de tango en vivo y disfruta de una auténtica parrillada argentina.';
        break;
      case 'Mendoza':
        this.description = 'Situada a los pies de la cordillera de los Andes, Mendoza es la capital del vino argentino. Disfruta de una cata de vinos en alguna de sus bodegas de renombre internacional o relájate con vistas a los viñedos mientras degustas su famosa cocina regional. Para los aventureros, el Aconcagua, el pico más alto de América, ofrece vistas y excursiones inolvidables en un entorno natural incomparable.';
        break;
      case 'Córdoba Argentina':
        this.description = 'Con una mezcla de historia colonial y paisajes serranos, Córdoba es un destino que enamora a quienes buscan combinar cultura y naturaleza. Explora las iglesias y conventos del centro histórico o visita las pintorescas villas serranas cercanas, ideales para realizar actividades al aire libre y disfrutar de la hospitalidad cordobesa. Ideal para escapadas relajantes y para amantes de los deportes de aventura';
        break;
      case 'Bariloche Cerro Campanario':
        this.description = 'Ubicada en el corazón de la Patagonia, San Carlos de Bariloche es un paraíso de montañas, lagos y bosques. En invierno, el esquí y el snowboard atraen a entusiastas de la nieve, mientras que en verano las actividades al aire libre, como el trekking y el kayak, ofrecen una conexión total con la naturaleza. No olvides probar el famoso chocolate de Bariloche y contemplar el atardecer en el Lago Nahuel Huapi.';
        break;
      case 'Iguazú':
        this.description = 'Vive la experiencia única de uno de los grandes tesoros naturales del mundo. Las Cataratas del Iguazú, ubicadas en plena selva misionera, son una maravilla de la naturaleza con más de 270 saltos de agua que ofrecen vistas impresionantes y actividades para los aventureros, como el paseo en lancha que te lleva casi hasta el pie de las caídas de agua. Un destino que combina naturaleza, biodiversidad y emoción.';
        break;
      case 'Salta Argentina':
        this.description = 'Conocida como ‘La Linda’, Salta ofrece paisajes de montañas, quebradas y viñedos en uno de los entornos más pintorescos del norte argentino. Recorre la Quebrada de Humahuaca, Patrimonio de la Humanidad, y déjate cautivar por sus coloridos cerros y pueblitos coloniales. Salta es el punto de partida ideal para explorar la cultura y los sabores únicos de la región andina, con su música folclórica y deliciosa gastronomía..';
        break;
      default:
        this.description = 'Descubre los mejores destinos turísticos en Argentina.';
        break;
    }
  }
}

