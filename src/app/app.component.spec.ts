import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { MatSlideToggle } from '@angular/material/slide-toggle';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'crud-angular' title`, () => {
    expect(component.title).toEqual('crud-angular');
  });

  it('should have toolbar element', () => {
    expect(fixture.nativeElement.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should show "dark" when isDark = false', () => {
    component.isDark = false;
    fixture.detectChanges();

    const toggleDE = fixture.debugElement.query(By.directive(MatSlideToggle));
    toggleDE.triggerEventHandler('change', { checked: false });
    expect(component.isDark).toBeFalsy();
  });
});
