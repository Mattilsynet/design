// import { isDatalistClick, syncDatalistState } from '@u-elements/u-datalist';

// let debounceTimer: ReturnType<typeof setTimeout> | number = 0; // Debounce so we do not spam API
// const input = document.getElementById('my-api-input') as HTMLInputElement | null;
// const list = input?.list;
// const xhr = new XMLHttpRequest(); // Easy to abort

// // Same handler every time
// xhr.onload = () => {
//   try {
//     list?.replaceChildren(...JSON.parse(xhr.responseText).map((country: Record<string, string>) => {
//       const option = document.createElement('u-option');
//       option.text = country.name;
//       return option;
//     }));
//   } catch (err) {
//     // Using role="none" to avoid getting counted as a hit
//     list?.replaceChildren('No results');
//   }
//   if (input) syncDatalistState(input);
// };

// input?.addEventListener('input', (event) => {
//   if (isDatalistClick(event)) return; // User clicked option element

//   // Using role="none" to avoid getting counted as a hit
//   const value = encodeURIComponent(input.value.trim());
//   list?.replaceChildren(value ? 'Loading' : '');

//   xhr.abort();
//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     if (!value) return;
//     xhr.open('GET', `https://restcountries.com/v2/name/${value}?fields=name`, true);
//     xhr.send();
//   }, 300);

//   syncDatalistState(input);
// });

export const fieldDatalist = (event: Event) => {
  console.log(event);
};