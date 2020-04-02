import { Component, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'clinical-header',
  templateUrl: './clinical-header.component.html',
  styleUrls: ['./clinical-header.component.css']
})

export class ClinicalHeaderComponent{

  router: Router;

  constructor(router: Router)
  {
    this.router = router;
  }

  TITLE = 'Clinician Portal';

  logout() {
    this.router.navigate(['/login']);
}

}

