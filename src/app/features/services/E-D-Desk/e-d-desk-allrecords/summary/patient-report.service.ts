import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientReportService {
  generatePatientReportHtml(data: any, baseUrl: string) {
    console.log('Data to generate report:', data);
    const patientName = data?.patientDetails?.patientName || 'Unknown';

    const imageFields = ['xrayImage', 'ecgImage', 'bloodGasImage', 'lamaConsentDocument'];

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Patient Report - ${patientName}</title>        
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
          h1, h2 { color: #2c3e50; }
          h1 { text-align: center; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .section { margin-bottom: 25px; }
          .section img { width: 100%; height: auto; margin-top: 10px; margin-bottom: 20px; }
          @media print { body { margin: 0; font-size: 12pt; } .no-print { display: none; } }
        </style>
      </head>
      <body>
      <h1>Patient Report</h1>
    `;

    // Helper: Format Key
    const formatKey = (key: string): string =>
      key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Render object
    const renderObject = (obj: any, title: string): string => {
      if (!obj || typeof obj !== 'object') return '';
      let tableHtml = `<div class="section"><h2>${title}</h2><table><tr><th>Field</th><th>Value</th></tr>`;
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && !Array.isArray(value) && typeof value !== 'object') {
          if (imageFields.includes(key)) {
            // image below field
            tableHtml += `</table><img src="${baseUrl}/${value}" alt="${formatKey(key)}"><table>`;
          } else {
            tableHtml += `<tr><td>${formatKey(key)}</td><td>${value}</td></tr>`;
          }
        }
      }
      tableHtml += '</table></div>';
      return tableHtml;
    };

    // Render array
    const renderArray = (arr: any[], title: string): string => {
      if (!arr || arr.length === 0) return '';
      let tableHtml = `<div class="section"><h2>${title}</h2>`;
      arr.forEach(item => {
        tableHtml += `<table><tr>`;
        const headers = Object.keys(item).filter(
          key => !Array.isArray(item[key]) && typeof item[key] !== 'object'
        );
        tableHtml += `<th>Field</th><th>Value</th></tr>`;
        headers.forEach(header => {
          const value = item[header] ?? '-';
          if (imageFields.includes(header) && value) {
            tableHtml += `</table><img src="${baseUrl}/${value}" alt="${formatKey(header)}"><table>`;
          } else {
            tableHtml += `<tr><td>${formatKey(header)}</td><td>${value}</td></tr>`;
          }
        });
        tableHtml += `</table>`;
      });
      tableHtml += '</div>';
      return tableHtml;
    };

    // ✅ Add all sections here
    if (data?.patientDetails) html += renderObject(data.patientDetails, 'Patient Details');
    if (data?.triageDetails) html += renderArray(data.triageDetails, 'Triage Details');
    if (data?.primaryAssesment) html += renderObject(data.primaryAssesment, 'Primary Assessment');
    if (data?.generalEmergencyCare) html += renderObject(data.generalEmergencyCare[0], 'General Emergency Care');

    if (data?.traumaTemplateImage) {
      html += `<div class="section"><h2>Trauma Template</h2><img src="${baseUrl}/${data.traumaTemplateImage}" alt="Trauma Template"></div>`;
    } else if (data?.traumaTemplates?.[0]?.image) {
      html += `<div class="section"><h2>Trauma Template</h2><img src="${baseUrl}/${data.traumaTemplates[0].image}" alt="Trauma Template"></div>`;
    } else if (data?.traumaTemplates?.[0]) {
      html += renderObject(data.traumaTemplates[0], 'Trauma Templates');
    }

    if (data?.progressNotes) html += renderArray(data.progressNotes, 'Progress Notes');
    if (data?.otherTests) html += renderArray(data.otherTests, 'Other Tests');

    // ✅ Xray, ECG, Blood Gas section images inside section
    if (data?.xray?.length) html += renderArray(data.xray, 'X-Ray');
    if (data?.ecg?.length) html += renderArray(data.ecg, 'ECG');
    if (data?.bloodGas?.length) html += renderArray(data.bloodGas, 'Blood Gas');

    if (data?.cbc) html += renderArray(data.cbc, 'CBC Test');
    if (data?.pocus) html += renderArray(data.pocus, 'POCUS');
    if (data?.troponin) html += renderArray(data.troponin, 'Troponin Test');
    if (data?.lft) html += renderArray(data.lft, 'LFT');
    if (data?.rft) html += renderArray(data.rft, 'RFT');
    if (data?.treatment) html += renderArray(data.treatment, 'Treatment');
    if (data?.urineTest) html += renderArray(data.urineTest, 'Urine Test');
    if (data?.coagulation) html += renderArray(data.coagulation, 'Coagulation Test');
    if (data?.treatmentNursing) html += renderArray(data.treatmentNursing, 'Treatment Nursing');
    if (data?.vitalRecording) html += renderArray(data.vitalRecording, 'Vital Recording');
    if (data?.inOut?.length) html += renderObject(data.inOut[0], 'In/Out Records');
    if (data?.handoverNotes?.length) html += renderObject(data.handoverNotes[0], 'Handover Notes');

    html += `<div class="footer">Prepared by: Yamini Verma</div></body></html>`;
    return html;
  }
}
