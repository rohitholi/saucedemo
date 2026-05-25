import fs from 'fs';
import path from 'path'; // We need this to join folder names
import { parse } from 'csv-parse/sync';

export class DataProvider {
    
    static getTestDataFromJson(fileName: string) 
    {

        const filePath = path.join(process.cwd(), 'TestData', fileName);
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    }

    static getTestDataFromCsv(fileName: string) {
        const filePath = path.join(process.cwd(), 'TestData', fileName);
        
        const fileContent = fs.readFileSync(filePath);
        return parse(fileContent, { columns: true, skip_empty_lines: true });
    }
}