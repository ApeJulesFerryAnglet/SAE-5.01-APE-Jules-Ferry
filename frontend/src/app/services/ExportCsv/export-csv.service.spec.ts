import { TestBed } from '@angular/core/testing';
import { ExportCsvService } from './export-csv.service';

describe('ExportCsvService', () => {
  let service: ExportCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait declencher le telechargement d\'un fichier csv', () => {
    const data = [{ Nom: 'Test', Email: 'test@example.com' }];
    const createElementSpy = spyOn(document, 'createElement').and.callThrough();
    const mockAnchor = document.createElement('a');
    spyOn(mockAnchor, 'click');
    createElementSpy.and.returnValue(mockAnchor);

    service.exportAsCsvFile(data, 'TestFile');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.download).toContain('TestFile_');
    expect(mockAnchor.download).toContain('.csv');
    expect(mockAnchor.click).toHaveBeenCalled();
  });
});
