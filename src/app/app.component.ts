import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GeminiService } from './gemini.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gemini-integration';
  prompt: string = '';
  loading: boolean = false;
  chatHistory: any[] = [];
  
  geminiService: GeminiService = inject(GeminiService);
  
  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }
}
