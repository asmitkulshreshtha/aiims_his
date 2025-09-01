import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientReportService {

     generatePatientReportHtml(data: any, baseUrl: string) {
    const patientName = data?.patientDetails?.name || 'Unknown';

    // Define fields that contain image data
    const imageFields = ['xrayImage', 'ecgImage', 'bloodGasImage', 'lamaConsentDocument'];
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Patient Report - ${patientName}</title>        
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            color: #333;
          }
          h1, h2, h3 {
            color: #2c3e50;
          }
          h1 {
            text-align: center;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 10px;
          }
          h2 {
            margin-top: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .section {
            margin-bottom: 30px;
          }
          @media print {
            body {
              margin: 0;
              font-size: 12pt;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
      <h1>Patient Report</h1>
    `;

    // Helper function to format keys (unchanged)
    const formatKey = (key: string): string => {
      return key
    };

    // Helper function to render a single object as a table
    const renderObject = (obj: any, title: string): string => {
      if (!obj || typeof obj !== 'object') return '';
      let tableHtml = `<div class="section"><h2>${title}</h2><table><tr><th>Field</th><th>Value</th></tr>`;
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && !Array.isArray(value) && typeof value !== 'object') {
          if (imageFields.includes(key)) {
            // Render image fields as <img> tags
            // tableHtml += `<tr><td>${formatKey(key)}</td><td><img src="${baseUrl}/${value}" alt="${formatKey(key)}" style="max-width: 200px;"/></td></tr>`;
            tableHtml += `<img src="${baseUrl}/${value}" alt="${formatKey(key)}" style="width: 100vw; height: auto;"/>`;
          } else {
            // Render non-image fields as text
            tableHtml += `<tr><td>${formatKey(key)}</td><td>${value}</td></tr>`;
          }
        }
      }
      tableHtml += '</table></div>';
      return tableHtml;
    };

    // Helper function to render an array of objects as a table
    const renderArray = (arr: any[], title: string): string => {
      if (!arr || arr.length === 0) return '';
      let tableHtml = `<div class="section"><h2>${title}</h2><table><tr>`;
     
      // Get headers from the first object, excluding specific fields
      const headers = Object.keys(arr[0]).filter(key =>
        key !== 'patient_id' && key !== 'createdAt' && key !== 'updatedAt' &&
        !Array.isArray(arr[0][key]) && typeof arr[0][key] !== 'object'
      );
      headers.forEach(header => {
        if (imageFields.includes(header)) {
          // Skip image fields in headers
          return;
        }
        tableHtml += `<th>${formatKey(header)}</th>`;
      });
      tableHtml += '</tr>';

      // Render rows
      arr.forEach(item => {
        tableHtml += '<tr>';
        headers.forEach(header => {
          const value = item[header] !== null && item[header] !== undefined ? item[header] : '-';
          if (imageFields.includes(header)) {
            // Render image fields as <img> tags
            // tableHtml += `<td><img src="${baseUrl}/${value}" alt="${formatKey(header)}" style="max-width: 200px;"/></td>`;
               tableHtml += `<img src="${baseUrl}/${value}" alt="${formatKey(header)}" style="width: 100vw; height: auto;"/>`;

          } else {
            // Render non-image fields as text
            tableHtml += `<td>${value}</td>`;
          }
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</table></div>';
      return tableHtml;
    };

    // Render all sections
    if (data?.patientDetails) {
      html += renderObject(data?.patientDetails, 'Patient Details');
    }
    if (data?.triageDetails) {
      html += renderArray(data?.triageDetails, 'Triage Details');
    }
    if (data?.primaryAssesment) {
      html += renderObject(data?.primaryAssesment, 'Primary Assessment');
    }
    if (data?.generalEmergencyCare) {
      html += renderObject(data?.generalEmergencyCare[0], 'General Emergency Care');
    }
    if (data?.traumaTemplates) {
      html += renderObject(data?.traumaTemplates[0], 'Trauma Templates');
    }
    if (data?.progressNotes) {
      html += renderObject(data?.progressNotes[0], 'Progress Notes');
    }
    if (data?.otherTests) {
      html += renderArray(data?.otherTests, 'Other Tests');
    }
    if (data?.ctScan) {
      html += renderArray(data?.ctScan, 'CT Scans');
    }
    if (data?.xray) {
      html += renderArray(data?.xray, 'X-rays');
    }
    if (data?.pocus) {
      html += renderArray(data?.pocus, 'POCUS');
    }
    if (data?.ecg) {
      html += renderArray(data?.ecg, 'ECG');
    }
    if (data?.bloodGas) {
      html += renderArray(data?.bloodGas, 'Blood Gas');
    }
    if (data?.troponin) {
      html += renderArray(data?.troponin, 'Troponin');
    }
    // Render additional sections if data exists
    if (data?.dischargeSummary) {
      html += renderObject(data?.dischargeSummary, 'Discharge Summary');
    }
    if (data?.transferOut) {
      html += renderObject(data?.transferOut, 'Transfer Out');
    }
    if (data?.lamaConsent) {
      html += renderObject(data?.lamaConsent, 'Lama Consent');
    }
     if (data?.cbc) {
      html += renderArray(data?.cbc, 'Complete Blood Count');
    }
    html += `
      <div class="footer">Prepared by: Yamini Verma</div>
      </body>
      </html>
    `;
    return html;
  }
}
