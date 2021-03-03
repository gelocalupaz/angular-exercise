import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from './../store/app.state';
import { Logout } from './../store/actions/auth.actions';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
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
      declarations: [ HomepageComponent ]
    })
    // .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomepageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('test HomepageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit', () => {
    component.ngOnInit();
    expect(component.isValid).toBe(false);
    expect(component.user).toBe(undefined);
  });

  it('test logout', () => {
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout);
  });
});
