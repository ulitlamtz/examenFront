import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgendaServiceService } from 'src/app/services/agenda-service.service';
import { Contacto } from '../agenda/agenda.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent implements OnInit {
  exampleHeader = ExampleHeader;
  registerForm: FormGroup;
  submitted = false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private agendaservice: AgendaServiceService,
    private formBuilder: FormBuilder
  ) {}
  registro: Contacto;
  Submit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid);

    this.registro = {
      idContacto: undefined,
      nombreCompleto: f.value.nombre + ' ' + f.value.apellido,
      email: f.value.email,
      telefono: f.value.telefono,
      fechaNacimiento: f.value.fechaNacimiento,
    };
    console.log('Funicona');
    this.agendaservice.postAgenda(this.registro).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      fechaNacimiento: ['', Validators.required],
    });
  }

  f() {
    return this.registerForm.controls;
  }
  valida: any;
  onSubmit() {
    this.submitted = true;
    this.valida = this.f();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    this.registro = {
      idContacto: undefined,
      nombreCompleto:
        this.registerForm.value.nombre + ' ' + this.registerForm.value.apellido,
      email: this.registerForm.value.email,
      telefono: this.registerForm.value.telefono,
      fechaNacimiento: this.registerForm.value.fechaNacimiento,
    };
    console.log('Funicona');
    this.agendaservice.postAgenda(this.registro).subscribe((data) => {
      console.log(data);
      if (data == null) {
        alert('Exito!! :-)\n\n' + 'Registro Insertado');
        this.submitted = false;
        this.registerForm.reset();
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}

@Component({
  selector: 'example-header',
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-double-arrow .mat-icon {
        margin: -22%;
      }
    `,
  ],
  template: `
    <div class="example-header">
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="previousClicked('year')"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{ periodLabel }}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="nextClicked('year')"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
