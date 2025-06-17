import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let closeSpy: jest.Mock;

  beforeEach(async () => {
    closeSpy = jest.fn();
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: closeSpy } },
        { provide: MAT_DIALOG_DATA, useValue: 'Mensagem de teste' }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on click "Sim" call close(true)', () => {
    const btnSim = fixture.nativeElement.querySelector('button:nth-child(1)');
    btnSim.click();
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('on click "Não" call close(false)', () => {
    const btnNao = fixture.nativeElement.querySelector('button:nth-child(2)');
    btnNao.click();
    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});
