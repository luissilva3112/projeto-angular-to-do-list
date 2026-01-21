import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Tarefa {
  id: number;
  texto: string;
  feita: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private http = inject(HttpClient);
  
  listaTarefas = signal<Tarefa[]>([]);
  filtroAtivo = signal<'todos' | 'pendentes' | 'concluidas'>('todos');

  constructor() {
    const salvo = localStorage.getItem('tarefas');
    if (salvo) {
      try { this.listaTarefas.set(JSON.parse(salvo)); } catch (e) {}
    }
    effect(() => {
      localStorage.setItem('tarefas', JSON.stringify(this.listaTarefas()));
    });
  }

  // ESSENCIAL: Resolve o erro "Property totalConcluidas does not exist"
  totalConcluidas = computed(() => 
    this.listaTarefas().filter(t => t.feita).length
  );

  listaFiltrada = computed(() => {
    const tarefas = this.listaTarefas();
    const filtro = this.filtroAtivo();
    if (filtro === 'pendentes') return tarefas.filter(t => !t.feita);
    if (filtro === 'concluidas') return tarefas.filter(t => t.feita);
    return tarefas;
  });

  addTarefa(valor: string) {
    if (valor.trim()) {
      const nova = { id: Date.now(), texto: valor, feita: false };
      this.listaTarefas.update(l => [...l, nova]);
    }
  }

  alternarTarefa(id: number) {
    this.listaTarefas.update(l => l.map(t => t.id === id ? {...t, feita: !t.feita} : t));
  }

  removerTarefa(id: number) {
    this.listaTarefas.update(l => l.filter(t => t.id !== id));
  }

  mudarFiltro(f: 'todos' | 'pendentes' | 'concluidas') {
    this.filtroAtivo.set(f);
  }

  importarDaNuvem() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .subscribe((dados: any[]) => {
        const novas = dados.map((item: any) => ({
          id: item.id + Date.now(),
          texto: item.title,
          feita: item.completed
        }));
        this.listaTarefas.update(l => [...l, ...novas]);
      });
  }
}