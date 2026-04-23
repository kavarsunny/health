import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const downloadPDF = (title: string, head: string[][], body: (string | number)[][]) => {
  const doc = new jsPDF();
  
  // Company name
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229);
  doc.text('Healthify Haat', 14, 20);
  
  // Report title
  doc.setFontSize(14);
  doc.setTextColor(51, 65, 85);
  doc.text(title.replace(/_/g, ' '), 14, 30);
  
  // Date stamp
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 37);
  
  // Create table
  autoTable(doc, {
    startY: 44,
    head: head,
    body: body,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229] }, // matches the new #4f46e5 indigo theme
    styles: { fontSize: 9 },
  });
  
  doc.save(`${title.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
};
