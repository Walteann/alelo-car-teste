import { AleloInputTextComponent } from './alelo-input-text.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AleloErrorModule } from '../../alelo-error/alelo-error.module';

describe('AleloInputText', () => {

  let component: AleloInputTextComponent;
  let fixture: ComponentFixture<AleloInputTextComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AleloErrorModule
      ],
      declarations: [
        AleloInputTextComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AleloInputTextComponent);

    component = fixture.componentInstance;

  })

  it('should check onEnter and entersubmit emit event with value submit', () => {

    const spy = spyOn(component.enterSubmit, 'emit');

    component.onEnter();

    expect(spy).toHaveBeenCalledWith('submit')

  });

  it('should check onEnter else codition enterSubmit false', () => {

    const spy = spyOn(component.enterSubmit, 'emit');

    component.enterSubmit = false as any;

    component.onEnter();

    expect(spy).not.toHaveBeenCalledWith('submit');

  });

});
