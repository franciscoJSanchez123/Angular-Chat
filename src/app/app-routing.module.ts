import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:'chat', component:ChatComponent},
  {path:'', loadChildren: () =>import('../app/components/signin/signin.module').then(m=>m.SigninModule)},
  {path:'signup', loadChildren: () =>import('../app/components/signup/signup.module').then(m=>m.SignupModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
