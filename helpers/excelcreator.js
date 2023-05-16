const { Client } = require('pg');
const ExcelJS = require('exceljs');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'lummaproject',
  password: '12345678',
  port: 5432,
});

client.connect();

client.query('SELECT name, categoria, tarea, subtarea, horas FROM excel', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Set headers
    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Categoria', key: 'categoria' },
      { header: 'Tarea', key: 'tarea' },
      { header: 'Subtarea', key: 'subtarea' },
      { header: 'Horas', key: 'horas' }
    ];

    // Add data
    res.rows.forEach(row => {
      worksheet.addRow(row);
    });

    // Write to file
    workbook.xlsx.writeFile('output.xlsx')
      .then(() => {
        console.log('Excel file created successfully');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  client.end();
});