import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiGenshinStatsService } from 'src/app/services/api-genshin-stats.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UIDError } from "src/app/errors/errors";

@Component({
  selector: 'app-page-home',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  public notes;
  public spiralabyss;
  public characteres;
  public stats;
  public search;

  public notifier;

  public charactersSelected;

  constructor(
    private apiGenshinStatsService: ApiGenshinStatsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.characteres = signal<Array<any>>([]);
    this.search = signal<string>("649692210");
    this.notes = signal<any>(null);
    this.spiralabyss = signal<any>(null);
    this.stats = signal<any>(null);
    this.notifier = new Subject();
    this.charactersSelected = signal<Array<any>>([null, null, null, null, null, null, null, null]);
  }

  ngOnInit(): void {
    // uid: 649692210
    this.spinner.show("homePage");
    this.searchUserData();
  }

  ngOnDestroy(): void {
    this.spinner.hide("homePage");
    this.notifier.next(null);
    this.notifier.complete();
  }

  generateTeam(): void {
    const shuffled = [...this.characteres()].sort(() => 0.5 - Math.random());
    this.charactersSelected.set(shuffled.slice(0, 8));
  }

  updateSearch(event: any): void {
    this.search.set(event.target.value);
  }

  clear(): void {
    this.search.set("");
    this.characteres.set([]);
    this.notes.set(null);
    this.spiralabyss.set(null);
    this.stats.set(null);
    this.charactersSelected.set([null, null, null, null, null, null, null, null]);
  }

  public loadResine = signal<boolean>(false);
  public loadAbyss = signal<boolean>(false);
  public loadCharacters = signal<boolean>(false);
  public loadStats = signal<boolean>(false);

  searchUserData(): void {
    try {
      this.validateUID();
      this.getResine();
      this.getSpiralAbyss();
      this.getCharacteres();
      this.getStats();
      this.charactersSelected.set([null, null, null, null, null, null, null, null]);
    } catch (err) {
      if (err instanceof UIDError) {
        this.toastr.error(err.message, err.name);
      } else {
        this.toastr.error("Ah ocurrido un error.", "Error");
      }
    }
  }

  validateUID() {
    if (this.search() === "" || this.search() === null) throw new UIDError("El UID no debe de estar vacío.");
    if (!/^\d+$/.test(this.search())) throw new UIDError("El UID solo debe de contener números.");
  }

  getStats(): void {
    if (this.search()) {
      this.loadStats.set(true);
      this.apiGenshinStatsService.getUserStats(this.search()).pipe(takeUntil(this.notifier)).subscribe({
        next: (res: any) => {
          this.stats.set(res.data);
          this.loadStats.set(false);
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, "Error");
          this.loadStats.set(false);
        }
      });
    }
  }

  getSpiralAbyss(): void {
    if (this.search()) {
      this.loadAbyss.set(true);
      this.apiGenshinStatsService.getSpiralAbyss(this.search()).pipe(takeUntil(this.notifier)).subscribe({
        next: (res: any) => {
          this.spiralabyss.set(res.data);
          this.loadAbyss.set(false);
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, "Error");
          this.loadAbyss.set(false);
        }
      });
    }
  }

  getResine(): void {
    if (this.search()) {
      this.loadResine.set(true);
      this.apiGenshinStatsService.getNotes(this.search()).pipe(takeUntil(this.notifier)).subscribe({
        next: (res: any) => {
          this.notes.set(res.data);
          this.loadResine.set(false);
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, "Error");
          this.loadResine.set(false);
        }
      });
    }
  }

  getCharacteres(): void {
    if (this.search()) {
      this.loadCharacters.set(true);
      this.apiGenshinStatsService.getCharacteres(this.search()).pipe(takeUntil(this.notifier)).subscribe({
        next: (res: any) => {
          let characters = res.data.sort((a: any, b: any) => b.rarity - a.rarity);
          this.characteres.set(characters);
          this.loadCharacters.set(false);
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, "Error");
          this.loadCharacters.set(false);
        }
      });
    }
  }
}
