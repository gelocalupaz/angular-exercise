import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from './../store/app.state';
import { Login } from './../store/actions/auth.actions';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<AppState>;
  const initialState = {
    isValid: true,
    user: {
        token: 'testToken',
        username: 'user@email.com'
    },
    errorMessage: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ LoginComponent ]
    })
    // .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('test LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit', () => {
    component.ngOnInit();
    // console.log(component.errorMessage);
    expect(component.errorMessage).toBe(null);
  });

  it('test onSubmit', () => {
    const actionPayload = {
      username: 'user@email.com',
      password: '123456'
    };
    component.user.username = 'user@email.com';
    component.user.password = '123456';
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new Login(actionPayload));
  });
});
