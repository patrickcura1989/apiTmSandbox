import { test, expect } from '@playwright/test';


const BASE_URL = "https://api.tmsandbox.co.nz"


test('As a user, I want to get details of category id 6327', async ({ request }) => {
  const expectedName = 'Carbon credits';
  const expectedCanRelist = true;
  const nameOfPromotionToTest = 'Gallery';
  const expectedGalleryDescription = 'Good position in category';

  const response = await request.get(`${BASE_URL}/v1/Categories/6327/Details.json?catalogue=false`);
  
  expect(response.ok()).toBeTruthy();
  const jsonResponse = await response.json();
  
  // Acceptance Criteria 1
  const name = jsonResponse.Name;
  expect(name).toBe(expectedName);

  // Acceptance Criteria 2
  const canRelist = jsonResponse.CanRelist;
  expect(canRelist).toBe(expectedCanRelist);

  // Acceptance Criteria 3
  const promotions = jsonResponse.Promotions;
  const promotionToTest = promotions.find(item => item.Name === nameOfPromotionToTest);
  expect(promotionToTest.Description).toBe(expectedGalleryDescription);
});
