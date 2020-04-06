import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { FFQClinician } from './ffqclinician';
import { FFQParent } from './ffqparent';
import { FFQAdmin } from './ffqadmin';
import { ClinicianService } from '../services/clinician/clinician-service';
import { AdminService } from '../services/admin/admin-service';
import { ParentService } from '../services/parent/parent-service';
import { User } from './user';
import { FFQClinicianResponse } from './ffqclinician-response';
import { FFQAdminResponse } from './ffqadmin-response';
import { FFQParentResponse } from './ffqparent-response';




export class AllUsers {
  clinicianService: ClinicianService;
  adminService: AdminService;
  parentService: ParentService;
  UserList: User[] = [];
  //AdminList: FFQAdmin[] = [];
 // ParentList: FFQParent[] = [];
 // ClinicianList: FFQClinician[] = [];

  constructor() {

  }

  generateUserClass(): User[]{

    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    var adminList: Observable<FFQAdminResponse[]> = this.adminService.getAllUsers();
    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    var index = 1;

    adminList.subscribe(a => {
        a.forEach(admin => {
            var i = index.toString();
            var user: User = new User(i, admin.username, admin.userpassword, "admin");
            this.UserList.push(user);
            index++;
        });
    });
    clinicianList.subscribe(a => {
        a.forEach(clinician => {
            var i = index.toString();
            var user: User = new User(i, clinician.username, clinician.userpassword, "clinician");
            this.UserList.push(user);
            index++;
        });
    });
    parentList.subscribe(a => {
        a.forEach(parent => {
            var i = index.toString();
            var user: User = new User(i, parent.username, parent.userpassword, "parent");
            this.UserList.push(user);
            index++;
        });
        //console.log("AllUsers are: " + this.UserList);
    });

    return this.UserList;
   // console.log("AllUsers are: " + UserList);
  }

}


