import { test, expect, Page } from '@playwright/test';

const tasks = [{
  title: 'Nueva tareas',
  description: 'realizar compras de la tienda'
}, {
  title: 'Visitar a la abuelita',
  description: 'Llevar snack para la tarde'
}];

async function createTask(page: Page, title: string, description: string): Promise<void> {
  await page.waitForSelector('h3:has-text("Agregar Tarea")');
  await page.getByRole('link', { name: 'Agregar Tarea' }).click();
  await page.getByPlaceholder('agregar titulo').fill(title);
  await page.getByPlaceholder('agregar descripcion').fill(description);
  await page.getByRole('button', { name: 'Guardar' }).click();
}

test('Tiene el titulo principal', async ({ page }) => {
  await page.goto('/');

  // Expect to have title "To do List" in the navbar
  await expect(page.getByRole('link', { name: 'To do List' })).toBeVisible();
});

test(' Verificar que el boton "Agregar tarea" este visible', async ({ page }) => {
  await page.goto('/');

  // Expects the URL to contain intro.
  await expect(page.getByRole('link', { name: 'Agregar tarea' })).toBeVisible();
});

test('Verificar que las tareas son agregadas ', async ({ page }) => {

  // Ir a la url base
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Crear tareas y validar el mensaje emergente
  for(const task of tasks) {
    await createTask(page, task.title, task.description);
    await expect(page.getByText('tarea creada')).toBeVisible();
  }
  
  // Obtener todos los valores h2 que se encuentren en la pagina
  const createTasks = await page.locator('h2').allInnerTexts();
  expect(createTasks).toHaveLength(tasks.length);

  // Verificar que todos los h2 coincidan con las tareas iniciales
  for (let i = 0; i < createTasks.length; i++) {
    await expect(createTasks[i]).toEqual(tasks[i].title);    
  }

});

test('Verificar que las tareas puedan ser editadas',async ({ page }) => {

  const editedTask = {
    title: 'Compras de la tienda',
    description: 'comprar pan, leche y queso'
  }

  // Ir a la url base
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Crear tareas 
  for(const task of tasks) {
    await createTask(page, task.title, task.description);
  }

  // Presionar el icono de editar
  await page.getByTestId('edit').first().click();

  // Editar la tarea seleccionada
  await page.getByPlaceholder('agregar titulo').fill(editedTask.title);
  await page.getByPlaceholder('agregar descripcion').fill(editedTask.description);
  await page.getByRole('button', { name: 'Guardar' }).click();


  // Verificar que la tarea fue editada
  const firstTaskTitle = await page.locator('h2').first().innerText();
  const firstTaskDescription = await page.locator('p').first().innerText();
  await expect(firstTaskTitle).toEqual(editedTask.title);
  await expect(firstTaskDescription).toEqual(editedTask.description);

  // Verificar el mensaje emergente
  await expect(page.getByText('tarea editada')).toBeVisible();
})
