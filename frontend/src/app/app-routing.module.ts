import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SpaceComponent } from './space/space.component';
import { CommandsComponent } from './commands/commands.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: SpaceComponent },
  { path: 'logout', component: LoginComponent, data: { logout: true } },
  { path: 'commands', component: CommandsComponent },
  { path: 'listing', component: ListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
