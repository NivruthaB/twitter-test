import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from "../components/Timeline/timeline.component";
import { HomeComponent } from "../components/Home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from '../components/Navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HttpClientModule, NavbarComponent, TimelineComponent, HomeComponent, FormsModule, MatFormFieldModule]
})
export class AppComponent {
  title = 'expivi-twitter-app';
}
