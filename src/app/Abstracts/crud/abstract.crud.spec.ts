import {AbstractCrud} from "./abstract.crud";
import {of} from "rxjs";
import {environment} from "../../../environments/environment";

describe('Test: AbstractCrud', ()=>{
  let fixture: AbstractCrud<Object>;
  let httpMock: any;
  let spyOnGet: any;
  let spyOnPost: any;
  let spyOnPut: any;
  let spyOnDelete: any;

  describe('Test: getAll', ()=>{
    beforeEach(()=>{
      httpMock = {
        get: jest.fn().mockReturnValue(of([{}]))
      }
      spyOnGet = jest.spyOn(httpMock, "get");
      fixture = new AbstractCrud<Object>(
        httpMock,
        'all',
        'byId/',
        'create',
        'update/',
        'delete/'
      );
    })
    it('Should return a list of objects', ()=>{
      fixture.getAll().subscribe(
        response=>{
          expect(spyOnGet).toBeDefined();
          expect(spyOnGet).toHaveBeenCalled();
          expect(response).toEqual([{}]);
        }
      );
    });
  });


  describe('Test: getById', ()=>{
    beforeEach(()=>{
      httpMock = {
        get: jest.fn().mockReturnValue(of({}))
      }
      spyOnGet = jest.spyOn(httpMock, "get");
      fixture = new AbstractCrud<Object>(
        httpMock,
        'all',
        'byId/',
        'create',
        'update/',
        'delete/'
      );
    })
    it('Should return an objects', ()=>{
      fixture.getById("123").subscribe(
        response=>{
          expect(spyOnGet).toBeDefined();
          expect(spyOnGet).toHaveBeenCalled();
          expect(response).toEqual({});
        }
      );
    });
  });

  describe('Test: create', ()=>{
    beforeEach(()=>{
      httpMock = {
        post: jest.fn().mockReturnValue(of([{message: 'Ajout réussi'}]))
      }
      spyOnGet = jest.spyOn(httpMock, "post");
      fixture = new AbstractCrud<Object>(
        httpMock,
        'all',
        'byId/',
        'create',
        'update/',
        'delete/'
      );
    })
    it('Should return a success message', ()=>{
      fixture.create({}).subscribe(
        response=>{
          expect(spyOnGet).toBeDefined();
          expect(spyOnGet).toHaveBeenCalled();
          expect(response).toEqual({message: 'Ajout réussi'});
        }
      );
    });
  });

  describe('Test: update', ()=>{
    beforeEach(()=>{
      httpMock = {
        put: jest.fn().mockReturnValue(of({message: 'Mise à jour réussie'}))
      }
      spyOnGet = jest.spyOn(httpMock, "put");
      fixture = new AbstractCrud<Object>(
        httpMock,
        'all',
        'byId/',
        'create',
        'update/',
        'delete/'
      );
    })
    it('Should return a success message', ()=>{
      fixture.update('123', {}).subscribe(
        response=>{
          expect(spyOnGet).toBeDefined();
          expect(spyOnGet).toHaveBeenCalled();
          expect(response).toEqual({message: 'Mise à jour réussie'});
        }
      );
    });
  });

  describe('Test: delete', ()=>{
    beforeEach(()=>{
      httpMock = {
        delete: jest.fn().mockReturnValue(of({message: 'Suppression réussie'}))
      }
      spyOnGet = jest.spyOn(httpMock, "delete");
      fixture = new AbstractCrud<Object>(
        httpMock,
        'all',
        'byId/',
        'create',
        'update/',
        'delete/'
      );
    })
    it('Should return a success message', ()=>{
      fixture.delete('123').subscribe(
        response=>{
          expect(spyOnGet).toBeDefined();
          expect(spyOnGet).toHaveBeenCalled();
          expect(response).toEqual({message: 'Suppression réussie'});
        }
      );
    });
  });
})
