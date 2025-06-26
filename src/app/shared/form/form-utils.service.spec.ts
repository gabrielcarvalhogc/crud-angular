import { TestBed } from '@angular/core/testing';

import { FormUtilsService } from './form-utils.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

describe('FormUtilsService', () => {
  let service: FormUtilsService;
  let form: UntypedFormGroup;
  let control: UntypedFormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);

    control = new UntypedFormControl(null);
    form = new UntypedFormGroup({ name: control });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getErrorMessage: ', () => {
    it('should return "Campo obrigatório" when is a required error', () => {
      control.setErrors({ required: true });
      const msg = service.getErrorMessage(form, 'name');

      expect(msg).toBe('Campo obrigatório');
    });

    it('should return error message when is a minlength error', () => {
      control.setErrors({ minlength: { requiredLength: 5 } });
      const msg = service.getErrorMessage(form, 'name');

      expect(msg).toBe("Tamanho mínimo precisa ser de 5 caracteres.")
    });

    it('should return error message when is a maxlength error', () => {
      control.setErrors({ maxlength: { requiredLength: 100 } });
      const msg = service.getErrorMessage(form, 'name');

      expect(msg).toBe("Tamanho máximo precisa ser de 100 caracteres.")
    });

    it('should return error message when is a error', () => {
      control.setErrors({});
      const msg = service.getErrorMessage(form, 'name');

      expect(msg).toBe("Campo inválido")
    });
  });
});
