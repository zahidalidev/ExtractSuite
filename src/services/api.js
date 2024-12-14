import { instance } from "./instance";

export async function scrapeWebsites(payload) {
  console.log('Sending websites to scrape:', payload);
  
  const response = await instance.post('scrapWebsite', {
    json: payload
  })
  
  const data = await response.json();
  
  if (!response.ok) {
    console.log('Response status:', response.status); 
    throw new Error(data.message || 'Failed to scrape websites');
  }

  console.log('Raw scraping results:', data);
  return data;
}